import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { parse } from 'csv-parse/browser/esm/sync';
import Axios from '@/api';
import { SuccessNotification, ErrorNotification } from '@/utils/toast';
import PremiumTextField from '@/components/FormikFields/PremiumTextField';
import { FiUsers, FiGift, FiCheckCircle, FiStar, FiAward, FiPlus, FiUpload, FiDownload, FiTrash2, FiMail } from 'react-icons/fi';

interface ReferralFriend {
  firstName: string;
  lastName: string;
  email: string;
}

interface ThankYouPageProps { }

const referralValidationSchema = Yup.object({
  referrerEmail: Yup.string()
    .email('Invalid email address')
    .required('Your email is required to process referrals'),
  friends: Yup.array().test('at-least-3-friends', 'Please add at least 3 friends to unlock VIP status', function (friends) {
    if (!friends) return false;
    const validFriends = friends.filter(friend =>
      friend.firstName && friend.firstName.trim() &&
      friend.lastName && friend.lastName.trim() &&
      friend.email && friend.email.trim()
    );
    return validFriends.length >= 3;
  })
});

const getInitialValues = (friendCount: number = 3, referrerEmail: string = '') => ({
  referrerEmail,
  friends: Array.from({ length: friendCount }, () => ({ firstName: '', lastName: '', email: '' }))
});

function ThankYouPage({ }: ThankYouPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [referrerInfo, setReferrerInfo] = useState<{ name: string, email: string } | null>(null);
  const [vipStatusUnlocked, setVipStatusUnlocked] = useState(false);
  const [submittedReferrals, setSubmittedReferrals] = useState(0);
  const [friendCount, setFriendCount] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get referrer info from location state or localStorage
    const state = location.state as { referrerName?: string; referrerEmail?: string } | null;
    const storedReferrer = localStorage.getItem('referrerInfo');

    if (state?.referrerName && state?.referrerEmail) {
      setReferrerInfo({ name: state.referrerName, email: state.referrerEmail });
      localStorage.setItem('referrerInfo', JSON.stringify({ name: state.referrerName, email: state.referrerEmail }));
    } else if (storedReferrer) {
      setReferrerInfo(JSON.parse(storedReferrer));
    }
  }, [location.state]);

  const handleReferralSubmit = async (values: { referrerEmail: string; friends: ReferralFriend[] }, { resetForm }: any) => {
    setIsLoading(true);
    try {
      // Filter out empty friends
      const validFriends = values.friends.filter(friend =>
        friend.firstName.trim() && friend.lastName.trim() && friend.email.trim()
      );

      if (validFriends.length === 0) {
        ErrorNotification('Please add at least one friend to refer.');
        return;
      }

      const response = await Axios.post('/lead/refer', {
        friends: validFriends,
        referrerEmail: values.referrerEmail
      });

      if (response.status === 200 || response.status === 201) {
        const result = response.data?.data;
        const successfulReferrals = result?.successfulReferrals || validFriends.length;
        const vipGranted = result?.vipStatusGranted || false;

        setSubmittedReferrals(prev => prev + successfulReferrals);

        if (vipGranted) {
          setVipStatusUnlocked(true);
          SuccessNotification('🎉 VIP Status Unlocked! Your friends have been successfully referred!');
          
          // Clear referrer info and redirect to welcome page
          localStorage.removeItem('referrerInfo');
          setTimeout(() => {
            navigate('/welcome');
          }, 2000);
        } else {
          SuccessNotification('Your friends have been successfully referred!');
        }

        resetForm();
      } else {
        ErrorNotification('Something went wrong. Please try again.');
      }
    } catch (error: any) {
      console.error('Referral submission error:', error);

      let errorMessage = 'Something went wrong. Please try again.';

      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message;

        switch (status) {
          case 400:
            errorMessage = serverMessage || 'Please check your information and try again.';
            break;
          case 409:
            errorMessage = serverMessage || 'One or more of your friends are already registered.';
            break;
          case 422:
            errorMessage = serverMessage || 'Please provide valid information for all friends.';
            break;
          default:
            errorMessage = serverMessage || 'Something went wrong. Please try again.';
        }
      }

      ErrorNotification(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getVIPStatus = (activeFriendCount: number) => {
    // Only show VIP status if it's actually unlocked after submission
    if (vipStatusUnlocked) {
      if (submittedReferrals >= 5) return { status: 'Premium VIP', color: 'from-yellow-400 to-orange-500', icon: FiAward };
      if (submittedReferrals >= 3) return { status: 'VIP', color: 'from-purple-500 to-pink-500', icon: FiStar };
    }

    // Show potential status based on current form
    if (activeFriendCount >= 5) return { status: 'Potential Premium VIP', color: 'from-yellow-400 to-orange-500', icon: FiAward };
    if (activeFriendCount >= 3) return { status: 'Potential VIP', color: 'from-purple-500 to-pink-500', icon: FiStar };
    return { status: 'Standard', color: 'from-blue-500 to-cyan-400', icon: FiUsers };
  };

  const addFriendField = (setFieldValue: any, currentFriends: any[]) => {
    const newFriends = [...currentFriends, { firstName: '', lastName: '', email: '' }];
    setFieldValue('friends', newFriends);
    setFriendCount(newFriends.length);
  };

  const deleteFriendField = (indexToDelete: number, setFieldValue: any, currentFriends: any[]) => {
    if (currentFriends.length <= 3) {
      ErrorNotification('You need at least 3 friend entries');
      return;
    }
    
    const newFriends = currentFriends.filter((_, index) => index !== indexToDelete);
    setFieldValue('friends', newFriends);
    setFriendCount(newFriends.length);
  };

  const downloadSampleCSV = () => {
    const csvContent = "firstName,lastName,email\nJohn,Doe,john.doe@example.com\nJane,Smith,jane.smith@example.com\nMike,Johnson,mike.johnson@example.com";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'friends_referral_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


  return (
    <div className="min-h-screen bg-slate-900 py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-6">
            <FiCheckCircle className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            🎉 Welcome to DeepTrust AI!
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            You're officially on the Early Access list!
          </p>
        </div>

        {/* VIP Benefits Section */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center justify-center mb-6">
            <FiAward className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Get VIP Access for Free</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Refer 3+ Friends → VIP Status</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <FiCheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Exclusive behind-the-scenes content
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Early access to all new features
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Direct line to our founding team
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Priority support and onboarding
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Refer 5+ Friends → Premium VIP</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <FiCheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  All VIP benefits plus
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  Lifetime premium access
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  Co-creation opportunities
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  Revenue sharing program
                </li>
              </ul>
            </div>
          </div>
              <div className="bg-yellow-900/80 border-l-4 border-yellow-400 p-4 rounded-lg mb-2">
                <strong className="text-yellow-300 block mb-1">Important:</strong>
                <span className="text-slate-100">
                  The person with the most referrals will get early access to our <span className="font-semibold text-yellow-200">$25K private mastermind</span>.
                </span>
              </div>
        </div>

        {/* Referral Form */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <FiUsers className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">To qualify for VIP, refer 3 or more friends</h2>
            <p className="text-slate-300 mb-6">Share DeepTrust AI with your professional network</p>
            
            {/* CSV Options */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <FiUpload className="w-4 h-4 mr-2" />
                Upload CSV
              </button>
              
              <button
                type="button"
                onClick={downloadSampleCSV}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Download Sample CSV
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={(e) => e.target.files && e.target.files[0] && e.target.value && (e.target.value = '')}
              className="hidden"
            />
          </div>

          <Formik
            initialValues={getInitialValues(friendCount, referrerInfo?.email || '')}
            validationSchema={referralValidationSchema}
            onSubmit={handleReferralSubmit}
          >
            {({ values, isValid, dirty, setValues, setFieldValue }) => {
              // Update file input change handler to use setValues
              if (fileInputRef.current && !fileInputRef.current.onchange) {
                fileInputRef.current.onchange = (event: any) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = (e) => {
                    try {
                      const csvText = e.target?.result as string;
                      const records = parse(csvText, {
                        columns: true,
                        skip_empty_lines: true,
                        trim: true
                      });

                      if (records.length === 0) {
                        ErrorNotification('CSV file is empty or invalid');
                        return;
                      }

                      // Validate CSV structure
                      const requiredColumns = ['firstName', 'lastName', 'email'];
                      const firstRecord = records[0] as Record<string, any>;
                      const csvColumns = Object.keys(firstRecord);
                      const missingColumns = requiredColumns.filter(col => !csvColumns.includes(col));
                      
                      if (missingColumns.length > 0) {
                        ErrorNotification(`CSV missing required columns: ${missingColumns.join(', ')}`);
                        return;
                      }

                      // Create new values with CSV data
                      const newFriends = records.map((record: any) => ({
                        firstName: record.firstName || '',
                        lastName: record.lastName || '',
                        email: record.email || ''
                      }));

                      // Update form values directly
                      setValues({
                        referrerEmail: values.referrerEmail,
                        friends: newFriends
                      });

                      setFriendCount(records.length);
                      SuccessNotification(`Successfully loaded ${records.length} friends from CSV`);
                    } catch (error) {
                      console.error('CSV parsing error:', error);
                      ErrorNotification('Error parsing CSV file. Please check the format.');
                    }
                  };
                  reader.readAsText(file);
                };
              }
              const activeFriendCount = values.friends.filter(friend =>
                friend.firstName.trim() && friend.lastName.trim() && friend.email.trim()
              ).length;

              // Debug logging
              console.log('Form state:', { isValid, dirty, activeFriendCount, values: values.friends });

              const vipStatus = getVIPStatus(activeFriendCount);
              const IconComponent = vipStatus.icon;

              return (
                <Form className="space-y-8">
                  {/* Referrer Email */}
                  <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FiMail className="w-5 h-5 mr-2" />
                      Your Email (Required)
                    </h3>
                    <PremiumTextField
                      field="referrerEmail"
                      label_text="Your Email Address"
                      placeholder="Enter your email address"
                      type="email"
                      required
                      iconType="email"
                    />
                  </div>

                  {values.friends.map((_, index) => (
                    <div key={index} className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </span>
                          Friend {index + 1}
                        </div>
                        {values.friends.length > 3 && (
                          <button
                            type="button"
                            onClick={() => deleteFriendField(index, setFieldValue, values.friends)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                            title="Delete this friend entry"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <PremiumTextField
                          field={`friends.${index}.firstName`}
                          label_text="First Name"
                          placeholder="Enter first name"
                          type="text"
                          required
                          iconType="user"
                        />

                        <PremiumTextField
                          field={`friends.${index}.lastName`}
                          label_text="Last Name"
                          placeholder="Enter last name"
                          type="text"
                          required
                          iconType="user"
                        />
                      </div>

                      <PremiumTextField
                        field={`friends.${index}.email`}
                        label_text="Email Address"
                        placeholder="Enter email address"
                        type="email"
                        required
                        iconType="email"
                      />
                    </div>
                  ))}

                  {/* Add Friend Button */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => addFriendField(setFieldValue, values.friends)}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <FiPlus className="w-4 h-4 mr-2" />
                      Add Another Friend
                    </button>
                  </div>

                  {/* Status Display */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IconComponent className={`w-6 h-6 mr-3 bg-gradient-to-r ${vipStatus.color} bg-clip-text text-transparent`} />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {vipStatusUnlocked ? `${submittedReferrals} Friends Referred` : `${activeFriendCount} Friends Ready to Refer`}
                          </h3>
                          <p className="text-slate-300">
                            {vipStatusUnlocked
                              ? 'VIP Status Unlocked! 🎉'
                              : activeFriendCount >= 3
                                ? 'Ready to unlock VIP status!'
                                : activeFriendCount < 3
                                  ? `${3 - activeFriendCount} more to unlock VIP`
                                  : 'Ready to unlock VIP status!'
                            }
                          </p>
                        </div>
                      </div>

                      {vipStatusUnlocked && (
                        <div className="flex items-center text-yellow-400">
                          <FiAward className="w-5 h-5 mr-2" />
                          <span className="font-semibold">VIP</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid || isLoading || activeFriendCount < 3}
                    className="w-full bg-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Referrals...
                      </div>
                    ) : (
                      activeFriendCount >= 3
                        ? `Refer ${activeFriendCount} Friend${activeFriendCount !== 1 ? 's' : ''} & Unlock VIP Access`
                        : `Add ${3 - activeFriendCount} More Friend${3 - activeFriendCount !== 1 ? 's' : ''} to Unlock VIP`
                    )}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors duration-200 underline"
          >
            Skip for now (you can refer friends later)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { parse } from 'csv-parse/browser/esm/sync';
import Axios from '@/api';
import { SuccessNotification, ErrorNotification } from '@/utils/toast';
import PremiumTextField from '@/components/FormikFields/PremiumTextField';
import { FiUsers, FiCheckCircle, FiStar, FiAward, FiPlus, FiUpload, FiDownload, FiMail, FiTrash2 } from 'react-icons/fi';

interface ReferralFriend {
  firstName: string;
  lastName: string;
  email: string;
}

interface WelcomePageProps {}

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

const getInitialValues = (friendCount: number = 3) => ({
  referrerEmail: '',
  friends: Array.from({ length: friendCount }, () => ({ firstName: '', lastName: '', email: '' }))
});

function WelcomePage({}: WelcomePageProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [friendCount, setFriendCount] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        
        SuccessNotification(`🎉 ${successfulReferrals} friends successfully referred! Keep going for the Top Referrer Award!`);
        resetForm();
        setFriendCount(3);
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


  const currentUrl = window.location.origin + '/welcome';

  return (
    <div className="min-h-screen bg-slate-900 py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Congratulations Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
            <FiAward className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            🎉 Congratulations — You're Now a VIP
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            You've just unlocked VIP Access to DeepTrust AI by sharing 3 or more referrals.
          </p>
        </div>

        {/* VIP Benefits Section */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center justify-center mb-6">
            <FiStar className="w-8 h-8 text-purple-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Here's what you now have:</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <FiCheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">First-User Advantage</h3>
                  <p className="text-slate-300">Priority access to the platform before the public.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiCheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Extended Free Trial</h3>
                  <p className="text-slate-300">Extra time to explore DeepTrust AI at no cost.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FiCheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Exclusive Updates</h3>
                  <p className="text-slate-300">Insider videos and progress reports straight from our team.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiCheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">VIP Support</h3>
                  <p className="text-slate-300">Priority support and onboarding assistance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keep Going Section */}
        <div className="bg-gradient-to-r from-yellow-900/80 to-orange-900/80 rounded-2xl p-8 mb-12 border border-yellow-500/30">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Keep Going</h2>
            <p className="text-yellow-100 mb-4">
              Every referral brings you closer to our <strong>Top Referrer Award</strong>.
            </p>
            <p className="text-yellow-100">
              The user with the most referrals overall will receive complimentary access (a <span className="font-bold text-yellow-200">$25,000 value</span>) to our <strong>DeepTrust Mastermind</strong> — a high-level community of business owners already inside.
            </p>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Save Your Referral Link</h3>
            <p className="text-slate-300 mb-4">You can add more referrals at any time using this link:</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
              <code className="text-cyan-400 text-sm break-all">{currentUrl}</code>
            </div>
          </div>
        </div>

        {/* Add More Referrals Form */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <FiUsers className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Add More Referrals</h2>
            <p className="text-slate-300 mb-6">Continue building your referral count for the Top Referrer Award</p>
            
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
            initialValues={getInitialValues(friendCount)}
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

                  {/* Friend Fields */}
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
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {activeFriendCount} Friends Ready to Refer
                        </h3>
                        <p className="text-slate-300">
                          {activeFriendCount >= 3
                            ? 'Ready to add more referrals to your count!'
                            : `${3 - activeFriendCount} more needed to submit`
                          }
                        </p>
                      </div>
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
                        Adding Referrals...
                      </div>
                    ) : (
                      activeFriendCount >= 3
                        ? `Add ${activeFriendCount} More Friend${activeFriendCount !== 1 ? 's' : ''} to Your Count`
                        : `Add ${3 - activeFriendCount} More Friend${3 - activeFriendCount !== 1 ? 's' : ''} to Submit`
                    )}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors duration-200 underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
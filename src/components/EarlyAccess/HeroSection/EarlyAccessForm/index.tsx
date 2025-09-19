import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Axios from '@/api';
import { SuccessNotification, ErrorNotification } from '@/utils/toast';
import PremiumTextField from '@/components/FormikFields/PremiumTextField';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  companyWebsite: string;
}

interface EarlyAccessFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  company: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  jobTitle: Yup.string()
    .min(2, 'Job title must be at least 2 characters')
    .required('Job title is required'),
  companyWebsite: Yup.string()
    .url('Invalid website URL')
    .required('Company website is required'),
});

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  companyWebsite: '',
};

function EarlyAccessForm({ isOpen, onClose }: EarlyAccessFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    setIsLoading(true);
    try {
      const response = await Axios.post('/lead/create', values);
      
      if (response.status === 200 || response.status === 201) {
        // Store referrer info and redirect to thank you page
        localStorage.setItem('referrerInfo', JSON.stringify({
          name: values.name,
          email: values.email
        }));
        
        resetForm();
        onClose();
        navigate('/thank-you', {
          state: {
            referrerName: values.name,
            referrerEmail: values.email
          }
        });
      } else {
        ErrorNotification('Something went wrong. Please try again.');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      
      // Handle different types of errors with user-friendly messages
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message;
        
        switch (status) {
          case 400:
            errorMessage = serverMessage || 'Please check your information and try again.';
            break;
          case 401:
            errorMessage = 'Authentication required. Please refresh and try again.';
            break;
          case 403:
            errorMessage = 'Access denied. Please contact support if you believe this is an error.';
            break;
          case 409:
            errorMessage = serverMessage || 'It looks like you\'ve already registered. Please check your email for early access details.';
            break;
          case 422:
            errorMessage = serverMessage || 'Please provide valid information in all fields.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please wait a moment and try again.';
            break;
          case 500:
            errorMessage = 'Our servers are experiencing issues. Please try again in a few minutes.';
            break;
          case 503:
            errorMessage = 'Service temporarily unavailable. Please try again later.';
            break;
          default:
            errorMessage = serverMessage || 'Something went wrong. Please try again.';
        }
      } else if (error.request) {
        errorMessage = 'Unable to connect to our servers. Please check your internet connection and try again.';
      } else if (error.message) {
        if (error.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.';
        } else if (error.message.includes('Network Error')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      ErrorNotification(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-dark-primary rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent">Get Early Access</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                disabled={isLoading}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-6">
                <PremiumTextField
                  field="name"
                  label_text="Full Name"
                  placeholder="Enter your full name"
                  type="text"
                  required
                  iconType="user"
                />

                <PremiumTextField
                  field="email"
                  label_text="Email Address"
                  placeholder="Enter your email address"
                  type="email"
                  required
                  iconType="email"
                />

                <PremiumTextField
                  field="phone"
                  label_text="Phone Number"
                  placeholder="Enter your phone number"
                  type="tel"
                  required
                  iconType="phone"
                />

                <PremiumTextField
                  field="company"
                  label_text="Company Name"
                  placeholder="Enter your company name"
                  type="text"
                  required
                  iconType="briefcase"
                />

                <PremiumTextField
                  field="jobTitle"
                  label_text="Job Title"
                  placeholder="Enter your job title"
                  type="text"
                  required
                  iconType="briefcase"
                />

                <PremiumTextField
                  field="companyWebsite"
                  label_text="Company Website"
                  placeholder="https://yourcompany.com"
                  type="url"
                  required
                  iconType="globe"
                />

                <button
                  type="submit"
                  disabled={!isValid || !dirty || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-cyan-400"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    'Get Early Access'
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>

    </>
  );
}

export default EarlyAccessForm;

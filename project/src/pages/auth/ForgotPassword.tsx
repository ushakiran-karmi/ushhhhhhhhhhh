import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSuccess(true);
      } catch (error) {
        setError('Failed to send reset email. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-heading font-bold text-neutral-900 text-center mb-6">
        Reset your password
      </h2>
      
      {error && (
        <motion.div 
          className="bg-error-100 border border-error-300 text-error-700 px-4 py-3 rounded-md mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
      
      {success ? (
        <motion.div
          className="bg-success-100 border border-success-300 text-success-700 px-4 py-6 rounded-md mb-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-success-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-base font-medium">Password reset link sent!</p>
            <p className="text-sm mt-2">Check your email for instructions to reset your password.</p>
          </div>
          <div className="mt-6">
            <Link to="/login" className="btn btn-outline w-full">
              Return to login
            </Link>
          </div>
        </motion.div>
      ) : (
        <>
          <p className="mb-6 text-sm text-neutral-600">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`form-input ${
                  formik.touched.email && formik.errors.email ? 'border-error-300' : ''
                }`}
                placeholder="your.email@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="form-error">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full py-2.5"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Send reset link
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Remember your password?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ForgotPassword;
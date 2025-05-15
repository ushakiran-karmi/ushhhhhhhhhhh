import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSuccess(true);
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setError('Failed to reset password. Please try again later.');
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
        Set new password
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
            <p className="text-base font-medium">Password updated successfully!</p>
            <p className="text-sm mt-2">You will be redirected to the login page in a moment...</p>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className={`form-input ${
                formik.touched.password && formik.errors.password ? 'border-error-300' : ''
              }`}
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="form-error">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={`form-input ${
                formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-error-300' : ''
              }`}
              placeholder="••••••••"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="form-error">{formik.errors.confirmPassword}</p>
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
              Reset Password
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Back to login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
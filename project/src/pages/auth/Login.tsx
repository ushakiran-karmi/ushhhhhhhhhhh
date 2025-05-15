import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setLoginError(null);
      
      try {
        await login(values.email, values.password, role);
        
        // Redirect based on role
        switch (role) {
          case UserRole.CLIENT:
            navigate('/client/dashboard');
            break;
          case UserRole.WRITER:
            navigate('/writer/dashboard');
            break;
          case UserRole.SUPERVISOR:
            navigate('/supervisor/dashboard');
            break;
          default:
            navigate('/');
        }
      } catch (error) {
        setLoginError(error instanceof Error ? error.message : 'Failed to login');
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
        Sign in to your account
      </h2>
      
      {loginError && (
        <motion.div 
          className="bg-error-100 border border-error-300 text-error-700 px-4 py-3 rounded-md mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loginError}
        </motion.div>
      )}
      
      <div className="mb-6">
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setRole(UserRole.CLIENT)}
            className={`relative flex-1 py-2 px-4 text-sm font-medium rounded-l-md focus:z-10 focus:outline-none ${
              role === UserRole.CLIENT
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Client
          </button>
          <button
            type="button"
            onClick={() => setRole(UserRole.WRITER)}
            className={`relative flex-1 py-2 px-4 text-sm font-medium focus:z-10 focus:outline-none ${
              role === UserRole.WRITER
                ? 'bg-secondary-600 text-white'
                : 'bg-white border-t border-b border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Writer
          </button>
          <button
            type="button"
            onClick={() => setRole(UserRole.SUPERVISOR)}
            className={`relative flex-1 py-2 px-4 text-sm font-medium rounded-r-md focus:z-10 focus:outline-none ${
              role === UserRole.SUPERVISOR
                ? 'bg-accent-600 text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Supervisor
          </button>
        </div>
      </div>
      
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
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
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn w-full py-2.5 ${
              role === UserRole.CLIENT
                ? 'btn-primary'
                : role === UserRole.WRITER
                ? 'btn-secondary'
                : 'btn-accent'
            }`}
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Sign in
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            Register now
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
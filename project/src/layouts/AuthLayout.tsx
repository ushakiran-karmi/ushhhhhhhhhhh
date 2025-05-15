import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link to="/">
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-white"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              <h1 className="text-3xl font-bold text-white">Resume Studio</h1>
            </div>
          </motion.div>
        </Link>
        <h2 className="mt-6 text-center text-xl font-heading font-semibold text-white">
          Create professional resumes tailored to your career
        </h2>
      </div>

      <motion.div
        className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Outlet />
      </motion.div>
      
      <p className="mt-8 text-center text-sm text-primary-100">
        &copy; {new Date().getFullYear()} Resume Studio. All rights reserved.
      </p>
    </div>
  );
};

export default AuthLayout;
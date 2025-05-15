import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-50 px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-heading font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-heading font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Page not found
        </h2>
        <p className="mt-6 text-base leading-7 text-neutral-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <HomeIcon className="h-5 w-5 mr-2 inline-block" />
            Go back home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
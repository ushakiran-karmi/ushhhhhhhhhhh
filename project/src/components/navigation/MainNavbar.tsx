// src/components/navigation/MainNavbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MainNavbar = () => {
  const { authUser } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-primary-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span className="font-bold text-xl">Resume Studio</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            {authUser ? (
              <>
                <Link to="/home" className="text-neutral-600 hover:text-primary-600">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-neutral-600 hover:text-primary-600">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-neutral-600 hover:text-primary-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
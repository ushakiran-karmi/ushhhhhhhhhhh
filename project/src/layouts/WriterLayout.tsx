import { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  DocumentTextIcon,
  WalletIcon,
  UserIcon,
  BellIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const WriterLayout = () => {
  const { authUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Dashboard', to: '/writer/dashboard', icon: HomeIcon },
    { name: 'Assigned Requests', to: '/writer/requests', icon: DocumentTextIcon },
    { name: 'My Wallet', to: '/writer/wallet', icon: WalletIcon },
    { name: 'My Profile', to: '/writer/profile', icon: UserIcon },
  ];
  
  // Get the title based on the current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/writer/dashboard') return 'Dashboard';
    if (path === '/writer/requests') return 'Assigned Requests';
    if (path.includes('/writer/request/')) return 'Resume Details';
    if (path === '/writer/wallet') return 'My Wallet';
    if (path === '/writer/profile') return 'My Profile';
    return 'Resume Studio';
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
          <Link to="/writer/dashboard" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-secondary-600"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span className="font-heading font-semibold text-xl">Resume Studio</span>
          </Link>
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-neutral-600 hover:text-neutral-900 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <motion.div
            className="bg-white border-b border-neutral-200 px-2 py-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-secondary-100 text-secondary-800'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    {item.name}
                  </NavLink>
                );
              })}
              <button
                className="flex w-full items-center px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-md"
                onClick={logout}
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-neutral-200">
          <div className="h-16 flex items-center px-4 border-b border-neutral-200">
            <Link to="/writer/dashboard" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-secondary-600"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              <span className="font-heading font-semibold text-xl">Resume Studio</span>
            </Link>
          </div>
          <div className="flex-grow flex flex-col justify-between py-4">
            <nav className="flex-1 px-2 space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-secondary-100 text-secondary-800'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`
                    }
                  >
                    <Icon 
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        location.pathname === item.to
                          ? 'text-secondary-600'
                          : 'text-neutral-500 group-hover:text-neutral-600'
                      }`} 
                      aria-hidden="true" 
                    />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
            
            <div className="px-2">
              <button
                className="group flex w-full items-center px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-md"
                onClick={logout}
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0 text-neutral-500 group-hover:text-neutral-600" aria-hidden="true" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-10">
          <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-heading font-semibold text-neutral-900">{getPageTitle()}</h1>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                className="relative p-1 rounded-full bg-white text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"></span>
              </button>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary-700 flex items-center justify-center text-white font-medium">
                  {authUser?.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3 hidden md:block">
                  <p className="text-sm font-medium text-neutral-800">{authUser?.name}</p>
                  <p className="text-xs text-neutral-500">Writer</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow">
          <div className="container-custom py-6">
            <Outlet />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-4">
          <div className="container-custom">
            <p className="text-sm text-neutral-500 text-center">&copy; {new Date().getFullYear()} Resume Studio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WriterLayout;
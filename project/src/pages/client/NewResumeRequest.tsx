import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { categoryData } from '../../utils/categoryData';
import { CategoryInfo, ResumeCategory } from '../../types';

const NewResumeRequest = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null);
  const [isLoadingNextStep, setIsLoadingNextStep] = useState(false);

  const handleCategorySelect = (category: CategoryInfo) => {
    setSelectedCategory(category);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      setIsLoadingNextStep(true);
      // Simulate loading delay
      setTimeout(() => {
        navigate(`/client/resume-form/${selectedCategory.id}`);
      }, 500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">Create a New Resume</h2>
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-primary-800">How it works</h3>
              <div className="mt-2 text-sm text-primary-700">
                <p>
                  Select a resume category that matches your profession. Our professional writers will create a tailored resume based on the information you provide. You'll receive your completed resume within 3-5 days.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Select a Category</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {categoryData.map((category) => (
            <motion.div
              key={category.id}
              className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedCategory?.id === category.id
                  ? 'border-primary-600 ring-2 ring-primary-200'
                  : 'border-neutral-200 hover:border-primary-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect(category)}
            >
              {selectedCategory?.id === category.id && (
                <div className="absolute top-2 right-2 text-primary-600">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-medium text-neutral-900">{category.name}</h4>
                <p className="text-sm text-neutral-500 mb-3">₹{category.price}</p>
                <div className="text-xs text-neutral-500">
                  {category.subcategories.slice(0, 3).map((sub, idx) => (
                    <span key={idx} className="inline-block bg-neutral-100 rounded-full px-2 py-1 mr-1 mb-1">
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="inline-block bg-neutral-100 rounded-full px-2 py-1 mb-1">
                      +{category.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedCategory || isLoadingNextStep}
            className={`btn ${
              !selectedCategory ? 'btn-outline opacity-50 cursor-not-allowed' : 'btn-primary'
            }`}
          >
            {isLoadingNextStep ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </motion.div>
      
      {selectedCategory && (
        <motion.div
          className="card"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Category Details</h3>
          
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-neutral-500">Category</p>
              <p className="text-lg font-semibold text-neutral-900">{selectedCategory.name}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <p className="text-sm font-medium text-neutral-500">Price</p>
              <p className="text-lg font-semibold text-primary-600">₹{selectedCategory.price}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-neutral-500 mb-2">Available Subcategories</p>
            <div className="flex flex-wrap">
              {selectedCategory.subcategories.map((subcategory, index) => (
                <span 
                  key={index}
                  className="bg-neutral-100 text-neutral-800 text-sm rounded-full px-3 py-1 mr-2 mb-2"
                >
                  {subcategory}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-4 text-sm">
            <p className="font-medium text-neutral-800 mb-2">What's included:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Professional resume tailored to your selected category</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>ATS-friendly format to pass applicant tracking systems</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Written by industry specialists with knowledge of your field</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Delivered within 3-5 business days</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Downloadable in PDF and DOCX formats</span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NewResumeRequest;
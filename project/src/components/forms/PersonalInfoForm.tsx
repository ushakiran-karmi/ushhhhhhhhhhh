import { useState } from 'react';
import { FormikProps } from 'formik';
import { CategoryInfo, ResumeFormData } from '../../types';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PersonalInfoFormProps {
  formik: FormikProps<ResumeFormData>;
  categoryInfo: CategoryInfo;
}

const PersonalInfoForm = ({ formik, categoryInfo }: PersonalInfoFormProps) => {
  const [newLink, setNewLink] = useState<{ title: string; url: string }>({ title: '', url: '' });
  
  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      const currentLinks = formik.values.personalInfo.additionalLinks || [];
      formik.setFieldValue('personalInfo.additionalLinks', [...currentLinks, { ...newLink }]);
      setNewLink({ title: '', url: '' });
    }
  };
  
  const handleRemoveLink = (index: number) => {
    const currentLinks = formik.values.personalInfo.additionalLinks || [];
    formik.setFieldValue(
      'personalInfo.additionalLinks',
      currentLinks.filter((_, i) => i !== index)
    );
  };
  
  const isIT = categoryInfo.id === 'IT';
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="form-label">
            Full Name <span className="text-error-500">*</span>
          </label>
          <input
            id="fullName"
            name="personalInfo.fullName"
            type="text"
            value={formik.values.personalInfo.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-input ${
              formik.touched.personalInfo?.fullName && formik.errors.personalInfo?.fullName
                ? 'border-error-300'
                : ''
            }`}
          />
          {formik.touched.personalInfo?.fullName && formik.errors.personalInfo?.fullName && (
            <p className="form-error">{formik.errors.personalInfo.fullName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="form-label">
            Email <span className="text-error-500">*</span>
          </label>
          <input
            id="email"
            name="personalInfo.email"
            type="email"
            value={formik.values.personalInfo.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-input ${
              formik.touched.personalInfo?.email && formik.errors.personalInfo?.email
                ? 'border-error-300'
                : ''
            }`}
          />
          {formik.touched.personalInfo?.email && formik.errors.personalInfo?.email && (
            <p className="form-error">{formik.errors.personalInfo.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="form-label">
            Phone <span className="text-error-500">*</span>
          </label>
          <input
            id="phone"
            name="personalInfo.phone"
            type="tel"
            value={formik.values.personalInfo.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-input ${
              formik.touched.personalInfo?.phone && formik.errors.personalInfo?.phone
                ? 'border-error-300'
                : ''
            }`}
          />
          {formik.touched.personalInfo?.phone && formik.errors.personalInfo?.phone && (
            <p className="form-error">{formik.errors.personalInfo.phone}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            id="address"
            name="personalInfo.address"
            type="text"
            value={formik.values.personalInfo.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
        </div>
        
        <div>
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            id="city"
            name="personalInfo.city"
            type="text"
            value={formik.values.personalInfo.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
        </div>
        
        <div>
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            id="state"
            name="personalInfo.state"
            type="text"
            value={formik.values.personalInfo.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="form-label">
            Zip Code
          </label>
          <input
            id="zipCode"
            name="personalInfo.zipCode"
            type="text"
            value={formik.values.personalInfo.zipCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
        </div>
        
        <div>
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            id="country"
            name="personalInfo.country"
            type="text"
            value={formik.values.personalInfo.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
        </div>
        
        <div>
          <label htmlFor="linkedIn" className="form-label">
            LinkedIn Profile
          </label>
          <input
            id="linkedIn"
            name="personalInfo.linkedIn"
            type="url"
            value={formik.values.personalInfo.linkedIn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        
        <div>
          <label htmlFor="portfolio" className="form-label">
            Portfolio Website
          </label>
          <input
            id="portfolio"
            name="personalInfo.portfolio"
            type="url"
            value={formik.values.personalInfo.portfolio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
            placeholder="https://yourportfolio.com"
          />
        </div>
        
        {isIT && (
          <div>
            <label htmlFor="github" className="form-label">
              GitHub Profile
            </label>
            <input
              id="github"
              name="personalInfo.github"
              type="url"
              value={formik.values.personalInfo.github}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
              placeholder="https://github.com/yourusername"
            />
          </div>
        )}
      </div>
      
      <div className="pt-4 border-t border-neutral-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium text-neutral-900">Additional Links/Profiles</h3>
        </div>
        
        {formik.values.personalInfo.additionalLinks &&
          formik.values.personalInfo.additionalLinks.length > 0 && (
            <div className="mb-4 space-y-3">
              {formik.values.personalInfo.additionalLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-grow bg-neutral-50 rounded-lg px-3 py-2">
                    <div className="text-sm font-medium text-neutral-700">{link.title}</div>
                    <div className="text-xs text-neutral-500 truncate">{link.url}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="text-neutral-500 hover:text-error-500"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="link-title" className="form-label">
              Link Title
            </label>
            <input
              id="link-title"
              type="text"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              className="form-input"
              placeholder="e.g. Twitter, Dribbble, Medium"
            />
          </div>
          <div>
            <label htmlFor="link-url" className="form-label">
              URL
            </label>
            <div className="flex">
              <input
                id="link-url"
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="form-input rounded-r-none flex-grow"
                placeholder="https://example.com/profile"
              />
              <button
                type="button"
                onClick={handleAddLink}
                disabled={!newLink.title || !newLink.url}
                className={`px-3 py-2 rounded-r-lg ${
                  newLink.title && newLink.url
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-neutral-200">
        <div className="mb-4">
          <label htmlFor="objective" className="form-label">
            Career Objective <span className="text-error-500">*</span>
          </label>
          <textarea
            id="objective"
            name="objective"
            rows={4}
            value={formik.values.objective}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-input resize-none ${
              formik.touched.objective && formik.errors.objective ? 'border-error-300' : ''
            }`}
            placeholder="Briefly describe your career objectives, goals, and what you're looking for in your next role..."
          ></textarea>
          {formik.touched.objective && formik.errors.objective && (
            <p className="form-error">{formik.errors.objective}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
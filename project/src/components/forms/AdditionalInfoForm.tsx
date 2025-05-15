import { useState } from 'react';
import { FormikProps } from 'formik';
import { ResumeFormData } from '../../types';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AdditionalInfoFormProps {
  formik: FormikProps<ResumeFormData>;
}

const AdditionalInfoForm = ({ formik }: AdditionalInfoFormProps) => {
  const [newCertification, setNewCertification] = useState({ name: '', issuer: '', date: '', url: '' });
  const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: '' });
  const [newHobby, setNewHobby] = useState('');
  
  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      const current = formik.values.certifications || [];
      formik.setFieldValue('certifications', [...current, { ...newCertification }]);
      setNewCertification({ name: '', issuer: '', date: '', url: '' });
    }
  };
  
  const handleRemoveCertification = (index: number) => {
    const current = formik.values.certifications || [];
    formik.setFieldValue(
      'certifications',
      current.filter((_, i) => i !== index)
    );
  };
  
  const handleAddLanguage = () => {
    if (newLanguage.language && newLanguage.proficiency) {
      const current = formik.values.languages || [];
      formik.setFieldValue('languages', [...current, { ...newLanguage }]);
      setNewLanguage({ language: '', proficiency: '' });
    }
  };
  
  const handleRemoveLanguage = (index: number) => {
    const current = formik.values.languages || [];
    formik.setFieldValue(
      'languages',
      current.filter((_, i) => i !== index)
    );
  };
  
  const handleAddHobby = () => {
    if (newHobby) {
      const current = formik.values.hobbies || [];
      formik.setFieldValue('hobbies', [...current, newHobby]);
      setNewHobby('');
    }
  };
  
  const handleRemoveHobby = (index: number) => {
    const current = formik.values.hobbies || [];
    formik.setFieldValue(
      'hobbies',
      current.filter((_, i) => i !== index)
    );
  };
  
  const proficiencyLevels = [
    { value: 'Native', label: 'Native' },
    { value: 'Fluent', label: 'Fluent' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Basic', label: 'Basic' },
  ];
  
  return (
    <div className="space-y-8">
      {/* Certifications Section */}
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Certifications & Licenses</h3>
        
        {formik.values.certifications && formik.values.certifications.length > 0 && (
          <div className="space-y-3 mb-4">
            {formik.values.certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-3">
                <div>
                  <div className="font-medium text-neutral-900">{cert.name}</div>
                  <div className="text-sm text-neutral-600">{cert.issuer}</div>
                  {cert.date && <div className="text-xs text-neutral-500">Issued: {cert.date}</div>}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCertification(index)}
                  className="text-neutral-500 hover:text-error-500"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="cert-name" className="form-label">Certification Name</label>
              <input
                id="cert-name"
                type="text"
                value={newCertification.name}
                onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                className="form-input"
                placeholder="e.g. AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <label htmlFor="cert-issuer" className="form-label">Issuing Organization</label>
              <input
                id="cert-issuer"
                type="text"
                value={newCertification.issuer}
                onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                className="form-input"
                placeholder="e.g. Amazon Web Services"
              />
            </div>
            <div>
              <label htmlFor="cert-date" className="form-label">Issue Date</label>
              <input
                id="cert-date"
                type="date"
                value={newCertification.date}
                onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="cert-url" className="form-label">Certificate URL (optional)</label>
              <input
                id="cert-url"
                type="url"
                value={newCertification.url}
                onChange={(e) => setNewCertification({ ...newCertification, url: e.target.value })}
                className="form-input"
                placeholder="https://example.com/certificate"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddCertification}
              disabled={!newCertification.name || !newCertification.issuer}
              className={`btn ${
                newCertification.name && newCertification.issuer
                  ? 'btn-primary'
                  : 'btn-outline opacity-50 cursor-not-allowed'
              }`}
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Certification
            </button>
          </div>
        </div>
      </div>
      
      {/* Languages Section */}
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Languages</h3>
        
        {formik.values.languages && formik.values.languages.length > 0 && (
          <div className="space-y-3 mb-4">
            {formik.values.languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-3">
                <div>
                  <div className="font-medium text-neutral-900">{lang.language}</div>
                  <div className="text-sm text-neutral-600">Proficiency: {lang.proficiency}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(index)}
                  className="text-neutral-500 hover:text-error-500"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="language-name" className="form-label">Language</label>
              <input
                id="language-name"
                type="text"
                value={newLanguage.language}
                onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                className="form-input"
                placeholder="e.g. Spanish, Mandarin, French"
              />
            </div>
            <div>
              <label htmlFor="language-proficiency" className="form-label">Proficiency Level</label>
              <select
                id="language-proficiency"
                value={newLanguage.proficiency}
                onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
                className="form-select"
              >
                <option value="">Select proficiency level</option>
                {proficiencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddLanguage}
              disabled={!newLanguage.language || !newLanguage.proficiency}
              className={`btn ${
                newLanguage.language && newLanguage.proficiency
                  ? 'btn-primary'
                  : 'btn-outline opacity-50 cursor-not-allowed'
              }`}
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Language
            </button>
          </div>
        </div>
      </div>
      
      {/* Hobbies Section */}
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Hobbies & Interests</h3>
        
        {formik.values.hobbies && formik.values.hobbies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formik.values.hobbies.map((hobby, index) => (
              <div key={index} className="flex items-center bg-neutral-50 rounded-full px-3 py-1.5 border border-neutral-200">
                <span className="text-neutral-800">{hobby}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(index)}
                  className="ml-1.5 text-neutral-500 hover:text-error-500"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex mb-4">
            <input
              id="hobby-input"
              type="text"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              className="form-input rounded-r-none flex-grow"
              placeholder="e.g. Photography, Hiking, Chess"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddHobby();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddHobby}
              disabled={!newHobby}
              className={`px-4 py-2 rounded-r-lg ${
                newHobby
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              Add
            </button>
          </div>
          <p className="text-xs text-neutral-500">
            Adding hobbies can show personality and potentially create connection points with interviewers.
          </p>
        </div>
      </div>
      
      {/* Additional Information */}
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Additional Information</h3>
        <div className="bg-neutral-50 rounded-lg p-4">
          <label htmlFor="additionalInfo" className="form-label">
            Any other information you'd like to include
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={4}
            value={formik.values.additionalInfo || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input resize-none"
            placeholder="Include any additional details that don't fit elsewhere, such as special achievements, awards, or other relevant information..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
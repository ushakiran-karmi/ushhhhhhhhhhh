import { FormikProps } from 'formik';
import { ResumeFormData, Education } from '../../types';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EducationFormProps {
  formik: FormikProps<ResumeFormData>;
}

const EducationForm = ({ formik }: EducationFormProps) => {
  const handleAddEducation = () => {
    const newEducation: Education = {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: null,
      grade: '',
      description: '',
    };
    
    formik.setFieldValue('education', [...formik.values.education, newEducation]);
  };
  
  const handleRemoveEducation = (index: number) => {
    formik.setFieldValue(
      'education',
      formik.values.education.filter((_, i) => i !== index)
    );
  };
  
  return (
    <div className="space-y-6">
      {formik.values.education.map((education, index) => (
        <div key={index} className="bg-neutral-50 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium text-neutral-900">Education #{index + 1}</h3>
            {formik.values.education.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="text-error-600 hover:text-error-800 text-sm flex items-center"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Remove
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`education.${index}.institution`} className="form-label">
                Institution/University <span className="text-error-500">*</span>
              </label>
              <input
                id={`education.${index}.institution`}
                name={`education.${index}.institution`}
                type="text"
                value={education.institution}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-input ${
                  formik.touched.education?.[index]?.institution && 
                  formik.errors.education?.[index]?.institution
                    ? 'border-error-300'
                    : ''
                }`}
              />
              {formik.touched.education?.[index]?.institution && 
               formik.errors.education?.[index]?.institution && (
                <p className="form-error">{formik.errors.education[index].institution}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`education.${index}.degree`} className="form-label">
                Degree <span className="text-error-500">*</span>
              </label>
              <input
                id={`education.${index}.degree`}
                name={`education.${index}.degree`}
                type="text"
                value={education.degree}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-input ${
                  formik.touched.education?.[index]?.degree && 
                  formik.errors.education?.[index]?.degree
                    ? 'border-error-300'
                    : ''
                }`}
                placeholder="e.g. Bachelor of Science, Master's"
              />
              {formik.touched.education?.[index]?.degree && 
               formik.errors.education?.[index]?.degree && (
                <p className="form-error">{formik.errors.education[index].degree}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`education.${index}.fieldOfStudy`} className="form-label">
                Field of Study <span className="text-error-500">*</span>
              </label>
              <input
                id={`education.${index}.fieldOfStudy`}
                name={`education.${index}.fieldOfStudy`}
                type="text"
                value={education.fieldOfStudy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-input ${
                  formik.touched.education?.[index]?.fieldOfStudy && 
                  formik.errors.education?.[index]?.fieldOfStudy
                    ? 'border-error-300'
                    : ''
                }`}
                placeholder="e.g. Computer Science, Business Administration"
              />
              {formik.touched.education?.[index]?.fieldOfStudy && 
               formik.errors.education?.[index]?.fieldOfStudy && (
                <p className="form-error">{formik.errors.education[index].fieldOfStudy}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`education.${index}.grade`} className="form-label">
                Grade/GPA
              </label>
              <input
                id={`education.${index}.grade`}
                name={`education.${index}.grade`}
                type="text"
                value={education.grade || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
                placeholder="e.g. 3.8/4.0, First Class"
              />
            </div>
            
            <div>
              <label htmlFor={`education.${index}.startDate`} className="form-label">
                Start Date <span className="text-error-500">*</span>
              </label>
              <input
                id={`education.${index}.startDate`}
                name={`education.${index}.startDate`}
                type="date"
                value={education.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-input ${
                  formik.touched.education?.[index]?.startDate && 
                  formik.errors.education?.[index]?.startDate
                    ? 'border-error-300'
                    : ''
                }`}
              />
              {formik.touched.education?.[index]?.startDate && 
               formik.errors.education?.[index]?.startDate && (
                <p className="form-error">{formik.errors.education[index].startDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`education.${index}.endDate`} className="form-label">
                End Date
              </label>
              <input
                id={`education.${index}.endDate`}
                name={`education.${index}.endDate`}
                type="date"
                value={education.endDate || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
                disabled={!education.startDate}
                min={education.startDate}
              />
              <p className="text-xs text-neutral-500 mt-1">Leave blank if currently studying</p>
            </div>
          </div>
          
          <div>
            <label htmlFor={`education.${index}.description`} className="form-label">
              Description/Achievements
            </label>
            <textarea
              id={`education.${index}.description`}
              name={`education.${index}.description`}
              rows={3}
              value={education.description || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input resize-none"
              placeholder="Describe relevant coursework, achievements, projects, etc."
            ></textarea>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center text-primary-600 hover:text-primary-800"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Another Education
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
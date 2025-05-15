import { FormikProps } from 'formik';
import { ResumeFormData, Experience } from '../../types';
import { PlusIcon, TrashIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface ExperienceFormProps {
  formik: FormikProps<ResumeFormData>;
}

const ExperienceForm = ({ formik }: ExperienceFormProps) => {
  const handleAddExperience = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: null,
      current: false,
      description: '',
      achievements: [],
    };
    
    formik.setFieldValue('experience', [...formik.values.experience, newExperience]);
  };
  
  const handleRemoveExperience = (index: number) => {
    formik.setFieldValue(
      'experience',
      formik.values.experience.filter((_, i) => i !== index)
    );
  };
  
  const handleAddAchievement = (index: number) => {
    const experience = formik.values.experience[index];
    const achievements = experience.achievements || [];
    formik.setFieldValue(`experience.${index}.achievements`, [...achievements, '']);
  };
  
  const handleRemoveAchievement = (expIndex: number, achieveIndex: number) => {
    const experience = formik.values.experience[expIndex];
    const achievements = experience.achievements || [];
    formik.setFieldValue(
      `experience.${expIndex}.achievements`,
      achievements.filter((_, i) => i !== achieveIndex)
    );
  };
  
  const handleCurrentChange = (index: number, checked: boolean) => {
    formik.setFieldValue(`experience.${index}.current`, checked);
    if (checked) {
      formik.setFieldValue(`experience.${index}.endDate`, null);
    }
  };
  
  return (
    <div className="space-y-6">
      {formik.values.experience.map((experience, index) => (
        <div key={index} className="bg-neutral-50 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium text-neutral-900">Experience #{index + 1}</h3>
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="text-error-600 hover:text-error-800 text-sm flex items-center"
            >
              <TrashIcon className="h-4 w-4 mr-1" />
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`experience.${index}.company`} className="form-label">
                Company <span className="text-error-500">*</span>
              </label>
              <input
                id={`experience.${index}.company`}
                name={`experience.${index}.company`}
                type="text"
                value={experience.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-input ${
                  formik.touched.experience?.[index]?.company && 
                  formik.errors.experience?.[index]?.company
                    ? 'border-error-300'
                    : ''
                }`}
              />
              {formik.touched.experience?.[index]?.company && 
               formik.errors.experience?.[index]?.company && (
                <p className="form-error">{formik.errors.experience[index].company}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`experience.${index}.position`} className="form-label">
                Position <span className="text-error-500">*</span>
              </label>
              <input
                id={`experience.${index}.position`}
                name={`experience.${index}.position`}
                type="text"
                value={experience.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-input ${
                  formik.touched.experience?.[index]?.position && 
                  formik.errors.experience?.[index]?.position
                    ? 'border-error-300'
                    : ''
                }`}
              />
              {formik.touched.experience?.[index]?.position && 
               formik.errors.experience?.[index]?.position && (
                <p className="form-error">{formik.errors.experience[index].position}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`experience.${index}.location`} className="form-label">
                Location
              </label>
              <input
                id={`experience.${index}.location`}
                name={`experience.${index}.location`}
                type="text"
                value={experience.location || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
                placeholder="e.g. New York, NY or Remote"
              />
            </div>
            
            <div className="flex items-center mt-6">
              <input
                id={`experience.${index}.current`}
                name={`experience.${index}.current`}
                type="checkbox"
                checked={experience.current}
                onChange={(e) => handleCurrentChange(index, e.target.checked)}
                className="form-checkbox"
              />
              <label htmlFor={`experience.${index}.current`} className="ml-2 text-sm text-neutral-700">
                I currently work here
              </label>
            </div>
            
            <div>
              <label htmlFor={`experience.${index}.startDate`} className="form-label">
                Start Date <span className="text-error-500">*</span>
              </label>
              <input
                id={`experience.${index}.startDate`}
                name={`experience.${index}.startDate`}
                type="date"
                value={experience.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-input ${
                  formik.touched.experience?.[index]?.startDate && 
                  formik.errors.experience?.[index]?.startDate
                    ? 'border-error-300'
                    : ''
                }`}
              />
              {formik.touched.experience?.[index]?.startDate && 
               formik.errors.experience?.[index]?.startDate && (
                <p className="form-error">{formik.errors.experience[index].startDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`experience.${index}.endDate`} className="form-label">
                End Date
              </label>
              <input
                id={`experience.${index}.endDate`}
                name={`experience.${index}.endDate`}
                type="date"
                value={experience.endDate || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
                disabled={experience.current || !experience.startDate}
                min={experience.startDate}
              />
              {experience.current && (
                <p className="text-xs text-neutral-500 mt-1">Current position</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor={`experience.${index}.description`} className="form-label">
              Job Description <span className="text-error-500">*</span>
            </label>
            <textarea
              id={`experience.${index}.description`}
              name={`experience.${index}.description`}
              rows={3}
              value={experience.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-input resize-none ${
                formik.touched.experience?.[index]?.description && 
                formik.errors.experience?.[index]?.description
                  ? 'border-error-300'
                  : ''
              }`}
              placeholder="Describe your responsibilities and the scope of your role..."
            ></textarea>
            {formik.touched.experience?.[index]?.description && 
             formik.errors.experience?.[index]?.description && (
              <p className="form-error">{formik.errors.experience[index].description}</p>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="form-label">Key Achievements</label>
              <button
                type="button"
                onClick={() => handleAddAchievement(index)}
                className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
              >
                <PlusCircleIcon className="h-4 w-4 mr-1" />
                Add Achievement
              </button>
            </div>
            
            {experience.achievements && experience.achievements.length > 0 ? (
              <div className="space-y-2">
                {experience.achievements.map((achievement, achieveIndex) => (
                  <div key={achieveIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => 
                        formik.setFieldValue(
                          `experience.${index}.achievements.${achieveIndex}`, 
                          e.target.value
                        )
                      }
                      className="form-input flex-grow"
                      placeholder="e.g. Increased sales by 20% in first quarter"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(index, achieveIndex)}
                      className="text-neutral-500 hover:text-error-500"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 italic">
                Add key achievements to highlight your successes in this role
              </p>
            )}
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center text-primary-600 hover:text-primary-800"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Another Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;
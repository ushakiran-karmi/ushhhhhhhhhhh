import { FormikProps } from 'formik';
import { ResumeFormData, Skill, CategoryInfo } from '../../types';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface SkillsFormProps {
  formik: FormikProps<ResumeFormData>;
  categoryInfo: CategoryInfo;
}

const SkillsForm = ({ formik, categoryInfo }: SkillsFormProps) => {
  const handleAddSkill = () => {
    const newSkill: Skill = {
      name: '',
      level: 'Intermediate',
    };
    
    formik.setFieldValue('skills', [...formik.values.skills, newSkill]);
  };
  
  const handleRemoveSkill = (index: number) => {
    formik.setFieldValue(
      'skills',
      formik.values.skills.filter((_, i) => i !== index)
    );
  };
  
  const skillLevels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' },
  ];
  
  // Example skill suggestions based on category
  const getSkillSuggestions = () => {
    switch (categoryInfo.id) {
      case 'IT':
        return [
          'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 
          'Docker', 'Kubernetes', 'SQL', 'NoSQL', 'Git', 'CI/CD',
          'TypeScript', 'GraphQL', 'REST APIs', 'HTML/CSS'
        ];
      case 'FINANCE':
        return [
          'Financial Analysis', 'Budgeting', 'Forecasting', 'Excel', 
          'QuickBooks', 'SAP', 'Financial Modeling', 'Risk Assessment',
          'Financial Reporting', 'Taxation', 'Auditing'
        ];
      case 'MARKETING':
        return [
          'Digital Marketing', 'Social Media Marketing', 'SEO', 'SEM', 
          'Content Creation', 'Google Analytics', 'Email Marketing',
          'Marketing Strategy', 'Brand Management', 'Market Research'
        ];
      default:
        return [
          'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
          'Time Management', 'Adaptability', 'Creativity', 'Critical Thinking',
          'Project Management', 'Attention to Detail'
        ];
    }
  };
  
  const suggestions = getSkillSuggestions();
  
  const handleAddSuggestion = (skill: string) => {
    const existingSkill = formik.values.skills.find(s => 
      s.name.toLowerCase() === skill.toLowerCase()
    );
    
    if (!existingSkill) {
      const newSkill: Skill = {
        name: skill,
        level: 'Intermediate',
      };
      
      formik.setFieldValue('skills', [...formik.values.skills, newSkill]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-primary-800 mb-2">Skill Suggestions</h3>
        <p className="text-xs text-primary-700 mb-3">
          Click on a skill to add it to your list. These suggestions are tailored to your selected category.
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handleAddSuggestion(skill)}
              className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-medium text-primary-700 border border-primary-300 hover:bg-primary-50"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Your Skills</h3>
        
        {formik.values.skills.map((skill, index) => (
          <div key={index} className="bg-neutral-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-medium text-neutral-900">Skill #{index + 1}</h4>
              {formik.values.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-error-600 hover:text-error-800 text-sm flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`skills.${index}.name`} className="form-label">
                  Skill Name <span className="text-error-500">*</span>
                </label>
                <input
                  id={`skills.${index}.name`}
                  name={`skills.${index}.name`}
                  type="text"
                  value={skill.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-input ${
                    formik.touched.skills?.[index]?.name && 
                    formik.errors.skills?.[index]?.name
                      ? 'border-error-300'
                      : ''
                  }`}
                />
                {formik.touched.skills?.[index]?.name && 
                 formik.errors.skills?.[index]?.name && (
                  <p className="form-error">{formik.errors.skills[index].name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor={`skills.${index}.level`} className="form-label">
                  Proficiency Level
                </label>
                <select
                  id={`skills.${index}.level`}
                  name={`skills.${index}.level`}
                  value={skill.level}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-select"
                >
                  {skillLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddSkill}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add Another Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
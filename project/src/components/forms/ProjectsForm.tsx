import { FormikProps } from 'formik';
import { ResumeFormData, Project } from '../../types';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProjectsFormProps {
  formik: FormikProps<ResumeFormData>;
}

const ProjectsForm = ({ formik }: ProjectsFormProps) => {
  const handleAddProject = () => {
    const newProject: Project = {
      title: '',
      description: '',
      technologies: [],
      role: '',
      url: '',
    };
    
    formik.setFieldValue('projects', [...formik.values.projects, newProject]);
  };
  
  const handleRemoveProject = (index: number) => {
    formik.setFieldValue(
      'projects',
      formik.values.projects.filter((_, i) => i !== index)
    );
  };
  
  const handleAddTechnology = (index: number, technology: string) => {
    if (!technology.trim()) return;
    
    const currentTechnologies = formik.values.projects[index].technologies || [];
    if (!currentTechnologies.includes(technology)) {
      formik.setFieldValue(`projects.${index}.technologies`, [...currentTechnologies, technology]);
    }
  };
  
  const handleRemoveTechnology = (projectIndex: number, techIndex: number) => {
    const currentTechnologies = formik.values.projects[projectIndex].technologies || [];
    formik.setFieldValue(
      `projects.${projectIndex}.technologies`,
      currentTechnologies.filter((_, i) => i !== techIndex)
    );
  };
  
  return (
    <div className="space-y-6">
      {formik.values.projects.map((project, index) => (
        <div key={index} className="bg-neutral-50 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium text-neutral-900">Project #{index + 1}</h3>
            <button
              type="button"
              onClick={() => handleRemoveProject(index)}
              className="text-error-600 hover:text-error-800 text-sm flex items-center"
            >
              <TrashIcon className="h-4 w-4 mr-1" />
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`projects.${index}.title`} className="form-label">
                Project Title
              </label>
              <input
                id={`projects.${index}.title`}
                name={`projects.${index}.title`}
                type="text"
                value={project.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
              />
            </div>
            
            <div>
              <label htmlFor={`projects.${index}.role`} className="form-label">
                Your Role
              </label>
              <input
                id={`projects.${index}.role`}
                name={`projects.${index}.role`}
                type="text"
                value={project.role || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
                placeholder="e.g. Team Lead, Developer, Designer"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor={`projects.${index}.description`} className="form-label">
                Project Description
              </label>
              <textarea
                id={`projects.${index}.description`}
                name={`projects.${index}.description`}
                rows={3}
                value={project.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input resize-none"
                placeholder="Describe the project, its goals, and your contributions..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor={`projects.${index}.url`} className="form-label">
                Project URL
              </label>
              <input
                id={`projects.${index}.url`}
                name={`projects.${index}.url`}
                type="url"
                value={project.url || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
                placeholder="https://example.com/project"
              />
            </div>
            
            <div>
              <label className="form-label">Technologies Used</label>
              <div className="flex">
                <input
                  type="text"
                  id={`tech-input-${index}`}
                  placeholder="e.g. React, Python, Figma"
                  className="form-input rounded-r-none flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      handleAddTechnology(index, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  className="px-3 py-2 rounded-r-lg bg-primary-600 hover:bg-primary-700 text-white"
                  onClick={() => {
                    const input = document.getElementById(`tech-input-${index}`) as HTMLInputElement;
                    handleAddTechnology(index, input.value);
                    input.value = '';
                  }}
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              
              {project.technologies && project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center bg-white rounded-full px-3 py-1 text-sm border border-neutral-300">
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(index, techIndex)}
                        className="ml-1 text-neutral-500 hover:text-error-500"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 mt-2">
                  Add technologies to showcase your technical skills
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddProject}
          className="flex items-center text-primary-600 hover:text-primary-800"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Another Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;
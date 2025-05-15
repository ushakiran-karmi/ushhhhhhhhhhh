import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowUpTrayIcon,
  CheckCircleIcon,
  DocumentArrowUpIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { ResumeRequest, ResumeStatus } from '../../types';
import { categoryData } from '../../utils/categoryData';
import ResumeStatusBadge from '../../components/writer/ResumeStatusBadge';
import toast from 'react-hot-toast';

const ResumeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<ResumeRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const randomCategory = categoryData[Math.floor(Math.random() * categoryData.length)];
        const randomSubcategory = randomCategory.subcategories[
          Math.floor(Math.random() * randomCategory.subcategories.length)
        ];
        
        const mockRequest: ResumeRequest = {
          id: id || 'mock_id',
          clientId: 'client_123',
          writerId: 'writer_456',
          supervisorId: 'supervisor_789',
          category: randomCategory.id,
          subcategory: randomSubcategory,
          status: ResumeStatus.IN_PROGRESS,
          formData: {
            personalInfo: {
              fullName: 'John Doe',
              email: 'john.doe@example.com',
              phone: '123-456-7890',
              address: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA',
              linkedIn: 'https://linkedin.com/in/johndoe',
              portfolio: 'https://johndoe.com',
            },
            objective: 'Experienced software developer with a strong background in web development and a passion for creating efficient, scalable applications. Seeking to leverage my technical expertise and leadership skills in a challenging role.',
            education: [
              {
                institution: 'University of Technology',
                degree: 'Bachelor of Science',
                fieldOfStudy: 'Computer Science',
                startDate: '2015-09-01',
                endDate: '2019-05-31',
                grade: '3.8/4.0',
                description: 'Specialized in Software Engineering and Data Structures. Active member of the Computer Science Society.',
              },
              {
                institution: 'Tech Institute',
                degree: 'Associate Degree',
                fieldOfStudy: 'Web Development',
                startDate: '2013-09-01',
                endDate: '2015-05-31',
                grade: '3.9/4.0',
                description: 'Focused on front-end technologies and UI/UX design principles.',
              },
            ],
            experience: [
              {
                company: 'Tech Solutions Inc.',
                position: 'Senior Software Developer',
                location: 'New York, NY',
                startDate: '2019-06-01',
                endDate: null,
                current: true,
                description: 'Lead developer for multiple high-impact projects, mentoring junior developers, and implementing best practices.',
                achievements: [
                  'Reduced application load time by 40% through optimization',
                  'Implemented CI/CD pipeline reducing deployment time by 60%',
                  'Led team of 5 developers in successful project delivery',
                ],
              },
              {
                company: 'Digital Innovations LLC',
                position: 'Software Developer',
                location: 'Boston, MA',
                startDate: '2017-03-01',
                endDate: '2019-05-31',
                current: false,
                description: 'Developed and maintained multiple web applications using React and Node.js.',
                achievements: [
                  'Developed new features for flagship product',
                  'Improved test coverage from 60% to 90%',
                  'Received Employee of the Quarter award',
                ],
              },
            ],
            skills: [
              { name: 'JavaScript', level: 'Expert' },
              { name: 'React', level: 'Advanced' },
              { name: 'Node.js', level: 'Advanced' },
              { name: 'TypeScript', level: 'Advanced' },
              { name: 'Python', level: 'Intermediate' },
              { name: 'AWS', level: 'Intermediate' },
            ],
            projects: [
              {
                title: 'E-commerce Platform',
                description: 'Developed a full-stack e-commerce solution with React, Node.js, and MongoDB.',
                technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Express'],
                role: 'Lead Developer',
                url: 'https://github.com/johndoe/ecommerce',
              },
              {
                title: 'Task Management System',
                description: 'Built a real-time task management system with collaborative features.',
                technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
                role: 'Full Stack Developer',
                url: 'https://github.com/johndoe/task-manager',
              },
            ],
            certifications: [
              {
                name: 'AWS Certified Solutions Architect',
                issuer: 'Amazon Web Services',
                date: '2022-03-15',
                url: 'https://aws.amazon.com/certification',
              },
              {
                name: 'Professional Scrum Master I',
                issuer: 'Scrum.org',
                date: '2021-08-20',
                url: 'https://www.scrum.org/certificates',
              },
            ],
            languages: [
              { language: 'English', proficiency: 'Native' },
              { language: 'Spanish', proficiency: 'Intermediate' },
            ],
            hobbies: ['Open Source Contributing', 'Tech Blogging', 'Photography'],
          },
          price: randomCategory.price,
          paymentStatus: 'COMPLETED',
          createdAt: '2023-01-15T10:30:00Z',
          updatedAt: '2023-01-20T14:45:00Z',
          assignedAt: '2023-01-16T09:15:00Z',
        };
        
        setRequest(mockRequest);
      } catch (error) {
        console.error('Error fetching request:', error);
        toast.error('Failed to load resume details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequest();
  }, [id]);
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
          setSelectedFile(file);
        } else {
          toast.error('File size must be less than 10MB');
        }
      } else {
        toast.error('Please select a PDF or DOCX file');
      }
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update request status
      if (request) {
        setRequest({
          ...request,
          status: ResumeStatus.COMPLETED,
          completedAt: new Date().toISOString(),
          completedResumeUrl: 'https://example.com/resume.pdf',
        });
      }
      
      toast.success('Resume uploaded successfully');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleUpdateStatus = async (newStatus: ResumeStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (request) {
        setRequest({
          ...request,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        });
      }
      
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-secondary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-neutral-600">Loading resume details...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">Resume request not found</h3>
        <p className="text-neutral-600 mb-6">The resume request you're looking for does not exist or has been removed.</p>
        <Link to="/writer/requests" className="btn btn-primary">
          Return to Requests
        </Link>
      </div>
    );
  }

  const categoryInfo = categoryData.find(cat => cat.id === request.category);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header section */}
      <motion.div
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-900">
              {request.subcategory} Resume
            </h2>
            <p className="text-neutral-600">
              {categoryInfo?.name} • Request ID: {request.id.slice(0, 8)}
            </p>
          </div>
          <ResumeStatusBadge status={request.status} large />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6">
          <div className="bg-neutral-100 rounded-lg p-3 flex items-center mb-4 sm:mb-0">
            <span className="text-neutral-600 mr-2">Assigned:</span>
            <span className="text-lg font-semibold text-neutral-900">
              {new Date(request.assignedAt || '').toLocaleDateString()}
            </span>
          </div>
          
          {request.status === ResumeStatus.ASSIGNED && (
            <button
              onClick={() => handleUpdateStatus(ResumeStatus.IN_PROGRESS)}
              className="btn btn-secondary w-full sm:w-auto"
            >
              Start Working
            </button>
          )}
        </div>
      </motion.div>
      
      {/* Upload section */}
      {(request.status === ResumeStatus.IN_PROGRESS || request.status === ResumeStatus.COMPLETED) && (
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Resume Upload</h3>
          
          {request.status === ResumeStatus.COMPLETED ? (
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircleIcon className="h-6 w-6 text-success-600 mr-2" />
                <div>
                  <p className="font-medium text-success-900">Resume uploaded successfully</p>
                  <p className="text-sm text-success-700">
                    Completed on {new Date(request.completedAt || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileSelect}
                />
                
                {selectedFile ? (
                  <div>
                    <DocumentTextIcon className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                    <p className="text-neutral-900 font-medium mb-1">{selectedFile.name}</p>
                    <p className="text-sm text-neutral-500 mb-4">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="btn btn-secondary"
                    >
                      {isUploading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                          Upload Resume
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div>
                    <DocumentArrowUpIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-900 font-medium mb-1">Upload completed resume</p>
                    <p className="text-sm text-neutral-500 mb-4">PDF or DOCX, max 10MB</p>
                    <label
                      htmlFor="resume-upload"
                      className="btn btn-secondary cursor-pointer"
                    >
                      Select File
                    </label>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-neutral-500">
                <p>Please ensure the resume follows our guidelines:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Use professional formatting and fonts</li>
                  <li>Include all information provided by the client</li>
                  <li>Proofread for errors before uploading</li>
                  <li>Maximum file size: 10MB</li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Client Information */}
      <motion.div
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Client Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Personal Information</h4>
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-neutral-900 font-medium">{request.formData.personalInfo.fullName}</p>
              <p className="text-neutral-600">{request.formData.personalInfo.email}</p>
              <p className="text-neutral-600">{request.formData.personalInfo.phone}</p>
              {request.formData.personalInfo.address && (
                <p className="text-neutral-600 mt-2">
                  {request.formData.personalInfo.address}, {request.formData.personalInfo.city}, {request.formData.personalInfo.state} {request.formData.personalInfo.zipCode}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Career Objective</h4>
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-neutral-700">{request.formData.objective}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Education</h4>
            <div className="bg-neutral-50 rounded-lg p-4">
              {request.formData.education.map((edu, index) => (
                <div key={index} className={index > 0 ? 'mt-4 pt-4 border-t border-neutral-200' : ''}>
                  <p className="text-neutral-900 font-medium">{edu.degree} in {edu.fieldOfStudy}</p>
                  <p className="text-neutral-700">{edu.institution}</p>
                  <p className="text-neutral-500 text-sm">
                    {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </p>
                  {edu.grade && <p className="text-neutral-600 text-sm mt-1">Grade: {edu.grade}</p>}
                  {edu.description && <p className="text-neutral-600 text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Experience</h4>
            <div className="bg-neutral-50 rounded-lg p-4">
              {request.formData.experience.map((exp, index) => (
                <div key={index} className={index > 0 ? 'mt-4 pt-4 border-t border-neutral-200' : ''}>
                  <p className="text-neutral-900 font-medium">{exp.position}</p>
                  <p className="text-neutral-700">{exp.company}</p>
                  {exp.location && <p className="text-neutral-600 text-sm">{exp.location}</p>}
                  <p className="text-neutral-500 text-sm">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                      exp.endDate 
                        ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        : 'Present'
                    }
                  </p>
                  <p className="text-neutral-700 mt-2">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-neutral-600 text-sm">• {achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Skills</h4>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="flex flex-wrap gap-2">
                {request.formData.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-neutral-200 text-neutral-800 rounded-full px-3 py-1 text-sm"
                  >
                    {skill.name}{skill.level ? ` (${skill.level})` : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Projects</h4>
            <div className="bg-neutral-50 rounded-lg p-4">
              {request.formData.projects.map((project, index) => (
                <div key={index} className={index > 0 ? 'mt-4 pt-4 border-t border-neutral-200' : ''}>
                  <p className="text-neutral-900 font-medium">{project.title}</p>
                  {project.role && <p className="text-neutral-700 text-sm">Role: {project.role}</p>}
                  <p className="text-neutral-700 text-sm mt-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2">
                      <span className="text-neutral-600 text-sm">Technologies: </span>
                      <span className="text-neutral-700 text-sm">{project.technologies.join(', ')}</span>
                    </div>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-600 hover:text-secondary-800 text-sm mt-1 inline-block"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {request.formData.certifications && request.formData.certifications.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-2">Certifications</h4>
              <div className="bg-neutral-50 rounded-lg p-4">
                {request.formData.certifications.map((cert, index) => (
                  <div key={index} className={index > 0 ? 'mt-4 pt-4 border-t border-neutral-200' : ''}>
                    <p className="text-neutral-900 font-medium">{cert.name}</p>
                    <p className="text-neutral-700 text-sm">Issuer: {cert.issuer}</p>
                    <p className="text-neutral-500 text-sm">
                      Issued: {new Date(cert.date).toLocaleDateString()}
                    </p>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary-600 hover:text-secondary-800 text-sm mt-1 inline-block"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {request.formData.languages && request.formData.languages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-2">Languages</h4>
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="space-y-2">
                  {request.formData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-neutral-900">{lang.language}</span>
                      <span className="text-neutral-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {request.formData.hobbies && request.formData.hobbies.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-2">Hobbies & Interests</h4>
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {request.formData.hobbies.map((hobby, index) => (
                    <span 
                      key={index}
                      className="bg-neutral-200 text-neutral-800 rounded-full px-3 py-1 text-sm"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeDetail;
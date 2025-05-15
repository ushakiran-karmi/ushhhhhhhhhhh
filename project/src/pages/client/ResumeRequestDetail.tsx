import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  ArrowDownTrayIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { ResumeRequest, ResumeStatus } from '../../types';
import { categoryData } from '../../utils/categoryData';
import ResumeStatusBadge from '../../components/client/ResumeStatusBadge';
import ResumeTimeline from '../../components/client/ResumeTimeline';
import toast from 'react-hot-toast';

const ResumeRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<ResumeRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(false);
  
  useEffect(() => {
    const fetchResumeRequest = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockRequest: ResumeRequest = {
          id: id || 'mock_id',
          clientId: 'client_123',
          writerId: 'writer_456',
          supervisorId: 'supervisor_789',
          category: categoryData[0].id,
          subcategory: categoryData[0].subcategories[0],
          status: ResumeStatus.COMPLETED,
          formData: {
            personalInfo: {
              fullName: 'John Doe',
              email: 'john.doe@example.com',
              phone: '123-456-7890',
            },
            objective: 'Experienced software developer seeking...',
            education: [{
              institution: 'University Example',
              degree: 'Bachelor of Science',
              fieldOfStudy: 'Computer Science',
              startDate: '2015-09-01',
              endDate: '2019-05-31',
            }],
            experience: [{
              company: 'Example Corp',
              position: 'Software Developer',
              location: 'New York, NY',
              startDate: '2019-06-01',
              endDate: null,
              current: true,
              description: 'Developing web applications...',
            }],
            skills: [
              { name: 'JavaScript', level: 'Advanced' },
              { name: 'React', level: 'Intermediate' },
              { name: 'Node.js', level: 'Intermediate' },
            ],
            projects: [{
              title: 'E-commerce Platform',
              description: 'Developed a full-stack e-commerce solution...',
              technologies: ['React', 'Node.js', 'MongoDB'],
            }],
          },
          price: categoryData[0].price,
          paymentStatus: 'COMPLETED',
          completedResumeUrl: 'https://example.com/resume.pdf',
          createdAt: '2023-01-15T10:30:00Z',
          updatedAt: '2023-01-20T14:45:00Z',
          assignedAt: '2023-01-16T09:15:00Z',
          completedAt: '2023-01-19T16:20:00Z',
        };
        
        setRequest(mockRequest);
      } catch (error) {
        console.error('Error fetching resume request:', error);
        toast.error('Failed to load resume details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResumeRequest();
  }, [id]);
  
  const handleDownload = async () => {
    setDownloadClicked(true);
    
    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would trigger the actual download
      toast.success('Resume downloaded successfully!');
      
      // Update status to delivered if not already
      if (request && request.status === ResumeStatus.COMPLETED) {
        setRequest({
          ...request,
          status: ResumeStatus.DELIVERED,
          deliveredAt: new Date().toISOString(),
        });
        
        setShowFeedbackForm(true);
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume');
    } finally {
      setDownloadClicked(false);
    }
  };
  
  const handleSubmitFeedback = async () => {
    if (feedbackRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    setIsSubmittingFeedback(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update request with feedback
      if (request) {
        setRequest({
          ...request,
          feedback: {
            rating: feedbackRating,
            comment: feedbackComment,
            createdAt: new Date().toISOString(),
          },
        });
      }
      
      setShowFeedbackForm(false);
      toast.success('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };
  
  const categoryInfo = request ? categoryData.find(cat => cat.id === request.category) : null;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        <Link to="/client/dashboard" className="btn btn-primary">
          Return to Dashboard
        </Link>
      </div>
    );
  }
  
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
            <span className="text-neutral-600 mr-2">Amount Paid:</span>
            <span className="text-lg font-semibold text-primary-700">₹{request.price}</span>
          </div>
          
          {request.status === ResumeStatus.COMPLETED || request.status === ResumeStatus.DELIVERED ? (
            <button
              onClick={handleDownload}
              disabled={downloadClicked}
              className="btn btn-success w-full sm:w-auto"
            >
              {downloadClicked ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Download Resume
                </>
              )}
            </button>
          ) : (
            <div className="text-neutral-600 bg-neutral-100 rounded-lg p-3">
              Your resume will be available for download once completed
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Timeline section */}
      <motion.div
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Request Timeline</h3>
        <ResumeTimeline request={request} />
      </motion.div>
      
      {/* Request details section */}
      <motion.div
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Resume Details</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Personal Information</h4>
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-neutral-900 font-medium">{request.formData.personalInfo.fullName}</p>
              <p className="text-neutral-600">{request.formData.personalInfo.email}</p>
              <p className="text-neutral-600">{request.formData.personalInfo.phone}</p>
              {request.formData.personalInfo.address && (
                <p className="text-neutral-600 mt-2">{request.formData.personalInfo.address}</p>
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
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Skills</h4>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="flex flex-wrap">
                {request.formData.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-neutral-200 text-neutral-800 rounded-full px-3 py-1 text-sm mr-2 mb-2"
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
                  <p className="text-neutral-700 text-sm mt-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2">
                      <span className="text-neutral-600 text-sm">Technologies: </span>
                      <span className="text-neutral-700 text-sm">{project.technologies.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Feedback section */}
      {(showFeedbackForm || request.feedback) && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Feedback</h3>
          
          {request.feedback ? (
            <div className="bg-neutral-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="mr-2">Your rating:</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIconSolid
                      key={star}
                      className={`h-5 w-5 ${
                        star <= request.feedback!.rating
                          ? 'text-warning-500'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {request.feedback.comment && (
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Your comment:</div>
                  <p className="text-neutral-700">{request.feedback.comment}</p>
                </div>
              )}
              
              <div className="text-xs text-neutral-500 mt-4">
                Submitted on {new Date(request.feedback.createdAt).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div className="bg-neutral-50 rounded-lg p-6">
              <h4 className="text-md font-medium text-neutral-800 mb-4">Rate Your Resume</h4>
              
              <div className="mb-6">
                <div className="text-sm text-neutral-700 mb-2">How would you rate the quality of your resume?</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      {star <= feedbackRating ? (
                        <StarIconSolid className="h-7 w-7 text-warning-500" />
                      ) : (
                        <StarIcon className="h-7 w-7 text-neutral-400 hover:text-warning-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm text-neutral-700 mb-2">
                  Additional comments (optional)
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  className="form-input resize-none"
                  placeholder="Share your thoughts about the resume..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmitFeedback}
                  disabled={isSubmittingFeedback}
                  className="btn btn-primary"
                >
                  {isSubmittingFeedback ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ResumeRequestDetail;
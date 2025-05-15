import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DocumentPlusIcon, 
  DocumentCheckIcon, 
  ClockIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { ResumeRequest, ResumeStatus, CategoryInfo } from '../../types';
import { categoryData } from '../../utils/categoryData';
import ResumeStatusBadge from '../../components/client/ResumeStatusBadge';

// Mock data for the demo
const generateMockResumes = (userId: string): ResumeRequest[] => {
  const statuses: ResumeStatus[] = [
    ResumeStatus.PENDING_ASSIGNMENT,
    ResumeStatus.ASSIGNED,
    ResumeStatus.IN_PROGRESS,
    ResumeStatus.COMPLETED,
    ResumeStatus.DELIVERED
  ];
  
  const mockResumes: ResumeRequest[] = [];
  
  // Create 1-4 mock resumes with different statuses
  const numResumes = Math.floor(Math.random() * 4) + 1;
  
  for (let i = 0; i < numResumes; i++) {
    const randomCategoryIndex = Math.floor(Math.random() * categoryData.length);
    const randomCategory = categoryData[randomCategoryIndex];
    const randomSubcategoryIndex = Math.floor(Math.random() * randomCategory.subcategories.length);
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 14)); // Random date in the last 2 weeks
    
    let assignedAt, completedAt, deliveredAt;
    
    if (randomStatus === ResumeStatus.ASSIGNED || randomStatus === ResumeStatus.IN_PROGRESS || 
        randomStatus === ResumeStatus.COMPLETED || randomStatus === ResumeStatus.DELIVERED) {
      assignedAt = new Date(createdAt);
      assignedAt.setDate(assignedAt.getDate() + 1);
    }
    
    if (randomStatus === ResumeStatus.COMPLETED || randomStatus === ResumeStatus.DELIVERED) {
      completedAt = new Date(assignedAt || createdAt);
      completedAt.setDate(completedAt.getDate() + 2);
    }
    
    if (randomStatus === ResumeStatus.DELIVERED) {
      deliveredAt = new Date(completedAt || createdAt);
      deliveredAt.setDate(deliveredAt.getDate() + 1);
    }
    
    mockResumes.push({
      id: `resume_${i}_${Math.random().toString(36).substr(2, 9)}`,
      clientId: userId,
      writerId: randomStatus !== ResumeStatus.PENDING_ASSIGNMENT ? `writer_${Math.random().toString(36).substr(2, 9)}` : undefined,
      supervisorId: randomStatus !== ResumeStatus.PENDING_ASSIGNMENT ? `supervisor_${Math.random().toString(36).substr(2, 9)}` : undefined,
      category: randomCategory.id,
      subcategory: randomCategory.subcategories[randomSubcategoryIndex],
      status: randomStatus,
      formData: {
        personalInfo: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
        },
        objective: 'Experienced professional seeking...',
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
      price: randomCategory.price,
      paymentStatus: 'COMPLETED',
      createdAt: createdAt.toISOString(),
      updatedAt: new Date().toISOString(),
      assignedAt: assignedAt?.toISOString(),
      completedAt: completedAt?.toISOString(),
      deliveredAt: deliveredAt?.toISOString(),
    });
  }
  
  return mockResumes;
};

const Dashboard = () => {
  const { authUser } = useAuth();
  const [resumeRequests, setResumeRequests] = useState<ResumeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumeRequests = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRequests = generateMockResumes(authUser?.id || '');
        setResumeRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching resume requests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResumeRequests();
  }, [authUser?.id]);

  // Calculate counts for the summary cards
  const pendingCount = resumeRequests.filter(req => 
    req.status === ResumeStatus.PENDING_ASSIGNMENT || 
    req.status === ResumeStatus.ASSIGNED ||
    req.status === ResumeStatus.IN_PROGRESS
  ).length;
  
  const completedCount = resumeRequests.filter(req => 
    req.status === ResumeStatus.COMPLETED || 
    req.status === ResumeStatus.DELIVERED
  ).length;
  
  const getStatusText = (status: ResumeStatus): string => {
    switch (status) {
      case ResumeStatus.PENDING_ASSIGNMENT:
        return 'Waiting for writer assignment';
      case ResumeStatus.ASSIGNED:
        return 'Writer assigned, in queue';
      case ResumeStatus.IN_PROGRESS:
        return 'Writer is working on your resume';
      case ResumeStatus.COMPLETED:
        return 'Ready for download';
      case ResumeStatus.DELIVERED:
        return 'Downloaded';
      default:
        return 'Unknown status';
    }
  };
  
  const getTimeEstimate = (request: ResumeRequest): string => {
    if (request.status === ResumeStatus.COMPLETED || request.status === ResumeStatus.DELIVERED) {
      return 'Completed';
    }
    
    if (request.assignedAt) {
      // Estimate 3 days from assignment date
      const assignedDate = new Date(request.assignedAt);
      const estimatedDate = new Date(assignedDate);
      estimatedDate.setDate(estimatedDate.getDate() + 3);
      
      const today = new Date();
      const diffTime = estimatedDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0) {
        return 'Due today';
      } else if (diffDays === 1) {
        return 'Due tomorrow';
      } else {
        return `Due in ${diffDays} days`;
      }
    }
    
    return 'Pending assignment';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-neutral-600">Loading your resume requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <motion.div 
        className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl text-white p-6 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">Welcome back, {authUser?.name}!</h2>
        <p className="text-primary-100">
          {resumeRequests.length === 0 
            ? "Ready to create your professional resume? Let's get started!"
            : "Here's an overview of your resume requests and their current status."}
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="card bg-gradient-to-br from-primary-50 to-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Total Resumes</p>
              <h3 className="text-2xl font-bold text-neutral-800">{resumeRequests.length}</h3>
            </div>
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
              <DocumentCheckIcon className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card bg-gradient-to-br from-warning-50 to-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">In Progress</p>
              <h3 className="text-2xl font-bold text-neutral-800">{pendingCount}</h3>
            </div>
            <div className="h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center text-warning-600">
              <ClockIcon className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card bg-gradient-to-br from-success-50 to-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Completed</p>
              <h3 className="text-2xl font-bold text-neutral-800">{completedCount}</h3>
            </div>
            <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center text-success-600">
              <DocumentArrowDownIcon className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Resume requests section */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-neutral-800">Your Resume Requests</h3>
          <Link to="/client/request/new" className="btn btn-primary">
            <DocumentPlusIcon className="h-5 w-5 mr-2" />
            New Resume
          </Link>
        </div>
        
        {resumeRequests.length === 0 ? (
          <div className="bg-neutral-50 rounded-lg p-8 text-center">
            <DocumentPlusIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No resume requests yet</h3>
            <p className="text-neutral-500 mb-6">Create your first resume request to get started</p>
            <Link to="/client/request/new" className="btn btn-primary">
              Create New Resume
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                  <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Estimated Completion</th>
                  <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Requested On</th>
                  <th className="py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {resumeRequests.map((request) => {
                  const categoryInfo = categoryData.find(cat => cat.id === request.category);
                  return (
                    <tr key={request.id} className="hover:bg-neutral-50">
                      <td className="py-4">
                        <div>
                          <div className="font-medium text-neutral-900">{request.subcategory}</div>
                          <div className="text-sm text-neutral-500">{categoryInfo?.name}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <ResumeStatusBadge status={request.status} />
                        <div className="text-sm text-neutral-500 mt-1">{getStatusText(request.status)}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-sm text-neutral-700">{getTimeEstimate(request)}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-sm text-neutral-700">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <Link 
                          to={`/client/request/${request.id}`}
                          className="btn btn-outline btn-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
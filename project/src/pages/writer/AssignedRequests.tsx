import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { ResumeRequest, ResumeStatus } from '../../types';
import { categoryData } from '../../utils/categoryData';
import ResumeStatusBadge from '../../components/writer/ResumeStatusBadge';

const AssignedRequests = () => {
  const { authUser } = useAuth();
  const [requests, setRequests] = useState<ResumeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ResumeStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data generation
        const mockRequests: ResumeRequest[] = Array.from({ length: 10 }, (_, i) => {
          const randomCategory = categoryData[Math.floor(Math.random() * categoryData.length)];
          const randomSubcategory = randomCategory.subcategories[
            Math.floor(Math.random() * randomCategory.subcategories.length)
          ];
          
          const statuses = [
            ResumeStatus.ASSIGNED,
            ResumeStatus.IN_PROGRESS,
            ResumeStatus.COMPLETED
          ];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          const createdAt = new Date();
          createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
          
          const assignedAt = new Date(createdAt);
          assignedAt.setDate(assignedAt.getDate() + 1);
          
          let completedAt;
          if (randomStatus === ResumeStatus.COMPLETED) {
            completedAt = new Date(assignedAt);
            completedAt.setDate(completedAt.getDate() + Math.floor(Math.random() * 3) + 1);
          }
          
          return {
            id: `req_${i}_${Math.random().toString(36).substr(2, 9)}`,
            clientId: `client_${Math.random().toString(36).substr(2, 9)}`,
            writerId: authUser?.id,
            supervisorId: `supervisor_${Math.random().toString(36).substr(2, 9)}`,
            category: randomCategory.id,
            subcategory: randomSubcategory,
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
            assignedAt: assignedAt.toISOString(),
            completedAt: completedAt?.toISOString(),
          };
        });
        
        setRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, [authUser?.id]);
  
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || request.status === statusFilter;
    
    const matchesCategory = categoryFilter === 'ALL' || request.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const getTimeEstimate = (request: ResumeRequest): string => {
    if (request.status === ResumeStatus.COMPLETED) {
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
    
    return 'Not started';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-secondary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-neutral-600">Loading assigned requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Assigned Requests</h1>
            <p className="text-neutral-600">Manage and track your assigned resume requests</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-500">
              {filteredRequests.length} {filteredRequests.length === 1 ? 'request' : 'requests'}
            </span>
          </div>
        </div>
      </motion.div>
      
      {/* Filters */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
                placeholder="Search by category or request ID..."
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ResumeStatus | 'ALL')}
                className="form-select"
              >
                <option value="ALL">All Statuses</option>
                <option value={ResumeStatus.ASSIGNED}>Assigned</option>
                <option value={ResumeStatus.IN_PROGRESS}>In Progress</option>
                <option value={ResumeStatus.COMPLETED}>Completed</option>
              </select>
            </div>
            
            <div className="w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="form-select"
              >
                <option value="ALL">All Categories</option>
                {categoryData.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Requests List */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredRequests.length === 0 ? (
          <div className="p-6 text-center">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-neutral-400" />
            <h3 className="mt-2 text-sm font-medium text-neutral-900">No requests found</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {searchTerm || statusFilter !== 'ALL' || categoryFilter !== 'ALL'
                ? 'Try adjusting your filters'
                : 'You have no assigned requests yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Request Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredRequests.map((request) => {
                  const categoryInfo = categoryData.find(cat => cat.id === request.category);
                  return (
                    <tr key={request.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">
                          {request.id}
                        </div>
                        <div className="text-sm text-neutral-500">
                          Assigned: {new Date(request.assignedAt || '').toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">
                          {request.subcategory}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {categoryInfo?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ResumeStatusBadge status={request.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">
                          {getTimeEstimate(request)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/writer/request/${request.id}`}
                          className="text-secondary-600 hover:text-secondary-900"
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

export default AssignedRequests;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  CheckCircleIcon, 
  ClockIcon,
  BanknotesIcon,
  ArrowUpCircleIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { ResumeRequest, ResumeStatus, Transaction } from '../../types';
import { categoryData } from '../../utils/categoryData';
import ResumeStatusBadge from '../../components/writer/ResumeStatusBadge';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Mock data generation for the demo
const generateMockResumes = (userId: string): ResumeRequest[] => {
  const statuses: ResumeStatus[] = [
    ResumeStatus.ASSIGNED,
    ResumeStatus.IN_PROGRESS,
    ResumeStatus.COMPLETED,
    ResumeStatus.DELIVERED
  ];
  
  const mockResumes: ResumeRequest[] = [];
  
  // Create 5-8 mock resumes with different statuses
  const numResumes = Math.floor(Math.random() * 4) + 5;
  
  for (let i = 0; i < numResumes; i++) {
    const randomCategoryIndex = Math.floor(Math.random() * categoryData.length);
    const randomCategory = categoryData[randomCategoryIndex];
    const randomSubcategoryIndex = Math.floor(Math.random() * randomCategory.subcategories.length);
    
    // Bias toward having more completed resumes
    let randomStatus;
    const rand = Math.random();
    if (rand < 0.4) {
      randomStatus = ResumeStatus.DELIVERED;
    } else if (rand < 0.6) {
      randomStatus = ResumeStatus.COMPLETED;
    } else if (rand < 0.8) {
      randomStatus = ResumeStatus.IN_PROGRESS;
    } else {
      randomStatus = ResumeStatus.ASSIGNED;
    }
    
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30)); // Random date in the last month
    
    let assignedAt = new Date(createdAt);
    assignedAt.setDate(assignedAt.getDate() + 1);
    
    let completedAt, deliveredAt;
    
    if (randomStatus === ResumeStatus.COMPLETED || randomStatus === ResumeStatus.DELIVERED) {
      completedAt = new Date(assignedAt);
      completedAt.setDate(completedAt.getDate() + 2);
    }
    
    if (randomStatus === ResumeStatus.DELIVERED) {
      deliveredAt = new Date(completedAt || assignedAt);
      deliveredAt.setDate(deliveredAt.getDate() + 1);
    }
    
    mockResumes.push({
      id: `resume_${i}_${Math.random().toString(36).substr(2, 9)}`,
      clientId: `client_${Math.random().toString(36).substr(2, 9)}`,
      writerId: userId,
      supervisorId: `supervisor_${Math.random().toString(36).substr(2, 9)}`,
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
      assignedAt: assignedAt.toISOString(),
      completedAt: completedAt?.toISOString(),
      deliveredAt: deliveredAt?.toISOString(),
    });
  }
  
  return mockResumes;
};

const generateMockTransactions = (resumeRequests: ResumeRequest[], userId: string): Transaction[] => {
  const transactions: Transaction[] = [];
  
  // Create credit transactions for completed resumes
  resumeRequests
    .filter(req => req.status === ResumeStatus.COMPLETED || req.status === ResumeStatus.DELIVERED)
    .forEach((req, index) => {
      // Writer payment is 70% of the resume price
      const amount = Math.round(req.price * 0.7);
      
      const createdAt = req.completedAt ? new Date(req.completedAt) : new Date();
      
      transactions.push({
        id: `trans_${index}_${Math.random().toString(36).substr(2, 9)}`,
        writerId: userId,
        resumeRequestId: req.id,
        type: 'CREDIT',
        amount,
        status: index < 2 ? 'PENDING' : 'COMPLETED', // Make some transactions pending
        description: `Payment for ${req.subcategory} resume`,
        createdAt: createdAt.toISOString(),
        processedAt: index < 2 ? undefined : createdAt.toISOString(),
      });
    });
  
  // Add a few withdrawal transactions
  if (transactions.length > 3) {
    const totalEarned = transactions
      .filter(t => t.status === 'COMPLETED')
      .reduce((sum, t) => sum + t.amount, 0);
    
    if (totalEarned > 1000) {
      const withdrawalDate = new Date();
      withdrawalDate.setDate(withdrawalDate.getDate() - 15);
      
      transactions.push({
        id: `withdraw_${Math.random().toString(36).substr(2, 9)}`,
        writerId: userId,
        type: 'WITHDRAWAL',
        amount: Math.round(totalEarned * 0.7), // Withdraw 70% of earnings
        status: 'COMPLETED',
        description: 'Withdrawal to bank account',
        createdAt: withdrawalDate.toISOString(),
        processedAt: withdrawalDate.toISOString(),
      });
    }
  }
  
  return transactions;
};

const Dashboard = () => {
  const { authUser } = useAuth();
  const [resumeRequests, setResumeRequests] = useState<ResumeRequest[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRequests = generateMockResumes(authUser?.id || '');
        const mockTransactions = generateMockTransactions(mockRequests, authUser?.id || '');
        
        setResumeRequests(mockRequests);
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [authUser?.id]);

  // Calculate counts and earnings for the summary cards
  const pendingCount = resumeRequests.filter(req => 
    req.status === ResumeStatus.ASSIGNED || 
    req.status === ResumeStatus.IN_PROGRESS
  ).length;
  
  const completedCount = resumeRequests.filter(req => 
    req.status === ResumeStatus.COMPLETED || 
    req.status === ResumeStatus.DELIVERED
  ).length;
  
  const totalEarnings = transactions
    .filter(t => t.type === 'CREDIT' && t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingEarnings = transactions
    .filter(t => t.type === 'CREDIT' && t.status === 'PENDING')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const withdrawals = transactions
    .filter(t => t.type === 'WITHDRAWAL' && t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const availableBalance = totalEarnings - withdrawals;
  
  // Chart data
  const statusChartData = {
    labels: ['Assigned', 'In Progress', 'Completed', 'Delivered'],
    datasets: [
      {
        data: [
          resumeRequests.filter(req => req.status === ResumeStatus.ASSIGNED).length,
          resumeRequests.filter(req => req.status === ResumeStatus.IN_PROGRESS).length,
          resumeRequests.filter(req => req.status === ResumeStatus.COMPLETED).length,
          resumeRequests.filter(req => req.status === ResumeStatus.DELIVERED).length,
        ],
        backgroundColor: [
          '#60A5FA', // primary-400
          '#22D3EE', // secondary-400
          '#34D399', // success-400
          '#F97316', // accent-500
        ],
        borderColor: [
          '#DBEAFE', // primary-100
          '#CFFAFE', // secondary-100
          '#D1FAE5', // success-100
          '#FFEDD5', // accent-100
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Function to get grouped data by categories
  const getCategoryData = () => {
    const categoryStats = categoryData.reduce((acc, category) => {
      acc[category.id] = resumeRequests.filter(req => req.category === category.id).length;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      labels: categoryData.map(c => c.name),
      datasets: [
        {
          label: 'Resumes by Category',
          data: categoryData.map(c => categoryStats[c.id] || 0),
          backgroundColor: '#3B82F6', // primary-500
          borderRadius: 8,
        },
      ],
    };
  };

  // Get recent pending resumes
  const recentPendingResumes = resumeRequests
    .filter(req => req.status === ResumeStatus.ASSIGNED || req.status === ResumeStatus.IN_PROGRESS)
    .sort((a, b) => new Date(b.assignedAt || b.createdAt).getTime() - new Date(a.assignedAt || a.createdAt).getTime())
    .slice(0, 3);
  
  // Get recent transactions
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-secondary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <motion.div 
        className="bg-gradient-to-r from-secondary-600 to-secondary-800 rounded-xl text-white p-6 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">Welcome back, {authUser?.name}!</h2>
        <p className="text-secondary-100">
          You have {pendingCount} pending resume {pendingCount === 1 ? 'request' : 'requests'} and have completed {completedCount} {completedCount === 1 ? 'resume' : 'resumes'} so far.
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="card bg-gradient-to-br from-secondary-50 to-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Pending Resumes</p>
              <h3 className="text-2xl font-bold text-neutral-800">{pendingCount}</h3>
            </div>
            <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600">
              <ClockIcon className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card bg-gradient-to-br from-success-50 to-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Completed Resumes</p>
              <h3 className="text-2xl font-bold text-neutral-800">{completedCount}</h3>
            </div>
            <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center text-success-600">
              <CheckCircleIcon className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card bg-gradient-to-br from-accent-50 to-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Available Balance</p>
              <h3 className="text-2xl font-bold text-neutral-800">₹{availableBalance}</h3>
              {pendingEarnings > 0 && (
                <p className="text-xs text-neutral-500">+ ₹{pendingEarnings} pending</p>
              )}
            </div>
            <div className="h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center text-accent-600">
              <BanknotesIcon className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and recent items section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="card lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-neutral-800 mb-4">Resume Status</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={statusChartData} 
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                    },
                  },
                  tooltip: {
                    backgroundColor: 'white',
                    bodyColor: '#1f2937',
                    titleColor: '#1f2937',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                      size: 14,
                      weight: 'bold',
                    },
                    bodyFont: {
                      size: 14,
                    },
                    displayColors: true,
                    boxPadding: 6,
                  },
                },
              }} 
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-neutral-800 mb-4">Resumes by Category</h3>
          <div className="h-64">
            <Bar 
              data={getCategoryData()} 
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'white',
                    bodyColor: '#1f2937',
                    titleColor: '#1f2937',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                      size: 14,
                      weight: 'bold',
                    },
                    bodyFont: {
                      size: 14,
                    },
                    displayColors: false,
                  },
                },
              }} 
            />
          </div>
        </motion.div>
      </div>

      {/* Pending Resumes and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-neutral-800">Pending Resumes</h3>
            <Link to="/writer/requests" className="text-secondary-600 hover:text-secondary-800 text-sm font-medium">
              View all
            </Link>
          </div>
          
          {recentPendingResumes.length === 0 ? (
            <div className="bg-neutral-50 rounded-lg p-6 text-center">
              <DocumentTextIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-700 mb-2">No pending resumes</h3>
              <p className="text-neutral-500">You're all caught up! Check back later for new assignments.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentPendingResumes.map((resume) => {
                const categoryInfo = categoryData.find(cat => cat.id === resume.category);
                return (
                  <div key={resume.id} className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">{resume.subcategory}</h4>
                        <p className="text-sm text-neutral-500">{categoryInfo?.name}</p>
                      </div>
                      <ResumeStatusBadge status={resume.status} />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-xs text-neutral-500">
                        Assigned: {new Date(resume.assignedAt || resume.createdAt).toLocaleDateString()}
                      </p>
                      <Link to={`/writer/request/${resume.id}`} className="text-sm font-medium text-secondary-600 hover:text-secondary-800">
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-neutral-800">Recent Transactions</h3>
            <Link to="/writer/wallet" className="text-secondary-600 hover:text-secondary-800 text-sm font-medium">
              View all
            </Link>
          </div>
          
          {recentTransactions.length === 0 ? (
            <div className="bg-neutral-50 rounded-lg p-6 text-center">
              <BanknotesIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-700 mb-2">No transactions yet</h3>
              <p className="text-neutral-500">Complete resumes to earn money and see transactions here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'CREDIT' ? 'bg-success-100 text-success-600' : 'bg-accent-100 text-accent-600'
                    }`}>
                      {transaction.type === 'CREDIT' ? (
                        <ArrowTrendingUpIcon className="h-5 w-5" />
                      ) : (
                        <ArrowUpCircleIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{transaction.description}</p>
                      <p className="text-xs text-neutral-500">
                        {new Date(transaction.createdAt).toLocaleDateString()} • 
                        <span className={`ml-1 ${
                          transaction.status === 'COMPLETED' ? 'text-success-600' : 'text-warning-600'
                        }`}>
                          {transaction.status === 'COMPLETED' ? 'Completed' : 'Pending'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    transaction.type === 'CREDIT' ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
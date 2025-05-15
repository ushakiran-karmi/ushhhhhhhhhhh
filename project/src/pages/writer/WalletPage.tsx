import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowUpCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { Transaction } from '../../types';
import toast from 'react-hot-toast';

const WalletPage = () => {
  const { authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock transactions
        const mockTransactions: Transaction[] = [];
        
        // Add some completed credits (earnings)
        for (let i = 0; i < 5; i++) {
          const amount = Math.floor(Math.random() * 300) + 200;
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
          
          mockTransactions.push({
            id: `credit_${i}_${Math.random().toString(36).substr(2, 9)}`,
            writerId: authUser?.id || '',
            resumeRequestId: `request_${Math.random().toString(36).substr(2, 9)}`,
            type: 'CREDIT',
            amount,
            status: 'COMPLETED',
            description: 'Payment for completed resume',
            createdAt: date.toISOString(),
            processedAt: date.toISOString(),
          });
        }
        
        // Add some pending credits
        for (let i = 0; i < 2; i++) {
          const amount = Math.floor(Math.random() * 300) + 200;
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 7));
          
          mockTransactions.push({
            id: `pending_${i}_${Math.random().toString(36).substr(2, 9)}`,
            writerId: authUser?.id || '',
            resumeRequestId: `request_${Math.random().toString(36).substr(2, 9)}`,
            type: 'CREDIT',
            amount,
            status: 'PENDING',
            description: 'Payment for completed resume (pending)',
            createdAt: date.toISOString(),
          });
        }
        
        // Add some withdrawals
        for (let i = 0; i < 2; i++) {
          const amount = Math.floor(Math.random() * 500) + 500;
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
          
          mockTransactions.push({
            id: `withdrawal_${i}_${Math.random().toString(36).substr(2, 9)}`,
            writerId: authUser?.id || '',
            type: 'WITHDRAWAL',
            amount,
            status: 'COMPLETED',
            description: 'Withdrawal to bank account',
            createdAt: date.toISOString(),
            processedAt: date.toISOString(),
          });
        }
        
        // Sort transactions by date
        mockTransactions.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setTransactions(mockTransactions);
        
        // Calculate balances
        const totalEarned = mockTransactions
          .filter(t => t.type === 'CREDIT' && t.status === 'COMPLETED')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const totalWithdrawn = mockTransactions
          .filter(t => t.type === 'WITHDRAWAL' && t.status === 'COMPLETED')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const pending = mockTransactions
          .filter(t => t.type === 'CREDIT' && t.status === 'PENDING')
          .reduce((sum, t) => sum + t.amount, 0);
        
        setBalance(totalEarned - totalWithdrawn);
        setPendingBalance(pending);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast.error('Failed to load wallet data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWalletData();
  }, [authUser?.id]);
  
  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (amount > balance) {
      toast.error('Insufficient balance');
      return;
    }
    
    setIsWithdrawing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add withdrawal transaction
      const newWithdrawal: Transaction = {
        id: `withdrawal_${Math.random().toString(36).substr(2, 9)}`,
        writerId: authUser?.id || '',
        type: 'WITHDRAWAL',
        amount,
        status: 'COMPLETED',
        description: 'Withdrawal to bank account',
        createdAt: new Date().toISOString(),
        processedAt: new Date().toISOString(),
      };
      
      setTransactions([newWithdrawal, ...transactions]);
      setBalance(balance - amount);
      setWithdrawAmount('');
      setShowWithdrawModal(false);
      
      toast.success('Withdrawal successful');
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      toast.error('Failed to process withdrawal');
    } finally {
      setIsWithdrawing(false);
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
          <p className="text-neutral-600">Loading wallet data...</p>
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
            <h1 className="text-2xl font-bold text-neutral-900">My Wallet</h1>
            <p className="text-neutral-600">Manage your earnings and withdrawals</p>
          </div>
          
          <button
            onClick={() => setShowWithdrawModal(true)}
            disabled={balance <= 0}
            className={`btn ${
              balance > 0 ? 'btn-secondary' : 'btn-outline opacity-50 cursor-not-allowed'
            }`}
          >
            <BanknotesIcon className="h-5 w-5 mr-2" />
            Withdraw Funds
          </button>
        </div>
      </motion.div>
      
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="card bg-gradient-to-br from-secondary-50 to-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500 text-sm">Available Balance</p>
              <h3 className="text-2xl font-bold text-neutral-800">₹{balance}</h3>
            </div>
            <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600">
              <BanknotesIcon className="h-6 w-6" />
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
              <p className="text-neutral-500 text-sm">Pending Balance</p>
              <h3 className="text-2xl font-bold text-neutral-800">₹{pendingBalance}</h3>
              <p className="text-xs text-neutral-500">Available in 15 days</p>
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
              <p className="text-neutral-500 text-sm">Total Earned</p>
              <h3 className="text-2xl font-bold text-neutral-800">
                ₹{transactions
                    .filter(t => t.type === 'CREDIT' && t.status === 'COMPLETED')
                    .reduce((sum, t) => sum + t.amount, 0)}
              </h3>
            </div>
            <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center text-success-600">
              <ArrowTrendingUpIcon className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Transactions */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-lg font-bold text-neutral-900 mb-6">Transaction History</h2>
        
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <BanknotesIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No transactions yet</h3>
            <p className="text-neutral-500">Complete resume requests to start earning</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between bg-neutral-50 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                    transaction.type === 'CREDIT'
                      ? transaction.status === 'COMPLETED'
                        ? 'bg-success-100 text-success-600'
                        : 'bg-warning-100 text-warning-600'
                      : 'bg-accent-100 text-accent-600'
                  }`}>
                    {transaction.type === 'CREDIT' ? (
                      transaction.status === 'COMPLETED' ? (
                        <CheckCircleIcon className="h-5 w-5" />
                      ) : (
                        <ClockIcon className="h-5 w-5" />
                      )
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
      
      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Withdraw Funds</h3>
            
            <div className="mb-6">
              <label htmlFor="amount" className="form-label">Amount to Withdraw</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
                <input
                  type="number"
                  id="amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="form-input pl-8"
                  placeholder="Enter amount"
                  min="0"
                  max={balance}
                />
              </div>
              <p className="text-sm text-neutral-500 mt-1">
                Available balance: ₹{balance}
              </p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowWithdrawModal(false)}
                className="btn btn-outline"
                disabled={isWithdrawing}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleWithdraw}
                disabled={isWithdrawing || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance}
                className="btn btn-secondary"
              >
                {isWithdrawing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Withdraw'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
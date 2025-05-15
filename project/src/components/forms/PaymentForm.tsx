import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { CategoryInfo } from '../../types';

interface PaymentFormProps {
  categoryInfo: CategoryInfo;
}

const PaymentForm = ({ categoryInfo }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
    setCardNumber(formatted);
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    setCardExpiry(value);
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardCvv(value);
  };
  
  const handleUpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpiId(e.target.value);
  };
  
  const isCardFormValid = () => {
    return cardNumber.replace(/\s/g, '').length === 16 && 
           cardName.length > 0 && 
           cardExpiry.length === 5 && 
           cardCvv.length === 3;
  };
  
  const isUpiFormValid = () => {
    return upiId.includes('@') && upiId.length > 3;
  };
  
  const isFormValid = () => {
    return paymentMethod === 'card' ? isCardFormValid() : isUpiFormValid();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsPaymentComplete(true);
      }, 2000);
    }
  };

  if (isPaymentComplete) {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-20 w-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="h-12 w-12 text-success-600" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">Payment Successful!</h3>
        <p className="text-neutral-600 mb-6">
          Your payment of ₹{categoryInfo.price} has been successfully processed.
        </p>
        <div className="bg-neutral-50 rounded-lg p-4 max-w-md mx-auto text-left mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Amount Paid:</span>
            <span className="font-semibold">₹{categoryInfo.price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Payment Method:</span>
            <span className="font-semibold">
              {paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Transaction ID:</span>
            <span className="font-semibold">
              TXN{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </span>
          </div>
        </div>
        <p className="text-neutral-500 text-sm">
          A confirmation email with the receipt has been sent to your email address.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">Order Summary</h3>
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex justify-between mb-2 pb-2 border-b border-neutral-200">
            <span>{categoryInfo.name} Resume</span>
            <span>₹{categoryInfo.price}</span>
          </div>
          <div className="flex justify-between font-medium text-lg pt-2">
            <span>Total</span>
            <span className="text-primary-700">₹{categoryInfo.price}</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Payment Method</h3>
      
      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          className={`flex-1 flex flex-col items-center justify-center p-4 rounded-lg border ${
            paymentMethod === 'card'
              ? 'border-primary-600 bg-primary-50'
              : 'border-neutral-300 bg-white hover:bg-neutral-50'
          }`}
          onClick={() => setPaymentMethod('card')}
        >
          <CreditCardIcon className={`h-6 w-6 mb-2 ${
            paymentMethod === 'card' ? 'text-primary-600' : 'text-neutral-500'
          }`} />
          <span className={`font-medium ${
            paymentMethod === 'card' ? 'text-primary-700' : 'text-neutral-700'
          }`}>
            Card Payment
          </span>
        </button>
        
        <button
          type="button"
          className={`flex-1 flex flex-col items-center justify-center p-4 rounded-lg border ${
            paymentMethod === 'upi'
              ? 'border-primary-600 bg-primary-50'
              : 'border-neutral-300 bg-white hover:bg-neutral-50'
          }`}
          onClick={() => setPaymentMethod('upi')}
        >
          <BanknotesIcon className={`h-6 w-6 mb-2 ${
            paymentMethod === 'upi' ? 'text-primary-600' : 'text-neutral-500'
          }`} />
          <span className={`font-medium ${
            paymentMethod === 'upi' ? 'text-primary-700' : 'text-neutral-700'
          }`}>
            UPI Payment
          </span>
        </button>
      </div>
      
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        {paymentMethod === 'card' ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="card-number" className="form-label">
                  Card Number
                </label>
                <input
                  id="card-number"
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="card-name" className="form-label">
                  Cardholder Name
                </label>
                <input
                  id="card-name"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="card-expiry" className="form-label">
                    Expiry Date
                  </label>
                  <input
                    id="card-expiry"
                    type="text"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    className="form-input"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="card-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    id="card-cvv"
                    type="text"
                    value={cardCvv}
                    onChange={handleCvvChange}
                    className="form-input"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isCardFormValid() || isProcessing}
                  className={`btn w-full py-3 ${
                    isCardFormValid() && !isProcessing
                      ? 'btn-primary'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ₹${categoryInfo.price}`
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="upi-id" className="form-label">
                  UPI ID
                </label>
                <input
                  id="upi-id"
                  type="text"
                  value={upiId}
                  onChange={handleUpiChange}
                  className="form-input"
                  placeholder="yourname@upi"
                  required
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Enter your UPI ID (e.g., name@paytm, mobilenumber@ybl)
                </p>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isUpiFormValid() || isProcessing}
                  className={`btn w-full py-3 ${
                    isUpiFormValid() && !isProcessing
                      ? 'btn-primary'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ₹${categoryInfo.price}`
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
        
        <div className="mt-4 text-center">
          <p className="text-xs text-neutral-500">
            By completing this payment, you agree to our <a href="#" className="text-primary-600 hover:text-primary-800">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-800">Privacy Policy</a>.
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.5 7.5H7.5C5.56875 7.5 4.00625 9.06875 4.00625 11L4 29C4 30.9312 5.56875 32.5 7.5 32.5H32.5C34.4312 32.5 36 30.9312 36 29V11C36 9.06875 34.4312 7.5 32.5 7.5Z" fill="#E6E6E6" stroke="#737373" strokeWidth="2"/>
            <path d="M4 15.8334H36" stroke="#737373" strokeWidth="2"/>
          </svg>
          <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0001 36.6667C29.2049 36.6667 36.6667 29.2048 36.6667 20C36.6667 10.7953 29.2049 3.33337 20.0001 3.33337C10.7953 3.33337 3.33342 10.7953 3.33342 20C3.33342 29.2048 10.7953 36.6667 20.0001 36.6667Z" fill="#E6E6E6" stroke="#737373" strokeWidth="2"/>
            <path d="M15 20C15 17.2386 17.2386 15 20 15C22.7614 15 25 17.2386 25 20C25 22.7614 22.7614 25 20 25C17.2386 25 15 22.7614 15 20Z" fill="#737373"/>
            <path d="M30 15C30 17.7614 27.7614 20 25 20C22.2386 20 20 17.7614 20 15C20 12.2386 22.2386 10 25 10C27.7614 10 30 12.2386 30 15Z" fill="#737373"/>
            <path d="M20 25C20 22.2386 17.7614 20 15 20C12.2386 20 10 22.2386 10 25C10 27.7614 12.2386 30 15 30C17.7614 30 20 27.7614 20 25Z" fill="#737373"/>
          </svg>
          <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.8182 4H8.18182C5.87727 4 4 5.87727 4 8.18182V31.8182C4 34.1227 5.87727 36 8.18182 36H31.8182C34.1227 36 36 34.1227 36 31.8182V8.18182C36 5.87727 34.1227 4 31.8182 4Z" fill="#E6E6E6" stroke="#737373" strokeWidth="2"/>
            <path d="M17.8182 10.9091H9.09091V19.6364H17.8182V10.9091Z" fill="#737373"/>
            <path d="M30.9091 10.9091H22.1818V19.6364H30.9091V10.9091Z" fill="#737373"/>
            <path d="M17.8182 20.3636H9.09091V29.0909H17.8182V20.3636Z" fill="#737373"/>
            <path d="M30.9091 20.3636H22.1818V29.0909H30.9091V20.3636Z" fill="#737373"/>
          </svg>
          <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 13.3333H5.00004C4.08337 13.3333 3.33337 14.0833 3.33337 15V31.6667C3.33337 32.5833 4.08337 33.3333 5.00004 33.3333H35C35.9167 33.3333 36.6667 32.5833 36.6667 31.6667V15C36.6667 14.0833 35.9167 13.3333 35 13.3333Z" fill="#E6E6E6" stroke="#737373" strokeWidth="2"/>
            <path d="M36.6667 20H3.33337" stroke="#737373" strokeWidth="2"/>
            <path d="M12.5 6.66663L20 13.3333L27.5 6.66663" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
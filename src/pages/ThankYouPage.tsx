import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useBasketContext } from '../hooks/useBasketContext';

const ThankYouPage: React.FC = () => {
  const { clearBasket } = useBasketContext();
  
  useEffect(() => {
    // Clear the basket when this page is reached
    clearBasket();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [clearBasket]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <SEO 
        title="Thank You for Your Order | Smartblinds Croatia"
        description="Your order has been successfully submitted."
      />
      
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We have received your order and will process it shortly. 
          You should receive a confirmation email soon.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
          
          <Link 
            to="/products"
            className="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage; 
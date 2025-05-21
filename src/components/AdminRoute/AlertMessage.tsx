import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AlertMessageProps {
  type: 'success' | 'error';
  message: string | null;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  if (!message) return null;

  const isSuccess = type === 'success';
  
  const styles = {
    container: isSuccess 
      ? "bg-green-100 border-l-4 border-green-500 text-green-700" 
      : "bg-red-100 border-l-4 border-red-500 text-red-700",
    icon: isSuccess 
      ? "h-5 w-5 text-green-500" 
      : "h-5 w-5 text-red-500",
  };

  return (
    <div className={`${styles.container} p-4 mb-6 rounded`} role="alert">
      <div className="flex">
        {isSuccess ? (
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <AlertCircle className={styles.icon} />
        )}
        <span className="ml-3">{message}</span>
      </div>
    </div>
  );
};

export default AlertMessage; 
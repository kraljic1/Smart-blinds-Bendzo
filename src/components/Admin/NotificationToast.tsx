import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface NotificationToastProps {
 type: 'success' | 'error';
 message: string;
 isVisible: boolean;
 onClose: () => void;
 autoClose?: boolean;
 duration?: number;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
 type,
 message,
 isVisible,
 onClose,
 autoClose = true,
 duration = 5000
}) => {
 useEffect(() => {
 if (isVisible && autoClose) {
 const timer = setTimeout(() => {
 onClose();
 }, duration);

 return () => clearTimeout(timer);
 }
 }, [isVisible, autoClose, duration, onClose]);

 if (!isVisible) return null;

 const isSuccess = type === 'success';
 
 return (
 <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
 <div className={`rounded-lg shadow-lg p-4 ${
 isSuccess 
 ? 'bg-green-50 border border-green-200 dark:bg-green-900 ' 
 : 'bg-red-50 border border-red-200 dark:bg-red-900 '
 }`}>
 <div className="flex items-start">
 <div className="flex-shrink-0">
 {isSuccess ? (
 <CheckCircle className="h-5 w-5 text-green-400"/>
 ) : (
 <XCircle className="h-5 w-5 text-red-400"/>
 )}
 </div>
 <div className="ml-3 flex-1">
 <p className={`text-sm font-medium ${
 isSuccess 
 ? 'text-green-800 ' 
 : 'text-red-800 '
 }`}>
 {message}
 </p>
 </div>
 <div className="ml-4 flex-shrink-0">
 <button
 onClick={onClose}
 className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
 isSuccess
 ? 'text-green-500 hover:bg-green-100 focus:ring-green-600 dark:hover:bg-green-800'
 : 'text-red-500 hover:bg-red-100 focus:ring-red-600 dark:hover:bg-red-800'
 }`}
 >
 <X className="h-4 w-4"/>
 </button>
 </div>
 </div>
 </div>
 </div>
 );
};

export default NotificationToast; 
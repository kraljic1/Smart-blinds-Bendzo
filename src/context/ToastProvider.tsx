import { useState, useCallback, ReactNode } from 'react';
import { ToastContainer, ToastData } from '../components/Notification/ToastContainer';
import { ToastType } from '../components/Notification/Toast';
import { ToastContext } from './ToastContext';

interface ToastProviderProps {
 children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
 const [toasts, setToasts] = useState<ToastData[]>([]);

 const showToast = useCallback((message: string, type: ToastType = 'info', title?: string, duration: number = 5000) => {
 const id = Date.now().toString();
 setToasts((prevToasts) => [...prevToasts, { id, message, type, title, duration }]);
 return id;
 }, []);

 const hideToast = useCallback((id: string) => {
 setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
 }, []);

 return (
 <ToastContext.Provider value={{ showToast, hideToast }}>
 {children}
 <ToastContainer toasts={toasts} removeToast={hideToast} />
 </ToastContext.Provider>
 );
}; 
import { createContext } from 'react';
import { ToastType } from '../components/Notification/Toast';

export interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  hideToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined); 
import React, { useEffect, useState, useRef } from 'react';


export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
 id: string;
 title?: string;
 message: string;
 type: ToastType;
 duration?: number;
 onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
 id,
 title,
 message,
 type = 'info',
 duration = 5000,
 onClose
}) => {
 const [isExiting, setIsExiting] = useState(false);
 const progressRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 let currentProgress = 100;
 
 const interval = setInterval(() => {
 currentProgress = currentProgress - (100 / (duration / 100));
 const finalProgress = currentProgress > 0 ? currentProgress : 0;
 
 // Update CSS custom property instead of inline style
 if (progressRef.current) {
 progressRef.current.style.setProperty('--progress-width', `${finalProgress}%`);
 }
 }, 100);

 const timer = setTimeout(() => {
 setIsExiting(true);
 setTimeout(() => onClose(id), 300); // Match animation duration
 }, duration);

 return () => {
 clearInterval(interval);
 clearTimeout(timer);
 };
 }, [duration, id, onClose]);

 const handleClose = () => {
 setIsExiting(true);
 setTimeout(() => onClose(id), 300); // Match animation duration
 };

 const renderIcon = () => {
 switch (type) {
 case 'success':
 return (
 <svg className="w-5 h-5 text-green-500"fill="none"viewBox="0 0 24 24"stroke="currentColor">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 );
 case 'error':
 return (
 <svg className="w-5 h-5 text-red-500"fill="none"viewBox="0 0 24 24"stroke="currentColor">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 );
 case 'info':
 default:
 return (
 <svg className="w-5 h-5 text-blue-500"fill="none"viewBox="0 0 24 24"stroke="currentColor">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 );
 }
 };

 return (
 <div className={`toast toast-${type} ${isExiting ? 'toast-exit' : ''}`}>
 <div className="toast-icon">{renderIcon()}</div>
 <div className="toast-content">
 {title && <h3 className="toast-title">{title}</h3>}
 <p className="toast-message">{message}</p>
 </div>
 <button className="toast-close"onClick={handleClose} aria-label="Close notification">
 ×
 </button>
 <div ref={progressRef} className="toast-progress"/>
 </div>
 );
}; 
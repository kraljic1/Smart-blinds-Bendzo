import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, ChevronLeft } from 'lucide-react';

interface LoadingStateProps {
 message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Učitavanje detalja narudžbe...' }) => {
 return (
 <div className="min-h-screen flex justify-center items-center bg-gray-50 ">
 <div className="text-center">
 <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4"/>
 <p className="text-gray-600">{message}</p>
 </div>
 </div>
 );
};

interface ErrorStateProps {
 error: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
 const navigate = useNavigate();
 
 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
 <div className="w-full max-w-lg">
 <div className="bg-white shadow-xl rounded-lg overflow-hidden">
 <div className="p-6 border-b border-gray-200">
 <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4"/>
 <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Greška</h1>
 <p className="text-center text-gray-600">{error}</p>
 </div>
 <div className="p-6 bg-gray-50 flex justify-center">
 <button 
 onClick={() => navigate('/admin/orders')}
 className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
 >
 <ChevronLeft className="h-4 w-4 mr-2"/>
 Povratak na Narudžbe
 </button>
 </div>
 </div>
 </div>
 </div>
 );
}; 
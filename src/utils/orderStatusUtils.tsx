import React from 'react';
import { Calendar, Package, Truck, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Format date for display
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('hr-HR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get status icon based on order status
export const getStatusIcon = (status: string) => {
  switch(status) {
    case 'received':
      return <Calendar className="w-5 h-5 text-blue-500" />;
    case 'processing':
      return <Package className="w-5 h-5 text-yellow-500" />;
    case 'shipped':
      return <Truck className="w-5 h-5 text-green-500" />;
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    case 'cancelled':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

// Get CSS classes for status styling
export const getStatusStyle = (status: string) => {
  switch(status) {
    case 'received':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'shipped':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'completed':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}; 
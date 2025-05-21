import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface CustomerInfoProps {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ name, email, phone, address }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Customer Information</h2>
        </div>
      </div>
      
      <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-5">
        <div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300">
              <User className="w-4 h-4" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</p>
              <p className="text-sm text-gray-900 dark:text-white font-medium">{name}</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300">
              <Mail className="w-4 h-4" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
              <p className="text-sm text-gray-900 dark:text-white font-medium">{email}</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300">
              <Phone className="w-4 h-4" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</p>
              <p className="text-sm text-gray-900 dark:text-white font-medium">{phone}</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</p>
              <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line font-medium">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo; 
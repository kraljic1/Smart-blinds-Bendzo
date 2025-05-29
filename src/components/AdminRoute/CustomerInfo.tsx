import React from 'react';
import { User, Mail, Phone, MapPin, Truck } from 'lucide-react';

interface CustomerInfoProps {
  name: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress?: string;
  paymentMethod?: string;
  shippingMethod?: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ 
  name, 
  email, 
  phone, 
  billingAddress, 
  shippingAddress,
  paymentMethod,
  shippingMethod
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Informacije o Kupcu</h2>
        </div>
      </div>
      
      <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-5">
        <div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300">
              <User className="w-4 h-4" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Ime</p>
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
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</p>
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
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Adresa za Naplatu</p>
              <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line font-medium">{billingAddress}</p>
            </div>
          </div>
        </div>
        
        {shippingAddress && shippingAddress !== billingAddress && (
          <div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300 mt-0.5">
                <Truck className="w-4 h-4" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Adresa za Dostavu</p>
                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line font-medium">{shippingAddress}</p>
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod && (
          <div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Način Plaćanja</p>
                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line font-medium">{paymentMethod}</p>
              </div>
            </div>
          </div>
        )}
        
        {shippingMethod && (
          <div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Način Dostave</p>
                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line font-medium">{shippingMethod}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInfo; 
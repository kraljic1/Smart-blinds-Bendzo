import React from 'react';
import { User, Mail, Phone, MapPin, Truck, CreditCard, Building, FileText } from 'lucide-react';
import { ExtendedOrderData } from './types';

interface CustomerInformationProps {
  orderDetails: ExtendedOrderData;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({ orderDetails }) => {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Info */}
        <div>
          <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
            <User className="w-5 h-5 mr-2" />
            Podaci o kupcu
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            {/* Company Information - Show if available */}
            {orderDetails.companyName && (
              <>
                <p className="flex items-center">
                  <Building className="w-4 h-4 mr-2 text-gray-400" />
                  <strong>{orderDetails.companyName}</strong>
                </p>
                {orderDetails.companyOib && (
                  <p className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                    <span><strong>OIB:</strong> {orderDetails.companyOib}</span>
                  </p>
                )}
                <div className="border-t border-gray-200 dark:border-gray-600 my-2 pt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Kontakt osoba:</p>
                </div>
              </>
            )}
            
            <p className="flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-400" />
              <strong>{orderDetails.customerName}</strong>
            </p>
            <p className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              {orderDetails.email}
            </p>
            <p className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              {orderDetails.phone}
            </p>
            <p className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-400" />
              <span>{orderDetails.billingAddress}</span>
            </p>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div>
          <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
            <Truck className="w-5 h-5 mr-2" />
            Dostava i plaćanje
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p className="flex items-center">
              <Truck className="w-4 h-4 mr-2 text-gray-400" />
              <span><strong>Dostava:</strong> {orderDetails.shippingMethod}</span>
            </p>
            <p className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
              <span><strong>Plaćanje:</strong> {orderDetails.paymentMethod}</span>
            </p>
            <p className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-400" />
              <span><strong>Adresa dostave:</strong><br />{orderDetails.shippingAddress}</span>
            </p>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                orderDetails.paymentStatus === 'completed' ? 'bg-green-500' : 
                orderDetails.paymentStatus === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></div>
              <span><strong>Status plaćanja:</strong> {
                orderDetails.paymentStatus === 'completed' ? 'Završeno' :
                orderDetails.paymentStatus === 'pending' ? 'U tijeku' : 'Nepoznato'
              }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation; 
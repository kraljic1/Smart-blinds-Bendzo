import React from 'react';
import { OrderDetails } from '../../Checkout/utils/orderDetails';
import {
 CustomerInfoHeader,
 CompanyInfo,
 CustomerContactInfo,
 CustomerAddressInfo
} from './CustomerInfo';

interface CustomerInfoSectionProps {
 orderDetails: OrderDetails;
}

const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({ orderDetails }) => {
 return (
 <div>
 <CustomerInfoHeader />
 <div className="space-y-2 text-gray-600">
 <CompanyInfo company={orderDetails.company} />
 <CustomerContactInfo customer={orderDetails.customer} />
 <CustomerAddressInfo customer={orderDetails.customer} />
 </div>
 </div>
 );
};

export default CustomerInfoSection; 
import React from 'react';
import PrivacyPolicyHeader from '../components/PrivacyPolicy/PrivacyPolicyHeader';
import DataCollectionSection from '../components/PrivacyPolicy/DataCollectionSection';
import DataUsageSection from '../components/PrivacyPolicy/DataUsageSection';
import CookiesAndPaymentSection from '../components/PrivacyPolicy/CookiesAndPaymentSection';
import RightsAndContactSection from '../components/PrivacyPolicy/RightsAndContactSection';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="modern-page-container">
      <PrivacyPolicyHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none dark:prose-invert text-gray-800">
          <DataCollectionSection />
          <DataUsageSection />
          <CookiesAndPaymentSection />
          <RightsAndContactSection />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 
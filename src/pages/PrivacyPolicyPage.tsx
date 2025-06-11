import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';
import DataCollectionSection from '../components/PrivacyPolicy/DataCollectionSection';
import DataUsageSection from '../components/PrivacyPolicy/DataUsageSection';
import CookiesAndPaymentSection from '../components/PrivacyPolicy/CookiesAndPaymentSection';
import RightsAndContactSection from '../components/PrivacyPolicy/RightsAndContactSection';

const PrivacyPolicyPage: React.FC = () => {
 return (
 <div className="modern-page-container">
 <CroatianSEO
 title="Politika Privatnosti | Smartblinds"
 description="Politika privatnosti za Smartblinds - Saznajte kako upravljamo vašim podacima"
 keywords="politika privatnosti, privacy policy, zaštita podataka, smartblinds"
 pageType="info"
 />
 
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <h1 className="text-3xl font-bold text-gray-900 mb-8">Politika Privatnosti</h1>
 <p className="text-gray-600 mb-8">Zadnje ažurirano: {new Date().toLocaleDateString('hr-HR')}</p>
 
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
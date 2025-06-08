import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyHeader: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Politika Privatnosti | Smartblinds</title>
        <meta name="description" content="Politika privatnosti za Smartblinds - Saznajte kako upravljamo vašim podacima" />
      </Helmet>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Politika Privatnosti</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">Zadnje ažurirano: {new Date().toLocaleDateString('hr-HR')}</p>
    </>
  );
};

export default PrivacyPolicyHeader; 
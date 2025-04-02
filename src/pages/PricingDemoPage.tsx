import React from 'react';
import { Helmet } from 'react-helmet-async';
import PriceDemo from '../components/PriceDemo';

const PricingDemoPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pricing Calculator Demo | Bendzo Blinds</title>
        <meta name="description" content="Interactive price calculator for custom window treatments" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Pricing Calculator</h1>
        <p className="mb-8">
          Use our interactive price calculator to estimate the cost of your custom window treatments. 
          Simply select your product type and enter your measurements to get an instant price estimate.
        </p>
        
        <PriceDemo />
      </div>
    </>
  );
};

export default PricingDemoPage; 
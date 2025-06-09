import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';
import PriceDemo from '../components/Product/PriceDemo';

const PricingDemoPage: React.FC = () => {
  return (
    <>
      <CroatianSEO
        title="Cjenik | Smartblinds Croatia"
        description="Pogledajte naš cjenik za pametne rolete. Konkurentne cijene i kvalitetni proizvodi."
        keywords="cjenik, cijene, pametne rolete, smartblinds"
        pageType="info"
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Pricing Calculator Demo</h1>
        <PriceDemo />
      </div>
    </>
  );
};

export default PricingDemoPage; 
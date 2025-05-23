import React from 'react';
import CroatianSEO from '../components/CroatianSEO';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Reviews from '../components/Reviews';
import StructuredData from '../components/StructuredData';
import background1 from '../img/background-hero/background1.webp';
import background2 from '../img/background-hero/background2.webp';
import background3 from '../img/background-hero/background3.webp';
import background4 from '../img/background-hero/background4.webp';
import background5 from '../img/background-hero/background5.webp';

const HomePage: React.FC = () => {
  const heroImages = [
    background1,
    background2,
    background3,
    background4,
    background5
  ];

  // Website structured data for improved search results
  const websiteData = {
    name: 'Smartblinds Hrvatska',
    url: 'https://bendzosmartblinds.netlify.app',
    potentialAction: {
      target: 'https://bendzosmartblinds.netlify.app/search?q={search_term_string}'
    }
  };

  return (
    <>
      <CroatianSEO 
        title="Smartblinds Hrvatska - Pametne Rolete za Moderan Dom | Automatske Rolete Zagreb"
        description="Otkrijte najbolje pametne rolete u Hrvatskoj! Automatske rolete s daljinskim upravljanjem, smart home integracija, energetska efikasnost. Besplatna dostava po Zagrebu i Hrvatskoj. ⭐ Garancija 5 godina"
        keywords="pametne rolete, automatske rolete, smart home hrvatska, pametni dom, rolete na daljinski, električne rolete, motorizirane rolete"
        pageType="home"
        ogType="website"
        breadcrumbs={[
          { name: 'Početna', item: 'https://bendzosmartblinds.netlify.app/' }
        ]}
      />
      <StructuredData type="website" data={websiteData} />
      <Hero images={heroImages} autoChangeInterval={4500} />
      <Features />
      <Reviews />
    </>
  );
};

export default HomePage;
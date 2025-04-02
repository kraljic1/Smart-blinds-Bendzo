import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Reviews from '../components/Reviews';
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

  return (
    <>
      <SEO 
        title="BENDZO Smart Blinds | Intelligent Window Solutions"
        description="Automate your home with BENDZO Smart Blinds. Control light and privacy with voice commands, apps, or smart home systems."
      />
      <Hero images={heroImages} autoChangeInterval={4500} />
      <Features />
      <Reviews />
    </>
  );
};

export default HomePage;
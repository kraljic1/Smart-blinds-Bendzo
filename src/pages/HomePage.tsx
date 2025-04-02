import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductShowcase from '../components/ProductShowcase';
import Reviews from '../components/Reviews';

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Smartblinds | Smart Blinds for the Modern Home"
        description="Transform your windows into smart windows with our innovative smart blinds. Control your home's lighting, privacy, and energy efficiency with ease."
        keywords="smart blinds, automated blinds, smart home, window automation, energy efficiency"
        ogType="website"
        ogImage="/images/home-hero.jpg"
        ogUrl="https://smartblinds.com"
        canonicalUrl="https://smartblinds.com"
      />
      <Hero />
      <Features />
      <ProductShowcase />
      <Reviews />
    </>
  );
};

export default HomePage;
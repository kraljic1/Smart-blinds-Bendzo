import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductShowcase from '../components/ProductShowcase';
import Reviews from '../components/Reviews';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <ProductShowcase />
      <Reviews />
    </>
  );
};

export default HomePage;
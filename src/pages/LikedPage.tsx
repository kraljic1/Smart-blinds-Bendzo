import React from 'react';
import { LikedItemsGrid } from '../components/Liked/LikedItemsGrid';
import SEO from '../components/SEO/SEO';
import Breadcrumb from '../components/Navigation/Breadcrumb';

const LikedPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Moji omiljeni | Smartblinds"
        description="Pregledajte i upravljajte svojim omiljenim proizvodima."
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Početna', path: '/' },
            { label: 'Moji omiljeni', path: '/liked' }
          ]}
        />
        <div className="pt-16 pb-16">
          <LikedItemsGrid />
        </div>
      </div>
    </>
  );
};

export default LikedPage; 
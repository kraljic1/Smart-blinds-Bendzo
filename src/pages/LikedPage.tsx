import React from 'react';
import { LikedItemsGrid } from '../components/Liked/LikedItemsGrid';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const LikedPage: React.FC = () => {
  return (
    <>
      <SEO
        title="My Favorites | Smartblinds"
        description="View and manage your favorite products."
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'My Favorites', path: '/liked' }
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
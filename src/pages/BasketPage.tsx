import React from 'react';
import { Basket } from '../components/Basket/Basket';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

export default function BasketPage() {
  return (
    <>
      <SEO 
        title="Shopping Basket | BENDZO" 
        description="View and manage your shopping basket."
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Basket', path: '/basket' }
          ]}
        />
        <Basket />
      </div>
    </>
  );
} 
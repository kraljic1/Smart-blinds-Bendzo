import React from 'react';
import { CheckoutForm } from '../components/Checkout/CheckoutForm';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { useBasketContext } from '../hooks/useBasketContext';
import { Navigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { items } = useBasketContext();
  
  // Redirect if basket is empty
  if (items.length === 0) {
    return <Navigate to="/basket" />;
  }
  
  return (
    <>
      <SEO 
        title="Narudžba | Smartblinds Croatia"
        description="Dovršite vašu narudžbu unosom podataka za dostavu i kontakt."
      />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Početna', path: '/' },
              { label: 'Košarica', path: '/basket' },
              { label: 'Narudžba', path: '/checkout' }
            ]}
          />
        </div>
        <CheckoutForm />
      </div>
    </>
  );
} 
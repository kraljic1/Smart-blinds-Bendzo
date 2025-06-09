import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedCheckoutForm } from '../components/Checkout/EnhancedCheckoutForm';
import SEO from '../components/SEO/SEO';
import Breadcrumb from '../components/Navigation/Breadcrumb';
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
      <Helmet>
        <SEO 
          title="Narudžba | Smartblinds Croatia"
          description="Dovršite vašu narudžbu unosom podataka za dostavu i kontakt."
        />
      </Helmet>
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
        <EnhancedCheckoutForm />
      </div>
    </>
  );
} 
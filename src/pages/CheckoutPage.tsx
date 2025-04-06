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
        title="Checkout | Smartblinds Croatia"
        description="Complete your order by providing shipping and contact information."
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Basket', path: '/basket' },
            { label: 'Checkout', path: '/checkout' }
          ]}
        />
        <CheckoutForm />
      </div>
    </>
  );
} 
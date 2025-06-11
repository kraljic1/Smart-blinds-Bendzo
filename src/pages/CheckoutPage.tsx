import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';
import { EnhancedCheckoutForm } from '../components/Checkout/EnhancedCheckoutForm';
import { useBasketContext } from '../hooks/useBasketContext';
import { Navigate } from 'react-router-dom';
import Breadcrumb from '../components/Navigation/Breadcrumb';

export default function CheckoutPage() {
 const { items } = useBasketContext();
 
 // Redirect if basket is empty
 if (items.length === 0) {
 return <Navigate to="/basket"/>;
 }
 
 return (
 <>
 <CroatianSEO
 title="Naplata | Smartblinds Croatia"
 description="Sigurna naplata za vaše pametne rolete. Brza dostava po cijeloj Hrvatskoj."
 keywords="naplata, sigurna kupovina, pametne rolete, dostava hrvatska"
 pageType="info"
 />
 <div className="container mx-auto px-4 pt-24 pb-8">
 <div className="mb-6">
 <Breadcrumb
 items={[
 { label: 'Početna', path: '/' },
 { label: 'Košarica', path: '/basket' },
 { label: 'Naplata', path: '/checkout' }
 ]}
 />
 </div>
 <EnhancedCheckoutForm />
 </div>
 </>
 );
} 
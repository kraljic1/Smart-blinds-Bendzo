import React from 'react';
import { EnhancedCheckoutForm } from '../components/Checkout/EnhancedCheckoutForm';
import SEO from '../components/SEO/SEO';
import Breadcrumb from '../components/Navigation/Breadcrumb';

export default function CheckoutPage() {
 return (
 <>
 <SEO
 title="Naplata | Smartblinds"
 description="Završite svoju narudžbu sigurno i brzo."
 />
 <div 
 className="min-h-screen"
 style={{
 background: 'linear-gradient(to bottom right, white, rgb(239 246 255), rgb(238 242 255))'
 }}
 >
 <div className="container mx-auto px-4 py-8">
 <Breadcrumb
 items={[
 { label: 'Početna', path: '/' },
 { label: 'Košarica', path: '/basket' },
 { label: 'Naplata', path: '/checkout' }
 ]}
 />
 <div className="pt-16 pb-16">
 <EnhancedCheckoutForm />
 </div>
 </div>
 </div>
 </>
 );
} 
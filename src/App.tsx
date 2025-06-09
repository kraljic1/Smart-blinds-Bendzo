import React, { Suspense, useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from './context/ToastProvider';
import { BasketProvider } from './context/BasketContext';
import { LikedProvider } from './context/LikedContext';
import { OrderProvider } from './context/OrderContext';
import TouchFriendly from './components/UI/TouchFriendly';
import Layout from './components/Layout/Layout';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './utils/ScrollToTop';
import SEOAnalyzer from './components/SEO/SEOAnalyzer';
import AdminRoute from './components/AdminRoute/AdminRoute';
import { preventOverscroll } from './utils/preventOverscroll';

// Import React warning handler for development
import './utils/reactWarningHandler';

// Simple loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const RollerBlindsPage = lazy(() => import('./pages/RollerBlindsPage'));
const ZebraBlindsPage = lazy(() => import('./pages/ZebraBlindsPage'));
const CurtainTracksPage = lazy(() => import('./pages/CurtainTracksPage'));
const AccessoriesPage = lazy(() => import('./pages/AccessoriesPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const InstallationGuidePage = lazy(() => import('./pages/InstallationGuidePage'));
const ConnectivityGuidePage = lazy(() => import('./pages/ConnectivityGuidePage'));
const SmartControlGuidePage = lazy(() => import('./pages/SmartControlGuidePage'));
const ProductConfigurationPage = lazy(() => import('./pages/ProductConfigurationPage'));
const PricingDemoPage = lazy(() => import('./pages/PricingDemoPage'));
const BasketPage = lazy(() => import('./pages/BasketPage'));
const LikedPage = lazy(() => import('./pages/LikedPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminOrdersPage = lazy(() => import('./pages/AdminOrdersPage'));
const AdminOrderDetailPage = lazy(() => import('./pages/AdminOrderDetailPage'));
const ProductOptionDemoPage = lazy(() => import('./pages/ProductOptionDemoPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'));
const AdminManagementPage = lazy(() => import('./pages/AdminManagementPage'));
const TestPayment = lazy(() => import('./pages/TestPayment').then(module => ({ default: module.TestPayment })));

function App() {
  console.log('🚀 App component rendered');
  
  // Initialize overscroll prevention
  useEffect(() => {
    console.log('🔧 App useEffect running');
    preventOverscroll();
  }, []);

  return (
    <TouchFriendly>
      <HelmetProvider>
        <ToastProvider>
            <BasketProvider>
              <LikedProvider>
                <OrderProvider>
                  <ScrollToTop />
                  <Layout>
                  <Header />
                  <main className="flex-grow overflow-x-hidden bg-white dark:bg-[#0c1222]">
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/roller-blinds" element={<RollerBlindsPage />} />
                        <Route path="/products/zebra-blinds" element={<ZebraBlindsPage />} />
                        <Route path="/products/curtain-blinds" element={<CurtainTracksPage />} />
                        <Route path="/products/accessories" element={<AccessoriesPage />} />
                        <Route path="/products/configure/:productId" element={<ProductConfigurationPage />} />
                        <Route path="/pricing-demo" element={<PricingDemoPage />} />
                        <Route path="/product-options-demo" element={<ProductOptionDemoPage />} />
                        <Route path="/how-it-works" element={<HowItWorksPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/installation-guide" element={<InstallationGuidePage />} />
                        <Route path="/connectivity-guide" element={<ConnectivityGuidePage />} />
                        <Route path="/smart-control-guide" element={<SmartControlGuidePage />} />
                        <Route path="/basket" element={<BasketPage />} />
                        <Route path="/liked" element={<LikedPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/thank-you" element={<ThankYouPage />} />
                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route 
                          path="/admin/orders" 
                          element={
                            <AdminRoute>
                              <AdminOrdersPage />
                            </AdminRoute>
                          } 
                        />
                        <Route 
                          path="/admin/orders/:orderId" 
                          element={
                            <AdminRoute>
                              <AdminOrderDetailPage />
                            </AdminRoute>
                          } 
                        />
                        <Route 
                          path="/admin/management" 
                          element={
                            <AdminRoute>
                              <AdminManagementPage />
                            </AdminRoute>
                          } 
                        />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                        <Route path="/accessibility" element={<AccessibilityPage />} />
                        <Route path="/test-payment" element={<TestPayment />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                  {/* SEO Analyzer will only show in development mode */}
                  <SEOAnalyzer />
                </Layout>
                            </OrderProvider>
          </LikedProvider>
        </BasketProvider>
      </ToastProvider>
    </HelmetProvider>
    </TouchFriendly>
  );
}

export default App;
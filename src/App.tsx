import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeProvider';
import { BasketProvider } from './context/BasketContext';
import { LikedProvider } from './context/LikedContext';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import TouchFriendly from './components/TouchFriendly';
import SEOAnalyzer from './components/SEOAnalyzer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import RollerBlindsPage from './pages/RollerBlindsPage';
import ZebraBlindsPage from './pages/ZebraBlindsPage';
import CurtainTracksPage from './pages/CurtainTracksPage';
import AccessoriesPage from './pages/AccessoriesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SupportPage from './pages/SupportPage';
import InstallationGuidePage from './pages/InstallationGuidePage';
import ConnectivityGuidePage from './pages/ConnectivityGuidePage';
import SmartControlGuidePage from './pages/SmartControlGuidePage';
import ProductConfigurationPage from './pages/ProductConfigurationPage';
import PricingDemoPage from './pages/PricingDemoPage';
import BasketPage from './pages/BasketPage';
import LikedPage from './pages/LikedPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import ProductOptionDemoPage from './pages/ProductOptionDemoPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AccessibilityPage from './pages/AccessibilityPage';
import { preventOverscroll } from './utils/preventOverscroll';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  // Initialize overscroll prevention
  useEffect(() => {
    preventOverscroll();
  }, []);

  return (
    <TouchFriendly>
      <HelmetProvider>
        <ThemeProvider>
          <BasketProvider>
            <LikedProvider>
              <ScrollToTop />
              <Layout>
                <Header />
                <main className="flex-grow overflow-x-hidden bg-white dark:bg-[#0c1222]">
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
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                    <Route path="/accessibility" element={<AccessibilityPage />} />
                  </Routes>
                </main>
                <Footer />
                {/* SEO Analyzer will only show in development mode */}
                <SEOAnalyzer />
              </Layout>
            </LikedProvider>
          </BasketProvider>
        </ThemeProvider>
      </HelmetProvider>
    </TouchFriendly>
  );
}

export default App;
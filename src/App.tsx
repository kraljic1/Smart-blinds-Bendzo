import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeProvider';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import RollerBlindsPage from './pages/RollerBlindsPage';
import DayNightBlindsPage from './pages/DayNightBlindsPage';
import CurtainTracksPage from './pages/CurtainTracksPage';
import AccessoriesPage from './pages/AccessoriesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SupportPage from './pages/SupportPage';
import InstallationGuidePage from './pages/InstallationGuidePage';
import ConnectivityGuidePage from './pages/ConnectivityGuidePage';
import SmartControlGuidePage from './pages/SmartControlGuidePage';
import ProductConfigurationPage from './pages/ProductConfigurationPage';
import PricingDemoPage from './pages/PricingDemoPage';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/roller-blinds" element={<RollerBlindsPage />} />
                <Route path="/products/zebra-blinds" element={<DayNightBlindsPage />} />
                <Route path="/products/curtain-blinds" element={<CurtainTracksPage />} />
                <Route path="/products/accessories" element={<AccessoriesPage />} />
                <Route path="/products/configure/:productId" element={<ProductConfigurationPage />} />
                <Route path="/pricing-demo" element={<PricingDemoPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/installation-guide" element={<InstallationGuidePage />} />
                <Route path="/connectivity-guide" element={<ConnectivityGuidePage />} />
                <Route path="/smart-control-guide" element={<SmartControlGuidePage />} />
              </Routes>
            </main>
            <Footer />
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
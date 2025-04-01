import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import RollerBlindsPage from './pages/RollerBlindsPage';
import DayNightBlindsPage from './pages/DayNightBlindsPage';
import HoneycombBlindsPage from './pages/HoneycombBlindsPage';
import CurtainTracksPage from './pages/CurtainTracksPage';
import AccessoriesPage from './pages/AccessoriesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SupportPage from './pages/SupportPage';
import InstallationGuidePage from './pages/InstallationGuidePage';
import ConnectivityGuidePage from './pages/ConnectivityGuidePage';
import SmartControlGuidePage from './pages/SmartControlGuidePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/roller-blinds" element={<RollerBlindsPage />} />
            <Route path="/products/day-night-blinds" element={<DayNightBlindsPage />} />
            <Route path="/products/honeycomb-blinds" element={<HoneycombBlindsPage />} />
            <Route path="/products/curtain-tracks" element={<CurtainTracksPage />} />
            <Route path="/products/accessories" element={<AccessoriesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/installation-guide" element={<InstallationGuidePage />} />
            <Route path="/connectivity-guide" element={<ConnectivityGuidePage />} />
            <Route path="/smart-control-guide" element={<SmartControlGuidePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
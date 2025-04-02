import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Reviews from '../components/Reviews';

const HomePage = () => {
  return (
    <>
      <SEO 
        title="BENDZO Smart Blinds | Intelligent Window Solutions"
        description="Automate your home with BENDZO Smart Blinds. Control light and privacy with voice commands, apps, or smart home systems."
      />
      <Hero />
      <Features />
      <Reviews />
    </>
  );
};

export default HomePage;
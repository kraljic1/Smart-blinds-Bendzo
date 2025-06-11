import React from 'react';
import { Settings, Wifi, Smartphone } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import AnimatedHeader from '../components/Features/AnimatedHeader';
import InfoCard from '../components/Features/InfoCard';
import FeaturesGrid from '../components/Features/FeaturesGrid';
import InfoSection from '../components/Features/InfoSection';

const HowItWorksPage: React.FC = () => {
 const { scrollY, sectionsRef, headerRef } = useScrollAnimation();

 return (
 <div className="pt-24 pb-32 bg-white overflow-hidden">
 {/* Background elements */}
 <div className="absolute inset-0 pointer-events-none overflow-hidden">
 <div className="absolute -left-32 top-32 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
 <div className="absolute right-0 top-[60%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
 </div>

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
 {/* Header section */}
 <AnimatedHeader headerRef={headerRef} />

 {/* Info card */}
 <InfoCard sectionRef={el => sectionsRef.current[0] = el} />

 {/* Features grid */}
 <FeaturesGrid sectionRef={el => sectionsRef.current[1] = el} />

 {/* Quick Installation */}
 <InfoSection 
 sectionRef={el => sectionsRef.current[2] = el}
 icon={Settings}
 title="Brza Instalacija"
 description="Instalirajte vaše pametne rolete u minutama s našim jednostavnim vodičem i montažnim priborom."
 imageUrl="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
 imageAlt="Brza Instalacija"
 linkTo="/installation-guide"
 scrollY={scrollY}
 inView={sectionsRef.current[2]?.classList.contains('in-view') || false}
 />

 {/* Connect to Home */}
 <InfoSection 
 sectionRef={el => sectionsRef.current[3] = el}
 icon={Wifi}
 title="Povežite s Domom"
 description="Povežite vaše rolete s kućnom mrežom pomoću našeg Smart Hub-a ili direktne WiFi veze."
 imageUrl="https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
 imageAlt="Povežite s Domom"
 linkTo="/connectivity-guide"
 isReversed
 scrollY={scrollY}
 inView={sectionsRef.current[3]?.classList.contains('in-view') || false}
 />

 {/* Smart Control */}
 <InfoSection 
 sectionRef={el => sectionsRef.current[4] = el}
 icon={Smartphone}
 title="Pametno Upravljanje"
 description="Upravljajte s bilo kojeg mjesta pomoću naše aplikacije ili Apple Home. Postavite raspored i stvorite scene."
 imageUrl="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
 imageAlt="Pametno Upravljanje"
 linkTo="/smart-control-guide"
 scrollY={scrollY}
 inView={sectionsRef.current[4]?.classList.contains('in-view') || false}
 />
 </div>
 </div>
 );
};

export default HowItWorksPage;
import { Sun, Battery, Smartphone, Shield, Zap, Palette, Clock, WifiIcon } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { useEffect, useRef } from 'react';

const Features = () => {
 const featuresRef = useRef<HTMLDivElement>(null);
 
 // Enhanced feature list with more options
 const features = [
 {
 icon: <Sun className="w-8 h-8"/>,
 title:"Adaptive Light Sensing",
 description:"AI-powered sensors adjust based on natural light patterns throughout the day"
 },
 {
 icon: <Smartphone className="w-8 h-8"/>,
 title:"Multi-Device Control",
 description:"Voice, app, or motion control from any of your connected devices"
 },
 {
 icon: <Battery className="w-8 h-8"/>,
 title:"Ultra-Long Battery",
 description:"Advanced power management with up to 18 months on a single charge"
 },
 {
 icon: <Shield className="w-8 h-8"/>,
 title:"Lifetime Warranty",
 description:"Premium support and comprehensive coverage for your peace of mind"
 },
 {
 icon: <Zap className="w-8 h-8"/>,
 title:"Energy Optimization",
 description:"Smart scheduling reduces energy consumption by up to 30%"
 },
 {
 icon: <Palette className="w-8 h-8"/>,
 title:"Designer Fabrics",
 description:"Premium materials with over 200 texture and color options"
 },
 {
 icon: <WifiIcon className="w-8 h-8"/>,
 title:"Mesh Network",
 description:"Self-healing network ensures reliable connectivity throughout your home"
 },
 {
 icon: <Clock className="w-8 h-8"/>,
 title:"Custom Schedules",
 description:"Create intricate routines that adapt to your lifestyle and seasonal changes"
 }
 ];
 
 // Staggered animation on scroll
 useEffect(() => {
 if (!featuresRef.current) return;
 
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 // Get all feature cards inside the container
 const cards = featuresRef.current?.querySelectorAll('.feature-card');
 // Apply staggered animations
 cards?.forEach((card, index) => {
 setTimeout(() => {
 card.classList.add('visible');
 }, 100 * index);
 });
 // Only run once
 observer.disconnect();
 }
 });
 },
 { threshold: 0.1 }
 );
 
 observer.observe(featuresRef.current);
 
 return () => {
 observer.disconnect();
 };
 }, []);

 return (
 <div className="py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
 {/* Background elements */}
 <div className="absolute inset-0 overflow-hidden">
 <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
 <div className="absolute -left-24 top-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
 </div>
 
 <div className="text-center mb-16 relative">
 <span className="text-blue-600 text-sm font-semibold tracking-wider uppercase">Smart Features</span>
 <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
 Experience Next-Gen Living
 </h2>
 <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6"></div>
 <p className="text-xl text-gray-600 max-w-2xl mx-auto">
 Intuitive technology that learns and adapts to your unique lifestyle
 </p>
 </div>

 <div 
 ref={featuresRef} 
 className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
 >
 {features.slice(0, 4).map((feature, index) => (
 <div key={index} className="feature-card reveal-staggered h-full">
 <FeatureCard
 icon={feature.icon}
 title={feature.title}
 description={feature.description}
 />
 </div>
 ))}
 </div>
 
 {/* Second row of features with offset layout */}
 <div className="mt-8 lg:mt-12 px-8 sm:px-16 md:px-24 lg:px-32">
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
 {features.slice(4).map((feature, index) => (
 <div key={index + 4} className="feature-card reveal-staggered h-full">
 <FeatureCard
 icon={feature.icon}
 title={feature.title}
 description={feature.description}
 />
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
};

export default Features;
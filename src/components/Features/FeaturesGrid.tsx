import React from 'react';
import { Sun, Smartphone, Battery, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

interface FeaturesGridProps {
  sectionRef: (node: HTMLDivElement | null) => void;
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ sectionRef }) => {
  const features = [
    {
      icon: <Sun size={24} />,
      title: 'Light Sensing',
      description: 'Automatically adjusts based on natural light levels throughout the day'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Smart Control',
      description: 'Control from anywhere using our intuitive smartphone app'
    },
    {
      icon: <Battery size={24} />,
      title: 'Long Battery Life',
      description: 'Up to 12 months of operation on a single charge'
    },
    {
      icon: <Shield size={24} />,
      title: '5-Year Warranty',
      description: 'Peace of mind with our comprehensive coverage'
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 transition-all duration-1000 delay-500 ease-out"
      style={{ 
        opacity: 1,
        transform: 'translateY(0)'
      }}
    >
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesGrid; 
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
      title: 'Senzor Svjetla',
      description: 'Automatski se prilagođava na temelju razine prirodnog svjetla tijekom dana'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Pametno Upravljanje',
      description: 'Upravljajte s bilo kojeg mjesta pomoću naše intuitivne aplikacije za pametni telefon'
    },
    {
      icon: <Battery size={24} />,
      title: 'Dugotrajan Baterijski Život',
      description: 'Do 12 mjeseci rada na jednom punjenju'
    },
    {
      icon: <Shield size={24} />,
      title: '5-Godišnje Jamstvo',
      description: 'Mir u duši s našim sveobuhvatnim pokrivanjem'
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
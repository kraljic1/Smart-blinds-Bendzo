import React from 'react';
import { Sun, Battery, Smartphone, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: <Sun className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Light Sensing",
      description: "Automatically adjusts based on natural light levels throughout the day"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Smart Control",
      description: "Control from anywhere using our intuitive smartphone app"
    },
    {
      icon: <Battery className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Long Battery Life",
      description: "Up to 12 months of operation on a single charge"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "5-Year Warranty",
      description: "Peace of mind with our comprehensive coverage"
    }
  ];

  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Features for Modern Living
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Experience the perfect blend of convenience and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
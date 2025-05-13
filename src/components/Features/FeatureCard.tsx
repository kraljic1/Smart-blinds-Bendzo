import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="feature-card group relative h-full">
      <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-12 h-12 text-blue-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
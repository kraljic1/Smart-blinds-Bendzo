import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group relative h-full">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      
      {/* Card with glassmorphism effect and fixed height */}
      <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-5px] overflow-hidden h-full flex flex-col">
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-[100px] -translate-y-10 translate-x-10 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500" />
        
        {/* Icon container with hover effect */}
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
          <div className="text-blue-600 dark:text-blue-400 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        {/* Title with gradient on hover */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 relative z-10 flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
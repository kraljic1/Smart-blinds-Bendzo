import React from 'react';

interface AnimatedHeaderProps {
  headerRef: React.RefObject<HTMLDivElement>;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ headerRef }) => {
  return (
    <div 
      ref={headerRef} 
      className="text-center mb-16 transition-all duration-1000 ease-out"
      style={{ 
        opacity: 1,
        transform: 'translateY(0)'
      }}
    >
      <div className="relative inline-block mb-4">
        <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-xl"></span>
        <h1 className="relative text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Get Started with Your Smart Blinds
        </h1>
      </div>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6"></div>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Looking for smart made-to-measure window coverings powered by Eve MotionBlinds motors? 
        Then you have come to the right place at Smartblinds. In our webshop you can quickly and easily order 
        the smartest window coverings and instantly get the right atmosphere, comfort, safety and privacy in your home.
      </p>
    </div>
  );
};

export default AnimatedHeader; 
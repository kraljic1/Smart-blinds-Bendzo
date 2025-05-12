import React from 'react';

interface InfoCardProps {
  sectionRef: (node: HTMLDivElement | null) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ sectionRef }) => {
  return (
    <div 
      ref={sectionRef}
      className="relative mb-20 transition-all duration-1000 delay-300 ease-out"
      style={{ 
        opacity: 1,
        transform: 'translateY(0)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl blur-xl"></div>
      <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/70 rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Smartblinds powered by Eve MotionBlinds
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-4xl relative z-10">
          Smartblinds with Eve MotionBlinds motors are user-friendly and therefore super easy to set up 
          and control. They are also designed to protect your privacy with no need for registration and 
          tracking. All data is stored in the motor, which means all data stays in the home and not in 
          the cloud. Enjoy the convenience of Smartblinds by setting your electric roller blinds to open 
          and close at any desired time or connect them to other smart home devices to do the hard work for you.
        </p>
      </div>
    </div>
  );
};

export default InfoCard; 
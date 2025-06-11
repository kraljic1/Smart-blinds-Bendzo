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
          Počnite s Vašim Pametnim Roletama
        </h1>
      </div>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6"></div>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Tražite pametne prozorske pokrove po mjeri pokretane Eve MotionBlinds motorima? 
        Tada ste došli na pravo mjesto u Smartblinds. U našoj web trgovini možete brzo i jednostavno naručiti 
        najpametnije prozorske pokrove i odmah dobiti pravu atmosferu, udobnost, sigurnost i privatnost u vašem domu.
      </p>
    </div>
  );
};

export default AnimatedHeader; 
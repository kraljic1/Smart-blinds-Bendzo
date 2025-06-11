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
          Smartblinds pokretane Eve MotionBlinds motorima
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-4xl relative z-10">
          Smartblinds s Eve MotionBlinds motorima su jednostavne za korištenje i stoga super lake za postavljanje 
          i upravljanje. Također su dizajnirane da zaštite vašu privatnost bez potrebe za registracijom i 
          praćenjem. Svi podaci se pohranjuju u motoru, što znači da svi podaci ostaju u domu, a ne u 
          oblaku. Uživajte u praktičnosti Smartblinds postavljanjem vaših električnih roleta da se otvaraju 
          i zatvaraju u bilo koje željeno vrijeme ili ih povežite s drugim pametnim kućnim uređajima da rade umjesto vas.
        </p>
      </div>
    </div>
  );
};

export default InfoCard; 
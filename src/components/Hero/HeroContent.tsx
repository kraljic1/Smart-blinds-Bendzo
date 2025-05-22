import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroContentProps } from './types';

const HeroContent: React.FC<HeroContentProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  headingRef,
  headingVisible
}) => {
  // Handle smooth scrolling when buttonLink is an anchor
  const handleButtonClick = (e: React.MouseEvent) => {
    if (buttonLink && buttonLink.startsWith('#')) {
      e.preventDefault();
      const targetId = buttonLink.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <div className="container relative mx-auto z-10">
      <div className="items-center flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
          <div className="text-white">
            <div className="relative mb-4 inline-block">
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-xl"></span>
              <h1 
                ref={headingRef}
                className="relative text-5xl md:text-6xl font-bold leading-tight mb-2 animate-text-reveal"
              >
                {title}
              </h1>
            </div>
            <div className="relative inline-block">
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-xl"></span>
              <p 
                className={`relative mt-4 text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed ${
                  headingVisible ? 'animate-sequential-reveal' : 'opacity-0'
                }`} 
                delay-300
              >
                {description}
              </p>
            </div>
            <div className={`flex justify-center delay-500 ${headingVisible ? 'animate-sequential-reveal' : 'opacity-0'}`}>
              {buttonLink.startsWith('#') ? (
                <a
                  href={buttonLink}
                  onClick={handleButtonClick}
                  className="group relative px-8 py-4 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 w-3 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-[400ms] ease-out group-hover:w-full opacity-40"></div>
                  <div className="relative flex items-center gap-2 text-white font-medium">
                    <span>{buttonText}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              ) : (
                <Link
                  to={buttonLink}
                  className="group relative px-8 py-4 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 w-3 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-[400ms] ease-out group-hover:w-full opacity-40"></div>
                  <div className="relative flex items-center gap-2 text-white font-medium">
                    <span>{buttonText}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent; 
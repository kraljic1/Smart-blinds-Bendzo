import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  images: string[];
  autoChangeInterval?: number; // in milliseconds
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  images,
  autoChangeInterval = 5000,
  title = "Transform Your Windows Into Smart Windows",
  description = "Automate your home with smart blinds that adjust to your schedule, save energy, and create the perfect ambiance throughout the day.",
  buttonText = "Learn More",
  buttonLink = "/how-it-works"
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const heroRef = useRef<HTMLDivElement>(null);
  
  const changeImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  }, [images.length]);
  
  // Handle auto-change of images
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(changeImage, autoChangeInterval);
    return () => clearInterval(interval);
  }, [changeImage, autoChangeInterval, images.length]);
  
  // Set background images via JavaScript
  useEffect(() => {
    images.forEach((img, index) => {
      const imageDiv = imageRefs.current.get(index);
      if (imageDiv) {
        imageDiv.style.backgroundImage = `url(${img})`;
      }
    });
  }, [images]);

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
    <div 
      ref={heroRef}
      className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* Carousel images */}
      {images.map((img, index) => (
        <div 
          key={index}
          ref={(el) => {
            if (el) imageRefs.current.set(index, el);
          }}
          className={`absolute top-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          data-bg-image={img}
        />
      ))}
      
      {/* Gradient overlay */}
      <div 
        className="absolute top-0 w-full h-full z-[1]"
        style={{
          background: 'linear-gradient(125deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(45,10,80,0.6) 100%)'
        }}
      ></div>
      
      {/* Content */}
      <div className="container relative mx-auto z-10">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="text-white">
              <div className="relative mb-4 inline-block">
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-xl"></span>
                <h1 className="relative text-5xl md:text-6xl font-bold leading-tight mb-2 animate-text-reveal">
                  {title}
                </h1>
              </div>
              <div className="relative inline-block">
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-xl"></span>
                <p className="relative mt-4 text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed animate-text-reveal" style={{ animationDelay: '0.3s' }}>
                  {description}
                </p>
              </div>
              <div className="flex justify-center">
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
      
      {/* Carousel indicators with modern design */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              currentImageIndex === index 
                ? 'bg-white/90 w-12' 
                : 'bg-white/30 w-6 hover:bg-white/50 hover:w-8'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
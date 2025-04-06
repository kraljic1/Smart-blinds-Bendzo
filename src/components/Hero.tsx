import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen overflow-hidden">
      {/* Carousel images */}
      {images.map((img, index) => (
        <div 
          key={index}
          ref={(el) => {
            if (el) imageRefs.current.set(index, el);
          }}
          className={`absolute top-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ease-in-out carousel-image ${currentImageIndex === index ? 'active' : ''}`}
          data-bg-image={img}
        />
      ))}
      
      {/* Dark overlay */}
      <div className="absolute top-0 w-full h-full bg-black opacity-50 z-[1]"></div>
      
      {/* Content */}
      <div className="container relative mx-auto z-10">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold leading-tight mb-6">
                {title}
              </h1>
              <p className="mt-4 text-lg text-gray-200 mb-8">
                {description}
              </p>
              <div className="flex justify-center">
                {buttonLink.startsWith('#') ? (
                  <a
                    href={buttonLink}
                    onClick={handleButtonClick}
                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition"
                  >
                    {buttonText}
                  </a>
                ) : (
                  <Link
                    to={buttonLink}
                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition"
                  >
                    {buttonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImageIndex === index 
                ? 'bg-white w-4' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
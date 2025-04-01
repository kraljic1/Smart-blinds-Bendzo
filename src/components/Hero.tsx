import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import images
import background1 from '../img/background-hero/background1.webp';
import background2 from '../img/background-hero/background2.webp';
import background3 from '../img/background-hero/background3.webp';
import background4 from '../img/background-hero/background4.webp';
import background5 from '../img/background-hero/background5.webp';

const Hero = () => {
  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    background1,
    background2,
    background3,
    background4,
    background5
  ];

  // Set up automatic carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500); // 4.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen overflow-hidden">
      {/* Carousel images */}
      {images.map((img, index) => (
        <div 
          key={index}
          className="absolute top-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: currentImageIndex === index ? 1 : 0,
            zIndex: 0
          }}
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
                Transform Your Windows Into Smart Windows
              </h1>
              <p className="mt-4 text-lg text-gray-200 mb-8">
                Automate your home with smart blinds that adjust to your schedule, 
                save energy, and create the perfect ambiance throughout the day.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/how-it-works"
                  className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition"
                >
                  Learn More
                </Link>
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
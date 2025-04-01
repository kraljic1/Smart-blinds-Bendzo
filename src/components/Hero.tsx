import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
      <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')"
      }}>
        <span className="w-full h-full absolute opacity-50 bg-black"></span>
      </div>
      
      <div className="container relative mx-auto">
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
    </div>
  );
};

export default Hero;
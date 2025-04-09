import { Link } from 'react-router-dom';
import { Settings, Wifi, Smartphone, Sun, Shield, Battery } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const HowItWorksPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for subtle parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle animation of elements when they enter viewport
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-32 top-32 w-96 h-96 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
        <div className="absolute right-0 top-[60%] w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header section with animated title */}
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

        {/* Info card with glassmorphism */}
        <div 
          ref={el => sectionsRef.current[0] = el}
          className="relative mb-20 transition-all duration-1000 delay-300 ease-out"
          style={{ 
            opacity: 1,
            transform: 'translateY(0)'
          }}>
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

        {/* Features grid with modern cards */}
        <div 
          ref={el => sectionsRef.current[1] = el}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 transition-all duration-1000 delay-500 ease-out"
          style={{ 
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          {/* Light Sensing */}
          <div className="feature-card group relative h-full">
            <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 text-blue-600 mb-4">
                <Sun className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Light Sensing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automatically adjusts based on natural light levels throughout the day
              </p>
            </div>
          </div>
          
          {/* Smart Control */}
          <div className="feature-card group relative h-full">
            <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 text-blue-600 mb-4">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart Control
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Control from anywhere using our intuitive smartphone app
              </p>
            </div>
          </div>
          
          {/* Long Battery Life */}
          <div className="feature-card group relative h-full">
            <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 text-blue-600 mb-4">
                <Battery className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Long Battery Life
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Up to 12 months of operation on a single charge
              </p>
            </div>
          </div>
          
          {/* 5-Year Warranty */}
          <div className="feature-card group relative h-full">
            <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 text-blue-600 mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                5-Year Warranty
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Peace of mind with our comprehensive coverage
              </p>
            </div>
          </div>
        </div>

        {/* Quick Installation */}
        <div 
          ref={el => sectionsRef.current[2] = el}
          className="flex flex-col lg:flex-row items-center gap-12 mb-24 opacity-0 transition-all duration-1000 ease-out"
          style={{ 
            opacity: sectionsRef.current[2]?.classList.contains('in-view') ? 1 : 0,
            transform: sectionsRef.current[2]?.classList.contains('in-view') 
              ? 'translateY(0)' 
              : `translateY(${Math.min(scrollY * 0.02, 15)}px)`
          }}
        >
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 p-4 inline-block bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl">
              <Settings className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Quick Installation
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Install your smart blinds in minutes with our easy-to-follow guide and mounting hardware.
            </p>
            <Link
              to="/installation-guide"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
            >
              <span>Learn more →</span>
            </Link>
          </div>
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Quick Installation" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Connect to Home */}
        <div 
          ref={el => sectionsRef.current[3] = el}
          className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24 opacity-0 transition-all duration-1000 ease-out"
          style={{ 
            opacity: sectionsRef.current[3]?.classList.contains('in-view') ? 1 : 0,
            transform: sectionsRef.current[3]?.classList.contains('in-view') ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 p-4 inline-block bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl">
              <Wifi className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Connect to Home
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Connect your blinds to your home network using our Smart Hub or direct WiFi connection.
            </p>
            <Link
              to="/connectivity-guide"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
            >
              <span>Learn more →</span>
            </Link>
          </div>
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Connect to Home" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Smart Control */}
        <div 
          ref={el => sectionsRef.current[4] = el}
          className="flex flex-col lg:flex-row items-center gap-12 mb-24 opacity-0 transition-all duration-1000 ease-out"
          style={{ 
            opacity: sectionsRef.current[4]?.classList.contains('in-view') ? 1 : 0,
            transform: sectionsRef.current[4]?.classList.contains('in-view') ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 p-4 inline-block bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl">
              <Smartphone className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Smart Control
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Control from anywhere using our app or Apple Home. Set schedules and create scenes.
            </p>
            <Link
              to="/smart-control-guide"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
            >
              <span>Learn more →</span>
            </Link>
          </div>
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Smart Control" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
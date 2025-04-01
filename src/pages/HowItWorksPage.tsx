import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Wifi, Smartphone, Sun, Moon, Shield, Battery } from 'lucide-react';

const HowItWorksPage = () => {
  const features = [
    {
      icon: <Sun className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Light Sensing",
      description: "Automatically adjusts based on natural light levels throughout the day"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Smart Control",
      description: "Control from anywhere using our intuitive smartphone app"
    },
    {
      icon: <Battery className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Long Battery Life",
      description: "Up to 12 months of operation on a single charge"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "5-Year Warranty",
      description: "Peace of mind with our comprehensive coverage"
    }
  ];

  const steps = [
    {
      icon: <Settings className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      title: "Quick Installation",
      description: "Install your smart blinds in minutes with our easy-to-follow guide and mounting hardware.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      link: "/installation-guide"
    },
    {
      icon: <Wifi className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      title: "Connect to Home",
      description: "Connect your blinds to your home network using our Smart Hub or direct WiFi connection.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      link: "/connectivity-guide"
    },
    {
      icon: <Smartphone className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      title: "Smart Control",
      description: "Control from anywhere using our app or Apple Home. Set schedules and create scenes.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      link: "/smart-control-guide"
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Get Started with Your Smart Blinds
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Looking for smart made-to-measure window coverings powered by Eve MotionBlinds motors? 
            Then you have come to the right place at Smartblinds. In our webshop you can quickly 
            and easily order the smartest window coverings and instantly get the right atmosphere, 
            comfort, safety and privacy in your home.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Smartblinds powered by Eve MotionBlinds
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Smartblinds with Eve MotionBlinds motors are user-friendly and therefore super easy to set up 
            and control. They are also designed to protect your privacy with no need for registration and 
            tracking. All data is stored in the motor, which means all data stays in the home and not in 
            the cloud. Enjoy the convenience of Smartblinds by setting your electric roller blinds to open 
            and close at any desired time or connect them to other smart home devices to do the hard work for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center gap-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{step.description}</p>
                <Link
                  to={step.link}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-500 transition"
                >
                  Learn more →
                </Link>
              </div>
              <div className="flex-1">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
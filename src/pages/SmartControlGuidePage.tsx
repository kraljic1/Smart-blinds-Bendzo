import { Link } from 'react-router-dom';
import { Smartphone, Clock, Home } from 'lucide-react';

const SmartControlGuidePage = () => {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "App Control",
      description: "Control your blinds from anywhere using our mobile app",
      tips: [
        "Open/close with a single tap",
        "Set custom positions",
        "Group multiple blinds"
      ]
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Schedules",
      description: "Automate your blinds with custom schedules",
      tips: [
        "Set daily routines",
        "Weekend/weekday schedules",
        "Sunrise/sunset automation"
      ]
    },
    {
      icon: <Home className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Smart Home",
      description: "Integrate with your smart home system",
      tips: [
        "Apple HomeKit compatible",
        "Voice control support",
        "Scene integration"
      ]
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Smart Control Guide</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Learn how to control and automate your smart blinds</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.tips.map((tip, i) => (
                  <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8">Explore our product range and transform your home today</p>
          <Link
            to="/products/roller-blinds"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmartControlGuidePage;
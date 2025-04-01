import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const InstallationGuidePage = () => {
  const steps = [
    {
      title: "Preparation",
      items: [
        "Unpack your smart blinds and verify all components",
        "Gather required tools: drill, screwdriver, level, pencil",
        "Clear the installation area"
      ]
    },
    {
      title: "Mounting Brackets",
      items: [
        "Mark bracket positions using a level",
        "Drill pilot holes for brackets",
        "Secure brackets firmly to the wall or window frame"
      ]
    },
    {
      title: "Install Blinds",
      items: [
        "Insert the blind into the brackets",
        "Secure the blind in place",
        "Test manual operation before proceeding"
      ]
    }
  ];

  const tips = [
    "Ensure power source is nearby",
    "Double-check measurements",
    "Keep the manual handy"
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Quick Installation Guide</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Follow these steps to install your smart blinds safely and correctly</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-8 mb-16">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Important Tips</h3>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-yellow-600 dark:bg-yellow-500 rounded-full mr-3"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">Ready to connect your blinds to your smart home?</p>
          <Link
            to="/connectivity-guide"
            className="inline-flex items-center px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Next: Connect to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstallationGuidePage;
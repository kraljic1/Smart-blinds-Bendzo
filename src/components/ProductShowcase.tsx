import React from 'react';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  return (
    <div className="py-24 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Premium Smart Blinds for Every Style
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200 mb-8">
              Choose from our wide selection of smart blinds, designed to complement any décor while providing 
              cutting-edge automation features.
            </p>
            <ul className="space-y-4">
              {[
                "Custom sizes for perfect fit",
                "Multiple fabric options and colors",
                "Voice control compatibility",
                "Energy-efficient design"
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-200">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/products"
              className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition"
            >
              View All Products
            </Link>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Smart blinds showcase"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">Starting from</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">$199</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
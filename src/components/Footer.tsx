import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const sections = [
    {
      title: "Products",
      links: [
        { label: "Smart Blinds", path: "/products" },
        { label: "Motors", path: "/products" },
        { label: "Hub", path: "/products" },
        { label: "Accessories", path: "/products" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Installation", path: "/support" },
        { label: "FAQ", path: "/support" },
        { label: "Contact Us", path: "/support" },
        { label: "Warranty", path: "/support" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Blog", path: "/blog" },
        { label: "Careers", path: "/careers" },
        { label: "Press", path: "/press" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-white text-lg font-bold mb-4 block">
              SmartBlinds
            </Link>
            <p className="text-sm">
              Transforming homes with innovative smart window solutions.
            </p>
          </div>
          
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} SmartBlinds. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm hover:text-white transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
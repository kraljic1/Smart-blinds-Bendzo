import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

// Social media links component
const SocialMediaLinks: React.FC = () => (
 <div className="flex space-x-4 mt-4">
 <a href="https://facebook.com"target="_blank"rel="noopener noreferrer"className="group relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 transition-all duration-300"aria-label="Facebook stranica">
 <Facebook className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors"aria-hidden="true"/>
 </a>
 <a href="https://instagram.com"target="_blank"rel="noopener noreferrer"className="group relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300"aria-label="Instagram profil">
 <Instagram className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors"aria-hidden="true"/>
 </a>
 <a href="https://twitter.com"target="_blank"rel="noopener noreferrer"className="group relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 transition-all duration-300"aria-label="Twitter profil">
 <Twitter className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors"aria-hidden="true"/>
 </a>
 <a href="https://linkedin.com"target="_blank"rel="noopener noreferrer"className="group relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 transition-all duration-300"aria-label="LinkedIn stranica">
 <Linkedin className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors"aria-hidden="true"/>
 </a>
 </div>
);

// Company info section component
const CompanyInfo: React.FC = () => (
 <div className="md:col-span-4">
 <div className="flex flex-col space-y-4">
 <Link to="/"className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
 Smartblinds
 </Link>
 <p className="text-gray-600 md:pr-10">
 Premium smart window coverings powered by AI. Control your home environment with unparalleled precision and style.
 </p>
 <SocialMediaLinks />
 </div>
 </div>
);

// Products links section component
const ProductsSection: React.FC = () => {
 const products = ['Roller Blinds', 'Zebra Blinds', 'Curtain Blinds', 'Accessories'];
 
 return (
 <div className="md:col-span-2">
 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-1 border-b border-gray-200">
 Products
 </h3>
 <ul className="space-y-3">
 {products.map((item, index) => (
 <li key={index}>
 <Link 
 to={`/products/${item.toLowerCase().replace(' ', '-')}`} 
 className="group flex items-center text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
 >
 <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"/>
 {item}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 );
};

// Support links section component
const SupportSection: React.FC = () => {
 const supportLinks = [
 {name: 'Installation Guide', path: '/installation-guide'},
 {name: 'Connectivity Guide', path: '/connectivity-guide'},
 {name: 'Smart Control Guide', path: '/smart-control-guide'},
 {name: 'FAQs', path: '/support'}
 ];

 return (
 <div className="md:col-span-2">
 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-1 border-b border-gray-200">
 Support
 </h3>
 <ul className="space-y-3">
 {supportLinks.map((item, index) => (
 <li key={index}>
 <Link 
 to={item.path} 
 className="group flex items-center text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
 >
 <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"/>
 {item.name}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 );
};

// Contact information section component
const ContactSection: React.FC = () => (
 <div className="md:col-span-4">
 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-1 border-b border-gray-200">
 Contact Us
 </h3>
 <div className="space-y-4">
 <div className="flex items-start">
 <Mail className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5"/>
 <div>
 <p className="text-sm font-medium text-gray-900">Email Us</p>
 <a href="mailto:info@smartblinds-croatia.com"className="text-sm text-gray-600 hover:text-blue-600 dark:hover:text-blue-400">
 info@smartblinds-croatia.com
 </a>
 </div>
 </div>
 
 <div className="flex items-start">
 <Phone className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5"/>
 <div>
 <p className="text-sm font-medium text-gray-900">Call Us</p>
 <a href="tel:+1234567890"className="text-sm text-gray-600 hover:text-blue-600 dark:hover:text-blue-400">
 +1 (234) 567-890
 </a>
 </div>
 </div>
 
 <div className="flex items-start">
 <MapPin className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5"/>
 <div>
 <p className="text-sm font-medium text-gray-900">Visit Us</p>
 <p className="text-sm text-gray-600">
 Split, Croatia
 </p>
 </div>
 </div>
 </div>
 </div>
);

// Copyright section component
const CopyrightSection: React.FC<{ currentYear: number }> = ({ currentYear }) => (
 <div className="relative mt-16 pt-8 border-t border-gray-200">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500">
 <p>&copy; {currentYear} Smartblinds Croatia. All rights reserved.</p>
 <div className="flex space-x-6 mt-4 md:mt-0">
 <Link to="/privacy-policy"className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
 Privacy Policy
 </Link>
 <Link to="/terms-of-service"className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
 Terms of Service
 </Link>
 <Link to="/accessibility"className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
 Accessibility
 </Link>
 </div>
 </div>
 </div>
);

// Main Footer component
const Footer: React.FC = () => {
 const currentYear = new Date().getFullYear();

 return (
 <footer id="footer-animate"className="relative z-10 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
 {/* Background elements */}
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
 <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl"></div>
 </div>
 
 {/* Main footer content */}
 <div className="relative z-10 max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
 {/* Footer links and info */}
 <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
 <CompanyInfo />
 <ProductsSection />
 <SupportSection />
 <ContactSection />
 </div>
 
 <CopyrightSection currentYear={currentYear} />
 </div>
 </footer>
 );
};

export default Footer;
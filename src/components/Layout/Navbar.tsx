import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Package, HelpCircle, ShoppingCart, Heart } from 'lucide-react';

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [isAtTop, setIsAtTop] = useState(true);
 const location = useLocation();

 useEffect(() => {
 const handleScroll = () => {
 setIsAtTop(window.scrollY < 10);
 };

 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const isActive = (path: string) => location.pathname === path;

 const navLinks = [
 { path: '/', label: 'Home', icon: <Home size={16} /> },
 { path: '/products', label: 'Products', icon: <Package size={16} /> },
 { path: '/how-it-works', label: 'How it Works', icon: <HelpCircle size={16} /> },
 { path: '/basket', label: 'Basket', icon: <ShoppingCart size={16} /> },
 { path: '/liked', label: 'Liked', icon: <Heart size={16} /> },
 ];

 return (
 <nav className={`fixed w-full z-50 border-b transition-all duration-300 ${
 isAtTop 
 ? 'bg-white border-gray-200 shadow-lg' 
 : 'bg-white/95 backdrop-blur-sm border-gray-100'
 }`}>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between h-16 items-center">
 <Link to="/" className="flex-shrink-0 font-bold text-2xl text-blue-600 relative">
 <span className="absolute inset-0 bg-blue-500/10 blur-md rounded-lg"></span>
 <span className="relative">SmartBlinds</span>
 </Link>
 
 <div className="hidden md:flex items-center space-x-4">
 {navLinks.map((link) => (
 <Link
 key={link.path}
 to={link.path}
 className={`${
 isActive(link.path)
 ? 'text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-md relative'
 : 'text-gray-900 font-semibold bg-gray-50 px-3 py-1 rounded-md hover:text-blue-600'
 } transition flex items-center gap-2`}
 >
 {link.icon}
 {link.label}
 </Link>
 ))}
 </div>

 <div className="md:hidden flex items-center gap-4">
 <button 
 onClick={() => setIsOpen(!isOpen)} 
 className="p-2 text-gray-800 hover:text-blue-600"
 >
 {isOpen ? <X size={20} /> : <Menu size={20} />}
 </button>
 </div>
 </div>
 </div>

 {isOpen && (
 <div className="md:hidden">
 <div className="px-4 pt-3 pb-4 space-y-1 bg-white border-t border-gray-200 shadow-lg">
 {navLinks.map((link) => (
 <Link
 key={link.path}
 to={link.path}
 className={`flex items-center gap-2 px-3 py-2 rounded-md ${
 isActive(link.path)
 ? 'bg-blue-50 text-blue-600 font-bold'
 : 'bg-gray-50 text-gray-900 font-semibold hover:text-blue-600'
 }`}
 onClick={() => setIsOpen(false)}
 >
 {link.icon}
 {link.label}
 </Link>
 ))}
 </div>
 </div>
 )}
 </nav>
 );
};

export default Navbar;
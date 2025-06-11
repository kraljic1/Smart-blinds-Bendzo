import React from 'react';
import { Link } from 'react-router-dom';

const ProductHero: React.FC = () => {
 return (
 <div className="relative h-[50vh] mb-24">
 <div className="absolute inset-0">
 <img 
 src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
 alt="Smart blinds showcase"
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-black/40"/>
 </div>
 <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
 <div className="max-w-3xl">
 <h1 className="text-5xl font-bold text-white mb-6">
 Smart Solutions for Modern Living
 </h1>
 <p className="text-xl text-blue-50 mb-8">
 Discover our range of innovative smart blinds designed to transform your home
 </p>
 <Link
 to="/how-it-works"
 className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-blue-900 transition shadow-lg"
 >
 How It Works
 </Link>
 </div>
 </div>
 </div>
 );
};

export default ProductHero; 
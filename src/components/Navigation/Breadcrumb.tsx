import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
 items: {
 label: string;
 path: string;
 }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
 return (
 <nav className="flex"aria-label="Breadcrumb">
 <ol className="inline-flex items-center space-x-2">
 {items.map((item, index) => (
 <li key={item.path} className="inline-flex items-center">
 {index > 0 && (
 <ChevronRight className="w-4 h-4 text-gray-400 mx-2"/>
 )}
 <Link
 to={item.path}
 className={`text-sm ${
 index === items.length - 1
 ? 'text-gray-700 font-medium'
 : 'text-gray-500 hover:text-gray-700 dark:hover:text-white'
 }`}
 >
 {item.label}
 </Link>
 </li>
 ))}
 </ol>
 </nav>
 );
};

export default Breadcrumb;
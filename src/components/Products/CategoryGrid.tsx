import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Category, categories } from '../../data/categoryData';

interface CategoryGridProps {
 onCategoryChange?: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryChange }) => {
 const location = useLocation();
 const navigate = useNavigate();

 const isActive = (path: string) => location.pathname === path;

 const handleCategoryClick = (category: Category) => {
 navigate(category.path);
 if (onCategoryChange) {
 onCategoryChange(category);
 }
 };

 return (
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
 {categories.map((category) => (
 <button
 key={category.id}
 onClick={() => handleCategoryClick(category)}
 className={`
 p-6 rounded-xl text-left transition-all
 ${isActive(category.path)
 ? 'bg-blue-50 border-blue-500'
 : 'bg-white hover:bg-blue-50 :bg-blue-900/20'
 }
 shadow-sm hover:shadow-md
 `}
 >
 <div className="flex justify-between items-start">
 <div>
 <h3 className="text-xl font-bold text-gray-900 mb-2">
 {category.name}
 </h3>
 <p className="text-gray-600">
 {category.description}
 </p>
 </div>
 <span className={`
 mt-1 transform transition-transform
 ${isActive(category.path)
 ? 'text-blue-600 '
 : 'text-gray-400 '
 }
 `}>
 <ChevronRight className="w-6 h-6"/>
 </span>
 </div>
 </button>
 ))}
 </div>
 );
};

export default CategoryGrid; 
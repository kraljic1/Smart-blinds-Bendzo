import React, { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLikedContext } from '../../hooks/useLikedContext';


export const LikedIcon: React.FC = () => {
 const { likedItems, getLikedItemsCount } = useLikedContext();
 const [showPreview, setShowPreview] = useState(false);
 const previewRef = useRef<HTMLDivElement>(null);
 const likedCount = getLikedItemsCount();

 useEffect(() => {
 function handleClickOutside(event: MouseEvent) {
 if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
 setShowPreview(false);
 }
 }

 document.addEventListener('mousedown', handleClickOutside);
 return () => {
 document.removeEventListener('mousedown', handleClickOutside);
 };
 }, []);

 const togglePreview = () => {
 setShowPreview(!showPreview);
 };

 return (
 <div className="liked-icon-container">
 <Link 
 to="#"
 className="liked-icon-link"
 onClick={(e) => { 
 e.preventDefault(); 
 togglePreview(); 
 }}
 aria-label="View liked items"
 >
 <div className="liked-icon light-mode">
 <Heart size={24} />
 {likedCount > 0 && (
 <span className="liked-icon-count">{likedCount}</span>
 )}
 </div>
 </Link>

 {showPreview && (
 <div ref={previewRef} className="liked-preview">
 <div className="liked-preview-header">
 Your Favorites ({likedCount})
 </div>
 
 {likedItems.length === 0 ? (
 <div className="p-4 text-center text-gray-500">
 No favorites yet
 </div>
 ) : (
 <div className="max-h-64 overflow-y-auto">
 {likedItems.slice(0, 3).map((product) => (
 <div key={product.id} className="p-3 border-b border-gray-100 flex items-center">
 <img 
 src={product.image} 
 alt={product.name} 
 className="w-12 h-12 object-cover rounded-md mr-3"
 />
 <div className="flex-grow min-w-0">
 <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
 <p className="text-xs text-blue-600">${product.price}</p>
 </div>
 </div>
 ))}
 
 {likedItems.length > 3 && (
 <div className="p-2 text-center text-sm text-gray-500">
 +{likedItems.length - 3} more items
 </div>
 )}
 </div>
 )}
 
 <Link to="/liked"className="liked-preview-view-btn">
 View All Favorites
 </Link>
 </div>
 )}
 </div>
 );
}; 
import React from 'react';
import { useLikedContext } from '../../hooks/useLikedContext';
import ModernProductCard from '../Product/ModernProductCard';
import { Link } from 'react-router-dom';
import './LikedItemsGrid.css';

export const LikedItemsGrid: React.FC = () => {
 const { likedItems, clearLikedItems, getLikedItemsCount } = useLikedContext();
 const likedItemsCount = getLikedItemsCount();

 if (likedItems.length === 0) {
 return (
 <div className="liked-empty">
 <h2>Vaš popis omiljenih je prazan</h2>
 <p>Označite proizvode kao omiljene da biste ih vidjeli ovdje.</p>
 <Link to="/products/roller-blinds"className="liked-browse-btn">Pregledajte naše proizvode</Link>
 </div>
 );
 }

 return (
 <div className="liked-items">
 <div className="liked-header">
 <h2 className="liked-title">Vaši omiljeni ({likedItemsCount} {likedItemsCount === 1 ? 'proizvod' : 'proizvoda'})</h2>
 <button 
 onClick={clearLikedItems} 
 className="liked-clear-btn"
 aria-label="Ukloni sve omiljene"
 >
 Ukloni sve
 </button>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12">
 {likedItems.map((product, index) => (
 <div key={product.id} className="product-card-wrapper">
 <ModernProductCard
 product={product}
 delay={index * 100}
 />
 </div>
 ))}
 </div>
 </div>
 );
}; 
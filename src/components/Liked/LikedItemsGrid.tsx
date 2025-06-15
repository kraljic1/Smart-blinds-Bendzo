import React from 'react';
import { useLikedContext } from '../../hooks/useLikedContext';
import ModernProductCard from '../Product/ModernProductCard';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import './LikedItemsGrid.css';

export const LikedItemsGrid: React.FC = () => {
 const { likedItems, clearLikedItems, getLikedItemsCount } = useLikedContext();
 const likedItemsCount = getLikedItemsCount();

 if (likedItems.length === 0) {
 return (
 <div className="liked-empty">
 <div className="modern-icon-container" style={{ margin: '0 auto 2rem' }}>
 <Heart size={32} />
 </div>
 <h2>Vaš popis omiljenih je prazan</h2>
 <p>Označite proizvode kao omiljene da biste ih vidjeli ovdje.</p>
 <Link to="/products/roller-blinds" className="liked-browse-btn">
 <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
 Pregledajte naše proizvode
 </Link>
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
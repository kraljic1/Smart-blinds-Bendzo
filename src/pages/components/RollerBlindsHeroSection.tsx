import React from 'react';
import ProductPageHeroCarousel from '../../components/Product/ProductPageHeroCarousel';
import rollerHero1 from '../../img/hero-images/roller1.webp';
import rollerHero2 from '../../img/hero-images/roller2.webp';

interface RollerBlindsHeroSectionProps {
 isLoaded: boolean;
 onScrollToProducts: (e: React.MouseEvent) => void;
}

const RollerBlindsHeroSection: React.FC<RollerBlindsHeroSectionProps> = ({ 
 isLoaded, 
 onScrollToProducts 
}) => {
 const heroImages = [rollerHero1, rollerHero2];
 const imageAlts = [
 'Smart roller blinds in modern living room',
 'Premium roller blinds window automation'
 ];

 return (
 <ProductPageHeroCarousel
 title="Smart Roller Blinds"
 description="Enhance your windows with our premium smart roller blinds collection. Elegant, functional, and designed to fit seamlessly into your home."
 heroImages={heroImages}
 imageAlts={imageAlts}
 isLoaded={isLoaded}
 onExploreClick={onScrollToProducts}
 autoChangeInterval={6000}
 />
 );
};

export default RollerBlindsHeroSection; 
import { RefObject } from 'react';

export interface HeroProps {
 images: string[];
 autoChangeInterval?: number; // in milliseconds
 title?: string;
 description?: string;
 buttonText?: string;
 buttonLink?: string;
}

export interface HeroBackgroundProps {
 images: string[];
 currentImageIndex: number;
}

export interface HeroContentProps {
 title: string;
 description: string;
 buttonText: string;
 buttonLink: string;
 headingRef: RefObject<HTMLHeadingElement>;
 headingVisible: boolean;
}

export interface HeroCarouselIndicatorsProps {
 images: string[];
 currentImageIndex: number;
 setCurrentImageIndex: (index: number) => void;
}

export type HeroScrollIndicatorProps = Record<never, never>; 
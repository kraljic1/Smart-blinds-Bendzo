import { RefObject } from 'react';
import TestimonialCard from '../TestimonialCard';
import NavigationButton from './NavigationButton';

interface Testimonial {
 name: string;
 role: string;
 content: string;
 rating: number;
 company?: string;
 location?: string;
 avatar?: string;
}

interface TestimonialsGridProps {
 visibleTestimonials: Testimonial[];
 reviewsRef: RefObject<HTMLDivElement | null>;
 onPrev: () => void;
 onNext: () => void;
}

const TestimonialsGrid = ({ 
 visibleTestimonials, 
 reviewsRef, 
 onPrev, 
 onNext 
}: TestimonialsGridProps) => {
 return (
 <div className="relative">
 <NavigationButton direction="prev"onClick={onPrev} />
 
 <div
 ref={reviewsRef}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
 >
 {visibleTestimonials.map((testimonial, index) => (
 <TestimonialCard 
 key={index} 
 testimonial={testimonial} 
 index={index} 
 />
 ))}
 </div>
 
 <NavigationButton direction="next"onClick={onNext} />
 </div>
 );
};

export default TestimonialsGrid; 
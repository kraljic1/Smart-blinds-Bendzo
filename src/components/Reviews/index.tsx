import { useTestimonialRotation, useStaggeredAnimation } from './hooks';
import { 
 ReviewsHeader, 
 BackgroundElements, 
 TestimonialsGrid, 
 PaginationDots 
} from './components';

const Reviews = () => {
 const testimonialsPerView = 6;
 const {
 activeIndex,
 visibleTestimonials,
 handlePrev,
 handleNext,
 goToTestimonial,
 totalGroups
 } = useTestimonialRotation(testimonialsPerView);

 const reviewsRef = useStaggeredAnimation(visibleTestimonials);

 return (
 <div className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
 <BackgroundElements />
 
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
 <ReviewsHeader />

 <TestimonialsGrid
 visibleTestimonials={visibleTestimonials}
 reviewsRef={reviewsRef}
 onPrev={handlePrev}
 onNext={handleNext}
 />
 
 <PaginationDots
 totalGroups={totalGroups}
 activeIndex={activeIndex}
 testimonialsPerView={testimonialsPerView}
 onGoToTestimonial={goToTestimonial}
 />
 </div>
 </div>
 );
};

export default Reviews; 
interface PaginationDotsProps {
 totalGroups: number;
 activeIndex: number;
 testimonialsPerView: number;
 onGoToTestimonial: (index: number) => void;
}

const PaginationDots = ({ 
 totalGroups, 
 activeIndex, 
 testimonialsPerView, 
 onGoToTestimonial 
}: PaginationDotsProps) => {
 return (
 <div className="flex justify-center space-x-2 mt-12">
 {Array.from({ length: totalGroups }).map((_, index) => {
 const isActive = Math.floor(activeIndex / testimonialsPerView) === index;
 return (
 <button
 key={index}
 onClick={() => onGoToTestimonial(index * testimonialsPerView)}
 className={`h-1.5 rounded-full transition-all duration-300 ${
 isActive 
 ? 'bg-blue-600 dark:bg-blue-500 w-12' 
 : 'bg-gray-300 dark:bg-gray-600 w-6 hover:bg-gray-400 dark:hover:bg-gray-500'
 }`}
 aria-label={`Go to testimonial group ${index + 1}`}
 />
 );
 })}
 </div>
 );
};

export default PaginationDots; 
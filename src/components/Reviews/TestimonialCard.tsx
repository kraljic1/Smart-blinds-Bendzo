import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../../data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  // Calculate dynamic height based on content length - gives masonry effect
  const contentLength = testimonial.content.length;
  const heightClass = 
    contentLength < 80 ? 'min-h-[200px]' : 
    contentLength < 150 ? 'min-h-[250px]' : 'min-h-[300px]';
  
  return (
    <div 
      key={index} 
      className={`testimonial-card reveal-staggered ${heightClass} group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col`}
    >
      <div className="absolute -top-3 -left-1 text-blue-500/20 dark:text-blue-400/20">
        <Quote size={60} strokeWidth={0.5} />
      </div>
    
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
            />
          ))}
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700"></div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-200 mb-6 flex-grow italic relative z-10">"{testimonial.content}"</p>
      
      <div className="relative z-10 mt-auto">
        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
        {(testimonial.company || testimonial.location) && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {testimonial.company || testimonial.location}
          </p>
        )}
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
    </div>
  );
};

export default TestimonialCard; 
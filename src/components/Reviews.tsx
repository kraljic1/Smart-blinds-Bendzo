import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  company?: string;
  location?: string;
  avatar?: string; // Optional avatar URL
}

// Move testimonials array outside the component
const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "The smart blinds have completely transformed our home. The automation is seamless and the energy savings are real!",
    rating: 5,
    location: "New York"
  },
  {
    name: "Michael Chen",
    role: "Tech Enthusiast",
    content: "Integration with my smart home setup was a breeze. The app is intuitive and the blinds work flawlessly.",
    rating: 5,
    location: "San Francisco"
  },
  {
    name: "Emma Davis",
    role: "Interior Designer",
    content: "I recommend these to all my clients. The quality and style options are exceptional.",
    rating: 5,
    company: "Modern Design Co."
  },
  {
    name: "Robert Wilson",
    role: "Smart Home Consultant",
    content: "These are the most reliable smart blinds I've tested. Battery life is excellent and the connection never drops.",
    rating: 5,
    company: "Smart Living Solutions"
  },
  {
    name: "Jennifer Lopez",
    role: "Architect",
    content: "The minimal design and variety of fabrics make these blinds perfect for modern architectural projects.",
    rating: 4,
    company: "Urban Spaces"
  },
  {
    name: "Thomas Brown",
    role: "Homeowner",
    content: "We installed these in our bedroom and the blackout option is incredible. The scheduling feature helps us wake up naturally with the sun.",
    rating: 5,
    location: "Chicago"
  },
  {
    name: "Sophia Martinez",
    role: "Energy Efficiency Consultant",
    content: "My clients have reported up to 15% energy savings after installing these smart blinds. The insulation properties are outstanding.",
    rating: 5,
    company: "GreenHome Consulting"
  },
  {
    name: "David Park",
    role: "Property Manager",
    content: "We've equipped all our luxury rentals with these blinds. Tenants love them and they're extremely low maintenance.",
    rating: 4,
    company: "Elite Properties"
  },
  {
    name: "Laura Schmidt",
    role: "Parent",
    content: "The cordless design makes these blinds so much safer for our kids. The voice control is an added bonus!",
    rating: 5,
    location: "Boston"
  },
  {
    name: "James Wilson",
    role: "Retiree",
    content: "At my age, it's nice to control the blinds without getting up. The remote and app are simple to use, even for someone not tech-savvy.",
    rating: 5,
    location: "Miami"
  },
  {
    name: "Olivia Taylor",
    role: "Homeowner",
    content: "The customer service was exceptional - they helped me measure and choose the perfect blinds for each room. Installation was quick and clean.",
    rating: 5,
    location: "Austin"
  },
  {
    name: "Daniel Garcia",
    role: "Smart Home Enthusiast",
    content: "These blinds work perfectly with my existing smart home system. The API integration is solid and reliable.",
    rating: 4,
    location: "Seattle"
  },
  {
    name: "Natalie Wong",
    role: "Interior Stylist",
    content: "The fabric quality and color accuracy exceeded my expectations. My clients are always impressed with how these elevate their spaces.",
    rating: 5,
    company: "Styled Spaces"
  }
];

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);
  const testimonialsPerView = 6;
  const reviewsRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - testimonialsPerView : prevIndex - testimonialsPerView
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => 
      (prevIndex + testimonialsPerView) >= testimonials.length 
        ? 0 
        : prevIndex + testimonialsPerView
    );
  }, []);

  const goToTestimonial = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Handle automatic rotation
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 8000); // Rotate every 8 seconds

    return () => clearTimeout(timer);
  }, [handleNext, activeIndex]);

  // Update visible testimonials when activeIndex changes
  useEffect(() => {
    const startIdx = activeIndex;
    const visible = [];
    
    for (let i = 0; i < testimonialsPerView; i++) {
      const idx = (startIdx + i) % testimonials.length;
      visible.push(testimonials[idx]);
    }
    
    setVisibleTestimonials(visible);
  }, [activeIndex]);
  
  // Staggered animation on scroll
  useEffect(() => {
    if (!reviewsRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get all testimonial cards inside the container
            const cards = reviewsRef.current?.querySelectorAll('.testimonial-card');
            // Apply staggered animations
            cards?.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible');
              }, 100 * index);
            });
            // Only run once
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(reviewsRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [visibleTestimonials]);

  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-[800px] h-[800px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-1/3 top-1/4 w-[300px] h-[300px] rounded-full bg-yellow-500/5 blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase">Testimonials</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 mt-2">
            Real Experiences. Real Results.
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Join thousands of satisfied customers transforming their homes
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition md:-translate-x-8 border border-gray-200 dark:border-gray-700"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          </button>
          
          {/* Masonry-style grid for testimonials */}
          <div
            ref={reviewsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {visibleTestimonials.map((testimonial, index) => {
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
            })}
          </div>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition md:translate-x-8 border border-gray-200 dark:border-gray-700"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerView) }).map((_, index) => {
            const isActive = Math.floor(activeIndex / testimonialsPerView) === index;
            return (
              <button
                key={index}
                onClick={() => goToTestimonial(index * testimonialsPerView)}
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
      </div>
    </div>
  );
};

export default Reviews;
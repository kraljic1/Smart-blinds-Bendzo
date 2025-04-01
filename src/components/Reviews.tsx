import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  company?: string;
  location?: string;
}

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);
  const testimonialsPerView = 3;

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

  // Handle automatic rotation
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000); // Rotate every 5 seconds

    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Update visible testimonials when activeIndex changes
  useEffect(() => {
    const startIdx = activeIndex;
    
    // Wrap around to beginning if needed
    const visible = [];
    for (let i = 0; i < testimonialsPerView; i++) {
      const idx = (startIdx + i) % testimonials.length;
      visible.push(testimonials[idx]);
    }
    
    setVisibleTestimonials(visible);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200">
            Join thousands of satisfied customers who've transformed their homes
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition md:-translate-x-8"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          </button>
          
          <div className="grid md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-200 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  {(testimonial.company || testimonial.location) && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {testimonial.company || testimonial.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition md:translate-x-8"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-10">
          {testimonials.map((_, index) => {
            // Show dots for number of pages (total / testimonialsPerView)
            if (index % testimonialsPerView === 0) {
              const isActive = Math.floor(activeIndex / testimonialsPerView) === Math.floor(index / testimonialsPerView);
              return (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    isActive 
                      ? 'bg-blue-600 dark:bg-blue-500 w-6' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial group ${Math.floor(index / testimonialsPerView) + 1}`}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
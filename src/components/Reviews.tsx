import React from 'react';
import { Star } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "The smart blinds have completely transformed our home. The automation is seamless and the energy savings are real!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      content: "Integration with my smart home setup was a breeze. The app is intuitive and the blinds work flawlessly.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Interior Designer",
      content: "I recommend these to all my clients. The quality and style options are exceptional.",
      rating: 5
    }
  ];

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

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-200 mb-6">{review.content}</p>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
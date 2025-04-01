import React from 'react';

const SupportPage = () => {
  return (
    <div className="pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Support</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How long does installation take?",
                  a: "Installation typically takes 15-30 minutes per window."
                },
                {
                  q: "What's the battery life?",
                  a: "Our batteries last up to 12 months with normal use."
                },
                {
                  q: "Do you offer warranty?",
                  a: "Yes, we offer a 5-year warranty on all our products."
                }
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
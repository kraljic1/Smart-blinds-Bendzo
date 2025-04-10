const SupportPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-32 light-gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3 light-text-shimmer">Support</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">We're here to help with any questions you may have.</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="relative light-card light-glow dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl light-hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl -z-10"></div>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400">Contact Us</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                <input 
                  type="text" 
                  className="light-input mt-1 block w-full rounded-xl dark:bg-gray-800/70 border dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800/50 text-gray-900 dark:text-gray-100 px-4 py-3 transition-all duration-200 light-focus-ring" 
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input 
                  type="email" 
                  className="light-input mt-1 block w-full rounded-xl dark:bg-gray-800/70 border dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800/50 text-gray-900 dark:text-gray-100 px-4 py-3 transition-all duration-200 light-focus-ring" 
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea 
                  rows={4} 
                  className="light-input mt-1 block w-full rounded-xl dark:bg-gray-800/70 border dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800/50 text-gray-900 dark:text-gray-100 px-4 py-3 transition-all duration-200 light-focus-ring"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="light-button w-full px-6 py-3.5 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="relative light-card light-glow dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl light-hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl -z-10"></div>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400">FAQs</h2>
            <div className="space-y-6">
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
                <div key={index} className="light-glass p-4 rounded-xl border light-border dark:bg-gray-800/50 dark:border-gray-700/30 transition-all duration-300 hover:light-shadow-md dark:hover:bg-gray-800/70">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
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
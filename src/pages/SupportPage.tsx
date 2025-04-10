const SupportPage = () => {
  return (
    <div className="modern-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="modern-page-title">Support</h1>
        <p className="modern-page-subtitle">We're here to help with any questions you may have.</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="modern-card-container">
            <div className="modern-card-bg"></div>
            <h2 className="modern-card-title">Contact Us</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                <input 
                  type="text" 
                  className="modern-input" 
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input 
                  type="email" 
                  className="modern-input" 
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea 
                  rows={4} 
                  className="modern-input"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="modern-button"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="modern-card-container">
            <div className="modern-card-bg"></div>
            <h2 className="modern-card-title">FAQs</h2>
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
                <div key={index} className="modern-item-card">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="modern-info-text">{faq.a}</p>
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
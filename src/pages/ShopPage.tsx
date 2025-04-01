import React from 'react';

const ShopPage = () => {
  const products = [
    {
      name: "Standard Smart Blind",
      price: "$199",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Perfect for standard windows up to 52 inches wide."
    },
    {
      name: "Premium Smart Blind",
      price: "$299",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Enhanced features and premium materials for larger windows."
    },
    {
      name: "Smart Hub",
      price: "$99",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Central control unit for managing multiple smart blinds."
    }
  ];

  return (
    <div className="pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}</p>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
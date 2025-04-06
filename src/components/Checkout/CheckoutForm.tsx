import React, { useState } from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';
import { countryPhoneCodes, CountryCode } from '../../../src/data/phoneCodes';
import './CheckoutForm.css';

export function CheckoutForm() {
  const { items, getTotalPrice, clearBasket } = useBasketContext();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+1', // Default to US
    phoneNumber: '',
    address: '',
    additionalNotes: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null as string | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormStatus({ submitting: true, success: false, error: null });
    
    // Prepare basket items for form submission
    const basketItems = items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      options: item.options
    }));
    
    try {
      // Create the data to send to Netlify Forms
      const formSubmission = {
        'form-name': 'checkout',
        fullName: formData.fullName,
        email: formData.email,
        phone: `${formData.phoneCode}${formData.phoneNumber}`,
        address: formData.address,
        additionalNotes: formData.additionalNotes,
        basketItems: JSON.stringify(basketItems),
        totalPrice: getTotalPrice().toFixed(2)
      };
      
      // Encode data for submission
      const encodedData = Object.keys(formSubmission).map(key => 
        encodeURIComponent(key) + '=' + encodeURIComponent(formSubmission[key as keyof typeof formSubmission])
      ).join('&');
      
      // Submit form to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedData
      });
      
      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      
      // Form submitted successfully
      setFormStatus({ submitting: false, success: true, error: null });
      
      // Clear the basket after successful submission
      clearBasket();
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneCode: '+1',
        phoneNumber: '',
        address: '',
        additionalNotes: ''
      });
      
    } catch (error) {
      console.error('Checkout form submission error:', error);
      setFormStatus({
        submitting: false,
        success: false,
        error: 'There was a problem submitting your order. Please try again.'
      });
    }
  };
  
  if (formStatus.success) {
    return (
      <div className="checkout-success">
        <h2>Thank You for Your Order!</h2>
        <p>We have received your inquiry and will get back to you shortly.</p>
        <p>A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
      </div>
    );
  }
  
  return (
    <div className="checkout-form-container">
      <h2>Checkout</h2>
      
      <form
        name="checkout"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="checkout-form"
      >
        {/* Netlify Forms hidden field */}
        <input type="hidden" name="form-name" value="checkout" />
        <input type="hidden" name="basketItems" value={JSON.stringify(items)} />
        <input type="hidden" name="totalPrice" value={getTotalPrice().toFixed(2)} />
        
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="form-group phone-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className="phone-input-container">
            <select
              id="phoneCode"
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              className="phone-code-select"
            >
              {countryPhoneCodes.map((country: CountryCode) => (
                <option key={country.code} value={country.dial_code}>
                  {country.name} ({country.dial_code})
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="phone-number-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your full address"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows={4}
            placeholder="Any special requests or additional information"
          />
        </div>
        
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {items.map((item, index) => (
              <div key={index} className="checkout-item">
                <div className="checkout-item-name">
                  {item.product.name} × {item.quantity}
                </div>
                <div className="checkout-item-price">
                  €{(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>Total:</span>
            <span>€{getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
        
        {formStatus.error && (
          <div className="checkout-error">{formStatus.error}</div>
        )}
        
        <button 
          type="submit" 
          className="checkout-submit-btn"
          disabled={formStatus.submitting}
        >
          {formStatus.submitting ? 'Processing...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
} 
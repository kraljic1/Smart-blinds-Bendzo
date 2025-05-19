import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useOrderContext } from '../../context/useOrderContext';
import { countryPhoneCodes, CountryCode } from '../../data/phoneCodes';
import { submitOrder, basketItemsToOrderItems } from '../../utils/orderUtils';
import './CheckoutForm.css';

export function CheckoutForm() {
  const { items, getTotalPrice, clearBasket } = useBasketContext();
  const { setLastOrder, loadOrderHistory } = useOrderContext();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  
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
    e.preventDefault(); // Prevent default form submission
    
    // Check if basket is empty
    if (items.length === 0) {
      setFormStatus({
        submitting: false,
        success: false,
        error: "Please add some products to your basket before checking out."
      });
      return;
    }
    
    setFormStatus({ submitting: true, success: false, error: null });
    
    try {
      // Prepare order data
      const orderData = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.phoneCode}${formData.phoneNumber}`,
          address: formData.address
        },
        items: basketItemsToOrderItems(items),
        notes: formData.additionalNotes,
        totalAmount: getTotalPrice()
      };
      
      // Save customer email for future order history lookups
      localStorage.setItem('customerEmail', formData.email);
      
      // Submit order to our serverless function
      const response = await submitOrder(orderData);
      
      if (response.success) {
        // Store the order in context
        setLastOrder(response);
        
        // Load order history for this customer
        await loadOrderHistory(formData.email);
        
        // Clear basket and redirect to thank you page
        clearBasket();
        navigate('/thank-you');
      } else {
        throw new Error(response.message || 'Order submission failed');
      }
    } catch (error) {
      console.error('Checkout form submission error:', error);
      
      const errorMessage = 'There was a problem submitting your order. Please try again or contact support.';
      
      setFormStatus({
        submitting: false,
        success: false,
        error: errorMessage
      });
    }
  };
  
  if (formStatus.success) {
    return (
      <div className="checkout-success" role="alert" aria-live="polite">
        <h2>Thank You for Your Order!</h2>
        <p>We have received your inquiry and will get back to you shortly.</p>
        <p>You should receive a confirmation on <strong>{formData.email}</strong> soon.</p>
      </div>
    );
  }
  
  return (
    <div className="checkout-form-container">
      <h2>Checkout</h2>
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="checkout-form"
        aria-label="Checkout form"
      >
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
            aria-required="true"
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
            aria-required="true"
          />
        </div>
        
        <div className="form-group phone-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className="phone-input-container" role="group" aria-labelledby="phone-label">
            <span id="phone-label" className="sr-only">Phone Number with country code</span>
            <select
              id="phoneCode"
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              className="phone-code-select"
              aria-label="Country code"
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
              aria-required="true"
              pattern="[0-9]+"
              title="Please enter only numbers"
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
            aria-required="true"
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
            aria-label="Additional notes or requests"
          />
        </div>
        
        <div className="checkout-summary" aria-label="Order summary">
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
          <div className="checkout-error" role="alert">
            {formStatus.error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="checkout-submit-btn"
          disabled={formStatus.submitting}
          aria-busy={formStatus.submitting ? "true" : "false"}
        >
          {formStatus.submitting ? (
            <>
              <span className="loading-spinner"></span>
              <span>Processing...</span>
            </>
          ) : 'Submit Order'}
        </button>
      </form>
    </div>
  );
} 
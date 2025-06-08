import React, { useRef } from 'react';
import { useCheckoutForm } from '../../hooks/useCheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';
import CheckoutFormFields from './CheckoutFormFields';
import CheckoutOrderSummary from './CheckoutOrderSummary';
import './CheckoutForm.css';

export function CheckoutForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    formData,
    formStatus,
    items,
    getTotalPrice,
    handleChange,
    setFormStatus,
    prepareFormSubmission,
    handleSubmitSuccess,
    handleSubmitError
  } = useCheckoutForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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
      const formSubmission = prepareFormSubmission();
      console.log('Submitting form data:', formSubmission);
      
      if (formRef.current) {
        formRef.current.submit();
        handleSubmitSuccess();
      }
    } catch (error) {
      handleSubmitError(error);
    }
  };
  
  if (formStatus.success) {
    return <CheckoutSuccess email={formData.email} />;
  }
  
  return (
    <div className="checkout-form-container">
      <h2>Checkout</h2>
      
      <form
        ref={formRef}
        name="checkout"
        method="POST"
        action="https://bendzosmartblinds.netlify.app/"
        data-netlify="true"
        netlify-honeypot="bot-field"
        data-netlify-success="/thank-you"
        onSubmit={handleSubmit}
        className="checkout-form"
        aria-label="Checkout form"
      >
        <input type="hidden" id="form-name" name="form-name" value="checkout" />
        <input type="hidden" id="basketItems" name="basketItems" value={JSON.stringify(
          items.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.calculatedPrice ?? item.product.price,
            options: item.options
          }))
        )} />
        <input type="hidden" id="totalPrice" name="totalPrice" value={getTotalPrice().toFixed(2)} />
        <p hidden>
          <label>
            Don't fill this out if you're human: <input id="bot-field" name="bot-field" />
          </label>
        </p>
        
        <CheckoutFormFields formData={formData} onChange={handleChange} />
        
        <CheckoutOrderSummary items={items} totalPrice={getTotalPrice()} />
        
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
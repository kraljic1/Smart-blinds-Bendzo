import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useCheckoutForm } from './useCheckoutForm';
import { createPaymentIntent } from '../../utils/stripeUtils';
import { getStripe } from '../../config/stripe';
import { FormData } from './CheckoutFormTypes';
import CustomerInfoSection from './CustomerInfoSection';
import PhoneNumberSection from './PhoneNumberSection';
import BillingAddressSection from './BillingAddressSection';
import CompanyInfoSection from './CompanyInfoSection';
import ShippingAddressSection from './ShippingAddressSection';
import PaymentMethodSection from './PaymentMethodSection';
import ShippingMethodSection from './ShippingMethodSection';
import AdditionalNotesSection from './AdditionalNotesSection';
import OrderSummarySection from './OrderSummarySection';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentSuccess } from './PaymentSuccess';
import './CheckoutForm.css';

export function EnhancedCheckoutForm() {
  const { items, getTotalPrice, clearBasket } = useBasketContext();
  const {
    formData,
    formStatus,
    phoneValidation,
    paymentState,
    handleChange,
    setError,
    setSubmitting,
    setPaymentState
  } = useCheckoutForm();

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    paymentIntentId: string;
    orderNumber: string;
    date: string;
    time: string;
    amount: number;
    currency: string;
    customer: {
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    company?: {
      name: string;
      oib: string;
    };
    shipping: {
      method: string;
      address: {
        address: string;
        city: string;
        postalCode: string;
      };
    };
    items: {
      id: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      description: string;
    }[];
    subtotal: number;
    tax: number;
    total: number;
    notes: string;
  } | null>(null);

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    console.log('Payment successful:', paymentIntentId);
    console.log('Current form data:', formData);
    console.log('Total price:', getTotalPrice());
    
    try {
      // Try to call the confirm-payment function first
      console.log('Calling confirm-payment function to save order...');
      
      const confirmPaymentData = {
        paymentIntentId,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.phoneCode}${formData.phoneNumber}`,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          shippingAddress: formData.sameAsBilling ? undefined : formData.shippingAddress,
          shippingCity: formData.sameAsBilling ? undefined : formData.shippingCity,
          shippingPostalCode: formData.sameAsBilling ? undefined : formData.shippingPostalCode,
          shippingMethod: formData.shippingMethod,
          needsR1Invoice: formData.needsR1Invoice,
          companyName: formData.needsR1Invoice ? formData.companyName : undefined,
          companyOib: formData.needsR1Invoice ? formData.companyOib : undefined
        },
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price,
          options: item.options || {}
        })),
        totalAmount: getTotalPrice(),
        notes: formData.additionalNotes || ''
      };
      
      console.log('Confirm payment data:', confirmPaymentData);
      
      let orderSaved = false;
      
      try {
        // First check if the Netlify function is available
        console.log('Checking if confirm-payment function is available...');
        const checkResponse = await fetch('/.netlify/functions/confirm-payment', {
          method: 'HEAD'
        });
        
        if (checkResponse.status === 404) {
          console.log('Netlify function not deployed, using direct Supabase save');
          // Skip to fallback immediately
        } else {
          // Function exists, try to use it
          console.log('Netlify function available, attempting to use it...');
          const confirmResponse = await fetch('/.netlify/functions/confirm-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(confirmPaymentData)
          });
          
          if (confirmResponse.ok) {
            const confirmResult = await confirmResponse.json();
            console.log('Confirm payment result:', confirmResult);
            
            if (confirmResult.success) {
              console.log('Order saved successfully via Netlify function');
              orderSaved = true;
            }
          } else {
            console.warn('Netlify function returned error, falling back to Supabase');
          }
        }
      } catch (netlifyError) {
        console.warn('Netlify function check failed, falling back to direct Supabase save:', netlifyError);
      }
      
      // Fallback to direct Supabase save if Netlify function failed
      if (!orderSaved) {
        console.log('Using direct Supabase client as fallback to save order');
        
        try {
          // Import supabase client
          const { supabase } = await import('../../utils/supabaseClient');
          
          // Generate order ID
          const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          
          // Create order record
          const orderData = {
            order_id: orderId,
            customer_name: formData.fullName,
            customer_email: formData.email,
            customer_phone: `${formData.phoneCode}${formData.phoneNumber}`,
            billing_address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
            shipping_address: formData.sameAsBilling 
              ? `${formData.address}, ${formData.postalCode} ${formData.city}`
              : `${formData.shippingAddress}, ${formData.shippingPostalCode} ${formData.shippingCity}`,
            notes: `${formData.additionalNotes || ''}\n\n[System] Order saved via frontend fallback - Payment ID: ${paymentIntentId}`,
            total_amount: getTotalPrice(),
            payment_method: 'Credit card',
            payment_status: 'paid',
            shipping_method: formData.shippingMethod,
            status: 'received',
            needs_r1_invoice: formData.needsR1Invoice,
            company_name: formData.needsR1Invoice ? formData.companyName : null,
            company_oib: formData.needsR1Invoice ? formData.companyOib : null
          };
          
          console.log('Saving order to Supabase:', orderData);
          
          const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();
          
          if (orderError) {
            console.error('Failed to save order to Supabase:', orderError);
            throw orderError;
          }
          
          console.log('Order saved to Supabase:', order);
          
          // Save order items
          if (order && items.length > 0) {
            const orderItems = items.map(item => ({
              order_id: order.id,
              product_id: item.product.id,
              product_name: item.product.name,
              quantity: item.quantity,
              unit_price: item.product.price,
              subtotal: item.product.price * item.quantity,
              options: item.options || {}
            }));
            
            console.log('Saving order items to Supabase:', orderItems);
            
            const { error: itemsError } = await supabase
              .from('order_items')
              .insert(orderItems);
            
            if (itemsError) {
              console.error('Failed to save order items to Supabase:', itemsError);
              // Don't throw here - order is saved, items can be added manually
            } else {
              console.log('Order items saved to Supabase successfully');
            }
          }
          
          console.log('Order saved successfully via Supabase fallback');
          orderSaved = true;
          
        } catch (supabaseError) {
          console.error('Failed to save order via Supabase fallback:', supabaseError);
        }
      }
      
      if (!orderSaved) {
        console.error('Failed to save order to database via both methods');
        // Still show success to user since payment went through, but log the error
        console.warn('Payment succeeded but order save failed - this needs manual intervention');
      }
      
    } catch (error) {
      console.error('Error in payment success handling:', error);
      // Still show success to user since payment went through
      console.warn('Payment succeeded but order save failed - this needs manual intervention');
    }
    
    // Set comprehensive order details for proper invoice
    const orderData = {
      paymentIntentId,
      orderNumber: paymentIntentId.split('_')[1] || paymentIntentId.substring(3, 15),
      date: new Date().toLocaleDateString('hr-HR'),
      time: new Date().toLocaleTimeString('hr-HR'),
      amount: getTotalPrice(),
      currency: 'EUR',
      customer: {
        name: formData.fullName,
        email: formData.email,
        phone: `${formData.phoneCode}${formData.phoneNumber}`,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: 'Hrvatska'
      },
      company: formData.needsR1Invoice ? {
        name: formData.companyName,
        oib: formData.companyOib
      } : undefined,
      shipping: {
        method: formData.shippingMethod,
        address: formData.sameAsBilling ? {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        } : {
          address: formData.shippingAddress,
          city: formData.shippingCity,
          postalCode: formData.shippingPostalCode
        }
      },
      items: items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity,
        description: item.product.description || ''
      })),
      subtotal: getTotalPrice(),
      tax: getTotalPrice() * 0.25, // 25% PDV
      total: getTotalPrice(),
      notes: formData.additionalNotes || ''
    };
    
    console.log('Setting order details:', orderData);
    setOrderDetails(orderData);
    
    // Hide payment form first
    setPaymentState(prev => ({
      ...prev,
      showStripeForm: false,
      processingPayment: false
    }));
    
    // Show success page after a brief delay to ensure state is updated
    setTimeout(() => {
      console.log('Setting orderComplete to true');
      setOrderComplete(true);
    }, 100);
  };

  const handlePaymentError = (error: string) => {
    console.log('Payment error:', error);
    setError(error);
    
    // Hide payment form on error so user can try again
    setPaymentState(prev => ({
      ...prev,
      showStripeForm: false,
      processingPayment: false
    }));
  };

  const handleContinueShopping = () => {
    // Clear the basket now that the user is done
    clearBasket();
    
    // Reset everything and redirect to home
    setOrderComplete(false);
    setOrderDetails(null);
    setPaymentState({
      clientSecret: '',
      paymentIntentId: '',
      showStripeForm: false,
      processingPayment: false
    });
    
    // Navigate to home page
    window.location.href = '/';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted!');
    console.log('Form data:', formData);
    console.log('Phone validation:', phoneValidation);
    
    // Validate ALL required fields
    const allRequiredFields = [
      { field: 'fullName', message: 'Molimo unesite vaše puno ime' },
      { field: 'email', message: 'Molimo unesite email adresu' },
      { field: 'phoneNumber', message: 'Molimo unesite broj telefona' },
      { field: 'address', message: 'Molimo unesite adresu' },
      { field: 'city', message: 'Molimo unesite grad' },
      { field: 'postalCode', message: 'Molimo unesite poštanski broj' }
    ];

    // Add shipping fields to required if different from billing
    if (!formData.sameAsBilling) {
      allRequiredFields.push(
        { field: 'shippingAddress', message: 'Molimo unesite adresu dostave' },
        { field: 'shippingCity', message: 'Molimo unesite grad dostave' },
        { field: 'shippingPostalCode', message: 'Molimo unesite poštanski broj dostave' }
      );
    }

    // Validate all required fields
    for (const { field, message } of allRequiredFields) {
      const fieldValue = formData[field as keyof FormData];
      if (!fieldValue || !fieldValue.toString().trim()) {
        console.log(`Required field missing: ${field}`);
        setError(message);
        return;
      }
    }

    // Validate company fields if R1 invoice is requested
    if (formData.needsR1Invoice) {
      if (!formData.companyName.trim()) {
        console.log('Company name missing for R1 invoice');
        setError('Molimo unesite naziv tvrtke za R1 račun');
        return;
      }
      if (!formData.companyOib.trim()) {
        console.log('Company OIB missing for R1 invoice');
        setError('Molimo unesite OIB tvrtke za R1 račun');
        return;
      }
    }
    
    if (!phoneValidation.isValid) {
      console.log('Phone validation failed:', phoneValidation);
      setError('Molimo unesite važeći broj telefona');
      return;
    }

    try {
      console.log('Starting payment intent creation...');
      setSubmitting(true);
      
      const paymentIntentData = {
        amount: getTotalPrice(),
        currency: 'eur',
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.phoneCode}${formData.phoneNumber}`,
          address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
          shippingAddress: formData.sameAsBilling 
            ? `${formData.address}, ${formData.postalCode} ${formData.city}`
            : `${formData.shippingAddress}, ${formData.shippingPostalCode} ${formData.shippingCity}`,
          needsR1Invoice: formData.needsR1Invoice,
          companyName: formData.needsR1Invoice ? formData.companyName : undefined,
          companyOib: formData.needsR1Invoice ? formData.companyOib : undefined
        },
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          options: {}
        })),
        metadata: {
          shippingMethod: formData.shippingMethod,
          additionalNotes: formData.additionalNotes || ''
        }
      };

      console.log('Payment intent data:', paymentIntentData);
      const paymentData = await createPaymentIntent(paymentIntentData);
      console.log('Payment response:', paymentData);

      if (paymentData.success && paymentData.clientSecret && paymentData.paymentIntentId) {
        setPaymentState({
          clientSecret: paymentData.clientSecret,
          paymentIntentId: paymentData.paymentIntentId,
          showStripeForm: true,
          processingPayment: false
        });
      } else {
        setError(paymentData.error || 'Neuspješno pokretanje plaćanja. Molimo pokušajte ponovno.');
      }
    } catch (error) {
      console.error('Payment setup error:', error);
      console.log('Error details:', error);
      setError('Neuspješno pokretanje plaćanja. Molimo pokušajte ponovno.');
    } finally {
      console.log('Setting submitting to false');
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-form-container">
      <div className="enhanced-checkout-form">
        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
          <div className="form-section">
            <CustomerInfoSection 
              formData={formData} 
              handleChange={handleChange} 
            />
          </div>
          
          <div className="form-section">
            <PhoneNumberSection 
              formData={formData} 
              phoneValidation={phoneValidation}
              handleChange={handleChange} 
            />
          </div>
          
          <BillingAddressSection 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <div className="form-section">
            <CompanyInfoSection 
              formData={formData} 
              handleChange={handleChange} 
            />
          </div>
          
          <ShippingAddressSection 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <div className="form-section">
            <PaymentMethodSection />
          </div>
          
          <div className="form-section">
            <ShippingMethodSection 
              formData={formData} 
              handleChange={handleChange} 
            />
          </div>
          
          <div className="form-section">
            <AdditionalNotesSection 
              formData={formData} 
              handleChange={handleChange} 
            />
          </div>
          
          {formStatus.error && (
            <div className="checkout-error" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {formStatus.error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="checkout-submit-btn"
            disabled={formStatus.submitting}
            aria-busy={formStatus.submitting ? "true" : "false"}
            onClick={() => {
              console.log('Button clicked!');
              console.log('Form status:', formStatus);
              console.log('Phone validation:', phoneValidation);
            }}
          >
            {formStatus.submitting ? (
              <>
                <span className="loading-spinner"></span>
                <span>Obrađuje se...</span>
              </>
            ) : (
              <>
                <span>Nastavi na plaćanje</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>
        
        <OrderSummarySection />
      </div>
      
      {paymentState.showStripeForm && (
        <Elements stripe={getStripe()}>
          <StripePaymentForm 
            amount={getTotalPrice()}
            currency="EUR"
            clientSecret={paymentState.clientSecret}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </Elements>
      )}
      
      {orderComplete && orderDetails && (
        <PaymentSuccess 
          orderDetails={orderDetails}
          onContinueShopping={handleContinueShopping}
        />
      )}
    </div>
  );
} 
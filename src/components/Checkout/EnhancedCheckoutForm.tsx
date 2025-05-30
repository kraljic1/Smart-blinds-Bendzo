import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useCheckoutForm } from './useCheckoutForm';
import { createPaymentIntent } from '../../utils/stripeUtils';
import { getStripe } from '../../config/stripe';
import { supabase } from '../../utils/supabaseClient';
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
import { safeLog, sanitizeErrorMessage } from '../../utils/errorHandler';

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

  // Calculate shipping cost (fixed for now, can be made dynamic later)
  const getShippingCost = () => {
    return 0; // Free shipping for now
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    let orderId = '';
    
    try {
      safeLog.info('Payment successful');
      
      const confirmPaymentData = {
        paymentIntentId,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.phoneCode}${formData.phoneNumber}`,
          address: formData.address,
          shippingAddress: formData.shippingAddress || formData.address,
          paymentMethod: 'Credit/Debit Card',
          shippingMethod: formData.shippingMethod,
          needsR1Invoice: formData.needsR1Invoice,
          companyName: formData.companyName,
          companyOib: formData.companyOib
        },
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          options: item.options
        })),
        notes: formData.additionalNotes,
        totalAmount: getTotalPrice(),
        taxAmount: 0,
        shippingCost: getShippingCost()
      };

      safeLog.info('Calling confirm-payment function to save order...');

      // Try to use Netlify function first, fallback to direct Supabase if needed
      let orderSaved = false;

      try {
        safeLog.info('Checking if confirm-payment function is available...');
        
        // Test if the Netlify function is available
        const testResponse = await fetch('/.netlify/functions/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: true })
        });

        if (testResponse.status === 404) {
          safeLog.info('Netlify function not deployed, using direct Supabase save');
          throw new Error('Function not available');
        } else {
          safeLog.info('Netlify function available, attempting to use it...');
          
          // Use the Netlify function
          const confirmResult = await fetch('/.netlify/functions/confirm-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(confirmPaymentData)
          });

          if (confirmResult.ok) {
            const result = await confirmResult.json();
            safeLog.info('Confirm payment result received');
            
            if (result.success) {
              safeLog.info('Order saved successfully via Netlify function');
              orderId = result.orderId;
              orderSaved = true;
            } else {
              safeLog.warn('Netlify function returned error, falling back to Supabase');
              throw new Error('Netlify function failed');
            }
          } else {
            safeLog.info('Netlify function check returned unexpected status, falling back to Supabase');
            throw new Error('Netlify function failed');
          }
        }
      } catch {
        safeLog.warn('Netlify function check failed, falling back to direct Supabase save');
        
        // Fallback to direct Supabase save
        try {
          safeLog.info('Using direct Supabase client as fallback to save order');
          
          // Generate order ID
          orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          
          // Create order data
          const orderData = {
            order_id: orderId,
            customer_name: formData.fullName,
            customer_email: formData.email,
            customer_phone: `${formData.phoneCode}${formData.phoneNumber}`,
            billing_address: formData.address,
            shipping_address: formData.shippingAddress || formData.address,
            notes: formData.additionalNotes,
            total_amount: getTotalPrice(),
            tax_amount: 0,
            shipping_cost: getShippingCost(),
            payment_method: 'Credit/Debit Card',
            payment_status: 'completed',
            shipping_method: formData.shippingMethod,
            status: 'received',
            stripe_payment_intent_id: paymentIntentId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            company_name: formData.companyName || null,
            company_oib: formData.companyOib || null,
            needs_r1_invoice: formData.needsR1Invoice
          };

          safeLog.info('Saving order to Supabase');
          
          // Insert order
          const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([orderData])
            .select();

          if (orderError) {
            safeLog.error('Failed to save order to Supabase', orderError);
            throw orderError;
          }

          safeLog.info('Order saved to Supabase');

          // Insert order items
          const orderItems = items.map(item => ({
            order_id: order[0].id,
            product_id: item.product.id,
            product_name: item.product.name,
            product_image: item.product.image,
            quantity: item.quantity,
            unit_price: item.product.price,
            subtotal: item.product.price * item.quantity,
            options: item.options
          }));

          safeLog.info('Saving order items to Supabase');
          
          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

          if (itemsError) {
            safeLog.error('Failed to save order items to Supabase', itemsError);
            throw itemsError;
          }

          safeLog.info('Order items saved to Supabase successfully');
          orderSaved = true;

          safeLog.info('Order saved successfully via Supabase fallback');

        } catch (supabaseError) {
          safeLog.error('Failed to save order via Supabase fallback', supabaseError);
          throw supabaseError;
        }
      }

      if (!orderSaved) {
        safeLog.error('Failed to save order to database via both methods');
        
        safeLog.warn('Payment succeeded but order save failed - this needs manual intervention');
        throw new Error('Order save failed');
      }

    } catch (error) {
      safeLog.error('Error in payment success handling', error);
      
      safeLog.warn('Payment succeeded but order save failed - this needs manual intervention');
    }

    // Set order details for thank you page
    const orderData = {
      paymentIntentId,
      orderNumber: orderId.split('-')[1] || orderId.substring(3, 15),
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

    safeLog.info('Setting order details');
    setOrderDetails(orderData);
    
    // Clear basket
    clearBasket();
    
    // Mark order as complete
    safeLog.info('Setting orderComplete to true');
    setOrderComplete(true);
  };

  const handlePaymentError = (error: unknown) => {
    safeLog.error('Payment error', error);
    setError(sanitizeErrorMessage(error, 'payment'));
    setSubmitting(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    safeLog.info('Form submitted!');
    
    // Validate required fields
    const requiredFields = [
      'fullName', 'email', 'phoneNumber', 'address', 'city', 'postalCode', 'shippingMethod'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        const message = `Molimo unesite ${field === 'fullName' ? 'ime i prezime' : 
                                        field === 'email' ? 'email adresu' :
                                        field === 'phoneNumber' ? 'broj telefona' :
                                        field === 'address' ? 'adresu' :
                                        field === 'city' ? 'grad' :
                                        field === 'postalCode' ? 'poštanski broj' :
                                        field === 'shippingMethod' ? 'način dostave' : field}`;
        safeLog.info(`Required field missing: ${field}`);
        setError(message);
        return;
      }
    }

    // Validate company fields for R1 invoice
    if (formData.needsR1Invoice) {
      if (!formData.companyName) {
        safeLog.info('Company name missing for R1 invoice');
        setError('Molimo unesite naziv tvrtke za R1 račun');
        return;
      }
      
      if (!formData.companyOib) {
        safeLog.info('Company OIB missing for R1 invoice');
        setError('Molimo unesite OIB tvrtke za R1 račun');
        return;
      }
    }

    // Validate phone number
    if (!phoneValidation.isValid) {
      safeLog.info('Phone validation failed');
      setError('Molimo unesite ispravan broj telefona');
      return;
    }

    setSubmitting(true);
    setError('');

    safeLog.info('Starting payment intent creation...');

    try {
      // Create payment intent
      const paymentIntentData = {
        amount: getTotalPrice(),
        currency: 'eur',
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.phoneCode}${formData.phoneNumber}`,
          address: formData.address,
          shippingAddress: formData.shippingAddress || formData.address,
          needsR1Invoice: formData.needsR1Invoice,
          companyName: formData.companyName,
          companyOib: formData.companyOib
        },
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          options: item.options
        })),
        metadata: {
          shippingMethod: formData.shippingMethod,
          notes: formData.additionalNotes || ''
        }
      };

      safeLog.info('Payment intent data prepared');

      const paymentData = await createPaymentIntent(paymentIntentData);
      safeLog.info('Payment response received');

      if (!paymentData.success || !paymentData.clientSecret) {
        throw new Error(paymentData.error || 'Failed to create payment intent');
      }

      // Set client secret for Stripe payment
      setPaymentState({
        clientSecret: paymentData.clientSecret,
        paymentIntentId: paymentData.paymentIntentId || '',
        showStripeForm: true,
        processingPayment: false
      });

    } catch (error) {
      safeLog.error('Payment setup error', error);
      setError(sanitizeErrorMessage(error, 'payment'));
    }

    safeLog.info('Setting submitting to false');
    setSubmitting(false);
  };

  const handlePaymentButtonClick = () => {
    safeLog.info('Button clicked!');
    
    if (!paymentState.showStripeForm) {
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
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
            onClick={handlePaymentButtonClick}
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
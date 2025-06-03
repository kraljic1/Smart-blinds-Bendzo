import { useBasketContext } from '../../../hooks/useBasketContext';
import { createPaymentIntent } from '../../../utils/stripeUtils';
import { safeLog, sanitizeErrorMessage } from '../../../utils/errorHandler';
import { FormData, PhoneValidation, PaymentState } from '../CheckoutFormTypes';

export const useFormSubmission = (
  formData: FormData,
  phoneValidation: PhoneValidation,
  setError: (error: string) => void,
  setSubmitting: (submitting: boolean) => void,
  setPaymentState: (state: PaymentState) => void
) => {
  const { items, getTotalPrice } = useBasketContext();

  const validateRequiredFields = (): boolean => {
    console.log('[CHECKOUT] Validating required fields...');
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
        return false;
      }
    }

    // Validate company fields for R1 invoice
    if (formData.needsR1Invoice) {
      if (!formData.companyName) {
        safeLog.info('Company name missing for R1 invoice');
        setError('Molimo unesite naziv tvrtke za R1 račun');
        return false;
      }
      
      if (!formData.companyOib) {
        safeLog.info('Company OIB missing for R1 invoice');
        setError('Molimo unesite OIB tvrtke za R1 račun');
        return false;
      }
    }

    // Validate phone number
    if (!phoneValidation.isValid) {
      safeLog.info('Phone validation failed');
      setError('Molimo unesite ispravan broj telefona');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('[CHECKOUT] handleSubmit called');
    e.preventDefault();
    
    console.log('[CHECKOUT] Form submitted!');
    safeLog.info('Form submitted!');
    
    if (!validateRequiredFields()) {
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

  const handlePaymentButtonClick = (paymentState: PaymentState) => {
    console.log('[CHECKOUT] Payment button clicked!');
    console.log('[CHECKOUT] Current payment state:', paymentState);
    safeLog.info('Button clicked!');
    
    if (!paymentState.showStripeForm) {
      console.log('[CHECKOUT] Stripe form not shown, calling handleSubmit');
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
    } else {
      console.log('[CHECKOUT] Stripe form already shown');
    }
  };

  return {
    handleSubmit,
    handlePaymentButtonClick,
    validateRequiredFields
  };
}; 
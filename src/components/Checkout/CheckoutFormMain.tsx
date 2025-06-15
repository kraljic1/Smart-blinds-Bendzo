import { useCheckoutState } from './hooks/useCheckoutState';
import CheckoutFormFields from './components/CheckoutFormFields';
import { FormErrorDisplay, CheckoutSubmitButton } from './components';
import PaymentProcessingSection from './components/PaymentProcessingSection';
import OrderSummarySection from './OrderSummarySection';
import './Checkout.css';

export function CheckoutFormMain() {
 console.log('[CHECKOUT] CheckoutFormMain component mounted');
 
 const {
 formData,
 formStatus,
 phoneValidation,
 handleChange,
 handleSubmit,
 stripePaymentState,
 handlingState,
 calculateTotalWithShipping,
 handlePaymentButtonClickWrapper,
 handlePaymentSuccess,
 handlePaymentError,
 handleClosePayment,
 setBrowserInfo,
 handleContinueShopping
 } = useCheckoutState();

 return (
 <div className="checkout-form-container">
 <div className="enhanced-checkout-form">
 <form onSubmit={handleSubmit} className="checkout-form"noValidate>
 <CheckoutFormFields
 formData={formData}
 phoneValidation={phoneValidation}
 handleChange={handleChange}
 />
 
 <FormErrorDisplay formStatus={formStatus} />
 
 <CheckoutSubmitButton
 formStatus={formStatus}
 isFormValid={() => !formStatus.error}
 handlePaymentButtonClick={handlePaymentButtonClickWrapper}
 />
 </form>
 
 <OrderSummarySection shippingMethod={formData.shippingMethod} />
 </div>
 
 <PaymentProcessingSection
 stripePaymentState={stripePaymentState}
 totalAmount={calculateTotalWithShipping()}
 handlingState={handlingState}
 onPaymentSuccess={handlePaymentSuccess}
 onPaymentError={handlePaymentError}
 onClosePayment={handleClosePayment}
 onBrowserDetected={setBrowserInfo}
 onContinueShopping={handleContinueShopping}
 />
 </div>
 );
} 
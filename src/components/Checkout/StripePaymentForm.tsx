import './StripePaymentForm.css';
import { useStripePayment } from './hooks/useStripePayment';
import { useModalBehavior } from './hooks/useModalBehavior';
import { PaymentHeader } from './components/PaymentHeader';
import { CardInput } from './components/CardInput';
import { PaymentButton } from './components/PaymentButton';
import { StripePaymentFormProps } from './types/stripeTypes';

export function StripePaymentForm({ 
  amount, 
  currency, 
  clientSecret,
  onPaymentSuccess, 
  onPaymentError, 
  onClose,
  disabled = false 
}: StripePaymentFormProps) {
  const {
    isProcessing,
    cardError,
    handleCardChange,
    handleSubmit,
    canSubmit
  } = useStripePayment({
    clientSecret,
    onPaymentSuccess,
    onPaymentError,
    disabled
  });

  const { handleOverlayClick, handleCloseClick } = useModalBehavior({ onClose });

  return (
    <div className="stripe-payment-form-overlay" onClick={handleOverlayClick}>
      <div className="stripe-payment-form-container">
        <form onSubmit={handleSubmit} className="stripe-payment-form">
          <PaymentHeader
            amount={amount}
            currency={currency}
            onClose={onClose}
            onCloseClick={handleCloseClick}
          />
          
          <CardInput
            cardError={cardError}
            onCardChange={handleCardChange}
          />

          <PaymentButton
            amount={amount}
            currency={currency}
            isProcessing={isProcessing}
            canSubmit={canSubmit}
          />
        </form>
      </div>
    </div>
  );
} 
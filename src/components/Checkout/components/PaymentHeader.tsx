interface PaymentHeaderProps {
  amount: number;
  currency: string;
  onClose?: () => void;
  onCloseClick: () => void;
}

export function PaymentHeader({ amount, currency, onClose, onCloseClick }: PaymentHeaderProps) {
  return (
    <div className="payment-header">
      <div className="payment-header-top">
        <h2>Završi plaćanje</h2>
        {onClose && (
          <button 
            type="button" 
            onClick={onCloseClick}
            className="close-button"
            aria-label="Zatvori"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      <div className="payment-amount">
        <span>Ukupno: {amount.toFixed(2)} {currency.toUpperCase()}</span>
      </div>
    </div>
  );
} 
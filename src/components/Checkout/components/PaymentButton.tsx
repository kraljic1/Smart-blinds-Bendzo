interface PaymentButtonProps {
  amount: number;
  currency: string;
  isProcessing: boolean;
  canSubmit: boolean;
}

export function PaymentButton({ amount, currency, isProcessing, canSubmit }: PaymentButtonProps) {
  return (
    <div className="payment-actions">
      <button
        type="submit"
        disabled={!canSubmit}
        className={`payment-submit-button ${isProcessing ? 'processing' : ''}`}
      >
        {isProcessing ? (
          <>
            <span className="loading-spinner"></span>
            Obrađujem plaćanje...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            Plati {amount.toFixed(2)} {currency.toUpperCase()}
          </>
        )}
      </button>
    </div>
  );
} 
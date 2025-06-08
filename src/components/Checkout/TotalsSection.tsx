import React from 'react';

interface TotalsSectionProps {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: string;
}

const TotalsSection: React.FC<TotalsSectionProps> = ({
  subtotal,
  shippingCost,
  tax,
  total,
  currency
}) => {
  return (
    <div className="totals-section">
      <div className="totals-table">
        <div className="total-row">
          <span>Neto iznos:</span>
          <span>{(subtotal - tax).toFixed(2)} {currency}</span>
        </div>
        {shippingCost > 0 && (
          <div className="total-row">
            <span>Dostava:</span>
            <span>{shippingCost.toFixed(2)} {currency}</span>
          </div>
        )}
        <div className="total-row">
          <span>PDV (25%):</span>
          <span>{tax.toFixed(2)} {currency}</span>
        </div>
        <div className="total-row total-final">
          <span><strong>UKUPNO:</strong></span>
          <span><strong>{total.toFixed(2)} {currency}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default TotalsSection; 
import React from 'react';
import CheckoutFormFields from '../../CheckoutFormFields';
import CheckoutOrderSummary from '../../CheckoutOrderSummary';
import { BasketItem } from '../../../../hooks/useBasket';
import { FormData, FormStatus } from '../../CheckoutFormTypes';

interface CheckoutFormContentProps {
 formData: FormData;
 formStatus: FormStatus;
 items: BasketItem[];
 getTotalPrice: () => number;
 handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CheckoutFormContent = ({
 formData,
 formStatus,
 items,
 getTotalPrice,
 handleChange
}: CheckoutFormContentProps) => {
 return (
 <>
 <CheckoutFormFields formData={formData} onChange={handleChange} />
 
 <CheckoutOrderSummary items={items} totalPrice={getTotalPrice()} />
 
 {formStatus.error && (
 <div className="checkout-error"role="alert">
 {formStatus.error}
 </div>
 )}
 
 <button 
 type="submit"
 className="checkout-submit-btn"
 disabled={formStatus.submitting}
 aria-busy={formStatus.submitting ?"true":"false"}
 >
 {formStatus.submitting ? (
 <>
 <span className="loading-spinner"></span>
 <span>Processing...</span>
 </>
 ) : 'Submit Order'}
 </button>
 </>
 );
};

export default CheckoutFormContent; 
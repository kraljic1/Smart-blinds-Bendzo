import React from 'react';
import { BasketItem } from '../../../../hooks/useBasket';

interface CheckoutFormWrapperProps {
 formRef: React.RefObject<HTMLFormElement | null>;
 items: BasketItem[];
 getTotalPrice: () => number;
 onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
 children: React.ReactNode;
}

const CheckoutFormWrapper = ({
 formRef,
 items,
 getTotalPrice,
 onSubmit,
 children
}: CheckoutFormWrapperProps) => {
 return (
 <form
 ref={formRef}
 name="checkout"
 method="POST"
 action="https://bendzosmartblinds.netlify.app/"
 data-netlify="true"
 netlify-honeypot="bot-field"
 data-netlify-success="/thank-you"
 onSubmit={onSubmit}
 className="checkout-form"
 aria-label="Checkout form"
 >
 <input type="hidden"id="form-name"name="form-name"value="checkout"/>
 <input type="hidden"id="basketItems"name="basketItems"value={JSON.stringify(
 items.map(item => ({
 productId: item.product.id,
 productName: item.product.name,
 quantity: item.quantity,
 price: item.calculatedPrice ?? item.product.price,
 options: item.options || {}
 }))
 )} />
 <input type="hidden"id="totalPrice"name="totalPrice"value={getTotalPrice().toFixed(2)} />
 <p hidden>
 <label>
 Don't fill this out if you're human: <input id="bot-field"name="bot-field"/>
 </label>
 </p>
 
 {children}
 </form>
 );
};

export default CheckoutFormWrapper; 
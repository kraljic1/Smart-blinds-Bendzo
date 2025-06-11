import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { CARD_ELEMENT_OPTIONS } from '../utils/stripeConfig';

interface CardInputProps {
 cardError: string | null;
 onCardChange: (event: StripeCardElementChangeEvent) => void;
}

export function CardInput({ cardError, onCardChange }: CardInputProps) {
 return (
 <div className="card-element-container">
 <label htmlFor="card-element">
 Podaci o kartici
 </label>
 <div id="card-element">
 <CardElement
 options={CARD_ELEMENT_OPTIONS}
 onChange={onCardChange}
 />
 </div>
 
 {cardError && (
 <div className="card-error"role="alert">
 {cardError}
 </div>
 )}
 </div>
 );
} 
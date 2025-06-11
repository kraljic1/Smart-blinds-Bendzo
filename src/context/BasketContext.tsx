import { ReactNode } from 'react';
import { useBasket } from '../hooks/useBasket';
import { BasketContext } from './basketContextDefinitions';

export function BasketProvider({ children }: { children: ReactNode }) {
 const basket = useBasket();

 return (
 <BasketContext.Provider value={basket}>
 {children}
 </BasketContext.Provider>
 );
} 
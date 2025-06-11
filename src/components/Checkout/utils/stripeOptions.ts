interface StripeOptionsConfig {
 amount: number;
 currency: string;
}

export const createStripeOptions = ({ amount, currency }: StripeOptionsConfig) => {
 return {
 mode: 'payment' as const,
 amount: Math.round(amount * 100), // Convert to cents
 currency: currency.toLowerCase(),
 appearance: {
 theme: 'stripe' as const,
 variables: {
 colorPrimary: '#4f46e5',
 colorBackground: '#ffffff',
 colorText: '#333333',
 colorDanger: '#dc2626',
 fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
 spacingUnit: '4px',
 borderRadius: '6px',
 },
 },
 };
}; 
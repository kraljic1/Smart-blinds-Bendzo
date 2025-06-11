export interface TestResult {
 test: string;
 success: boolean;
 error?: string;
 data?: unknown;
}

export interface PaymentTestData {
 amount: number;
 currency: string;
 customer: {
 fullName: string;
 email: string;
 phone: string;
 address: string;
 shippingAddress: string;
 paymentMethod?: string;
 shippingMethod?: string;
 };
 items: Array<{
 productId: string;
 productName: string;
 quantity: number;
 price: number;
 }>;
 metadata?: {
 shippingMethod: string;
 notes: string;
 };
 notes?: string;
 totalAmount?: number;
 taxAmount?: number;
 shippingCost?: number;
}

export interface ConfirmPaymentData extends PaymentTestData {
 paymentIntentId: string;
} 
export interface FormData {
 fullName: string;
 email: string;
 phoneCode: string;
 phoneNumber: string;
 address: string;
 city: string;
 postalCode: string;
 shippingAddress: string;
 shippingCity: string;
 shippingPostalCode: string;
 sameAsBilling: boolean;
 paymentMethod: string;
 shippingMethod: string;
 additionalNotes: string;
 needsR1Invoice: boolean;
 companyName: string;
 companyOib: string;
 [key: string]: unknown;
}

export interface FormStatus {
 submitting: boolean;
 success: boolean;
 error: string | null;
}

export interface PhoneValidation {
 isValid: boolean;
 errorMessage: string;
 suggestion: string;
}

export interface PaymentState {
 clientSecret: string;
 paymentIntentId: string;
 showStripeForm: boolean;
 processingPayment: boolean;
}

export interface CheckoutFormProps {
 formData: FormData;
 formStatus: FormStatus;
 phoneValidation: PhoneValidation;
 handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
 handleBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
 getFieldError?: (fieldName: string) => string | null;
 getFieldWarning?: (fieldName: string) => string | null;
 hasFieldError?: (fieldName: string) => boolean;
} 
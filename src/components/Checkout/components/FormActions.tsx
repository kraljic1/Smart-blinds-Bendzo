import React from 'react';
import FormErrorDisplay from './FormErrorDisplay';
import CheckoutSubmitButton from './CheckoutSubmitButton';
import { FormStatus } from '../CheckoutFormTypes';

interface FormActionsProps {
 formStatus: FormStatus;
 isFormValid: () => boolean;
 handlePaymentButtonClick: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
 formStatus,
 isFormValid,
 handlePaymentButtonClick
}) => {
 return (
 <>
 <FormErrorDisplay formStatus={formStatus} />
 
 <CheckoutSubmitButton
 formStatus={formStatus}
 isFormValid={isFormValid}
 handlePaymentButtonClick={handlePaymentButtonClick}
 />
 </>
 );
};

export default FormActions; 
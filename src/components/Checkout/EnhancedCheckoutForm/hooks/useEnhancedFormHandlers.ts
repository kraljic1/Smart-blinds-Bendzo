import { useCallback } from 'react';
import { PaymentState } from '../../CheckoutFormTypes';

interface UseEnhancedFormHandlersProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFieldChange: (name: string, value: string | boolean | number) => void;
  handleFieldBlur: (name: string, value: string | boolean | number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePaymentButtonClick: (paymentState: PaymentState) => void;
  isFormValid: () => boolean;
  setError: (error: string) => void;
}

export const useEnhancedFormHandlers = ({
  handleChange,
  handleFieldChange,
  handleFieldBlur,
  handleSubmit,
  handlePaymentButtonClick,
  isFormValid,
  setError
}: UseEnhancedFormHandlersProps) => {
  
  const handleEnhancedChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    handleChange(e);
    handleFieldChange(name, fieldValue);
  }, [handleChange, handleFieldChange]);

  const handleEnhancedBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleFieldBlur(name, value);
  }, [handleFieldBlur]);

  const handleEnhancedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setError('Molimo ispravite greške u formi prije slanja.');
      return;
    }
    
    handleSubmit(e);
  };

  const handlePaymentButtonClickWrapper = (paymentState: PaymentState) => {
    if (!isFormValid()) {
      setError('Molimo ispravite greške u formi prije nastavka na plaćanje.');
      return;
    }
    
    handlePaymentButtonClick(paymentState);
  };

  return {
    handleEnhancedChange,
    handleEnhancedBlur,
    handleEnhancedSubmit,
    handlePaymentButtonClickWrapper
  };
}; 
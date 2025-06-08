import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from './useBasketContext';

interface FormData {
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  address: string;
  additionalNotes: string;
}

interface FormStatus {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

export const useCheckoutForm = () => {
  const { items, getTotalPrice, clearBasket } = useBasketContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneCode: '+1',
    phoneNumber: '',
    address: '',
    additionalNotes: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const prepareFormSubmission = () => {
    const basketItems = items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.calculatedPrice ?? item.product.price,
      options: item.options
    }));

    return {
      'form-name': 'checkout',
      fullName: formData.fullName,
      email: formData.email,
      phone: `${formData.phoneCode}${formData.phoneNumber}`,
      address: formData.address,
      additionalNotes: formData.additionalNotes,
      basketItems: JSON.stringify(basketItems),
      totalPrice: getTotalPrice().toFixed(2)
    };
  };

  const handleSubmitSuccess = () => {
    setTimeout(() => {
      clearBasket();
      navigate('/thank-you');
    }, 500);
  };

  const handleSubmitError = (error: unknown) => {
    console.error('Checkout form submission error:', error);
    
    const errorMessage = 'There was a problem submitting your order. Please try again or contact support.';
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    
    setFormStatus({
      submitting: false,
      success: false,
      error: errorMessage
    });
  };

  return {
    formData,
    formStatus,
    items,
    getTotalPrice,
    handleChange,
    setFormStatus,
    prepareFormSubmission,
    handleSubmitSuccess,
    handleSubmitError
  };
}; 
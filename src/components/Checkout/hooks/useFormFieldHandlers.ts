import React from 'react';

interface UseFormFieldHandlersProps {
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 validateOnChange: boolean;
 handleTouch: () => void;
 handleBlur: () => void;
}

export const useFormFieldHandlers = ({
 onChange,
 validateOnChange,
 handleTouch,
 handleBlur
}: UseFormFieldHandlersProps) => {
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 onChange(e);
 if (validateOnChange) {
 handleTouch();
 }
 };

 const handleFieldBlur = () => {
 handleBlur();
 };

 return {
 handleChange,
 handleFieldBlur
 };
}; 
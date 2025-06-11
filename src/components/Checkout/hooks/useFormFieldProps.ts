import React from 'react';

interface UseFormFieldPropsParams {
 type: string;
 id: string;
 name: string;
 value: string;
 handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 handleFieldBlur: () => void;
 required?: boolean;
 placeholder?: string;
 autoComplete?: string;
 pattern?: string;
 title?: string;
}

export const useFormFieldProps = ({
 type,
 id,
 name,
 value,
 handleChange,
 handleFieldBlur,
 required,
 placeholder,
 autoComplete,
 pattern,
 title
}: UseFormFieldPropsParams) => {
 return {
 type,
 id,
 name,
 value,
 onChange: handleChange,
 onBlur: handleFieldBlur,
 required,
 placeholder,
 autoComplete,
 pattern,
 title
 };
}; 
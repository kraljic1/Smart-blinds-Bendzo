import React from 'react';
import { ProcessedValidationState } from './hooks/useValidationState';

interface InputFieldProps {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required: boolean;
  className: string;
  as: 'input' | 'textarea' | 'select';
  rows?: number;
  pattern?: string;
  title?: string;
  autoComplete?: string;
  disabled: boolean;
  validationState: ProcessedValidationState;
  children?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  className,
  as,
  rows,
  pattern,
  title,
  autoComplete,
  disabled,
  validationState,
  children
}) => {
  // Enhanced change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e);
  };

  // Enhanced blur handler
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onBlur?.(e);
  };

  // Build field class name
  const fieldClassName = `
    validated-input
    ${validationState.fieldStateClass}
    ${className}
  `.trim();

  // Common input props
  const commonProps = {
    id: name,
    name,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    required,
    className: fieldClassName,
    placeholder,
    pattern,
    title,
    autoComplete,
    disabled,
    'aria-invalid': validationState.hasError,
    'aria-describedby': validationState.hasError 
      ? `${name}-error` 
      : validationState.hasWarning 
        ? `${name}-warning` 
        : undefined
  };

  // Render input based on type
  switch (as) {
    case 'textarea':
      return <textarea {...commonProps} rows={rows} />;
    case 'select':
      return <select {...commonProps}>{children}</select>;
    default:
      return <input {...commonProps} type={type} />;
  }
}; 
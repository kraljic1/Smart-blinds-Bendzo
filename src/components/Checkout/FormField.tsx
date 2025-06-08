import React from 'react';
import { useFormFieldValidation } from '../../hooks/useFormFieldValidation';
import FormFieldError from './FormFieldError';

interface FormFieldProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  pattern?: string;
  title?: string;
  label: string;
  icon?: React.ReactNode;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  externalError?: string | null;
  externalWarning?: string | null;
  showValidation?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  type,
  id,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  autoComplete,
  pattern,
  title,
  label,
  icon,
  validateOnChange = true,
  validateOnBlur = true,
  externalError,
  externalWarning,
  showValidation = true
}) => {
  const {
    touched,
    internalError,
    handleBlur,
    handleTouch
  } = useFormFieldValidation(
    name,
    value,
    label,
    required,
    validateOnChange,
    validateOnBlur
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (validateOnChange) {
      handleTouch();
    }
  };

  const handleFieldBlur = () => {
    handleBlur();
  };

  // Determine which error to show (external takes precedence)
  const displayError = showValidation ? (externalError || (touched ? internalError : '')) : '';
  const displayWarning = showValidation ? externalWarning : '';
  const hasError = !!displayError;
  const hasWarning = !!displayWarning && !hasError;

  const fieldClassName = `
    form-field-input
    ${hasError ? 'error' : ''}
    ${hasWarning ? 'warning' : ''}
  `.trim();

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleFieldBlur}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          pattern={pattern}
          title={title}
          className={fieldClassName}
          aria-required={required ? 'true' : 'false'}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${id}-error` : hasWarning ? `${id}-warning` : undefined}
        />
        {icon && <span className="input-icon">{icon}</span>}
      </div>
      <FormFieldError
        id={id}
        error={hasError ? displayError : undefined}
        warning={hasWarning ? displayWarning : undefined}
      />
    </div>
  );
}; 
import React, { useState, useEffect, useCallback } from 'react';

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
  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState<string>('');

  // Simple validation function
  const validateField = useCallback((fieldValue: string, shouldSetTouched = false) => {
    if (shouldSetTouched) {
      setTouched(true);
    }

    // Only validate if field is touched or has a value
    if (!touched && !fieldValue && !shouldSetTouched) {
      return;
    }

    let errorMessage = '';
    let valid = true;

    // Basic validation based on field name and type
    if (required && !fieldValue.trim()) {
      errorMessage = `${label} je obavezan`;
      valid = false;
    } else if (fieldValue.trim()) {
      switch (name) {
        case 'fullName':
          if (fieldValue.length < 2) {
            errorMessage = 'Ime mora imati najmanje 2 znakova';
            valid = false;
          } else if (!/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/.test(fieldValue)) {
            errorMessage = 'Ime sadrži neispravne znakove';
            valid = false;
          }
          break;
        case 'email': {
          const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          if (!emailRegex.test(fieldValue)) {
            errorMessage = 'Neispravna email adresa';
            valid = false;
          }
          break;
        }
        case 'city':
          if (fieldValue.length < 2) {
            errorMessage = 'Grad mora imati najmanje 2 znakova';
            valid = false;
          } else if (!/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/.test(fieldValue)) {
            errorMessage = 'Grad sadrži neispravne znakove';
            valid = false;
          }
          break;
        case 'postalCode':
          if (!/^[0-9]{5}$/.test(fieldValue)) {
            errorMessage = 'Poštanski broj mora imati 5 brojeva';
            valid = false;
          }
          break;
        case 'address':
        case 'shippingAddress':
          if (fieldValue.length < 5) {
            errorMessage = 'Adresa mora imati najmanje 5 znakova';
            valid = false;
          }
          break;
        case 'shippingCity':
          if (fieldValue.length < 2) {
            errorMessage = 'Grad mora imati najmanje 2 znakova';
            valid = false;
          } else if (!/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/.test(fieldValue)) {
            errorMessage = 'Grad sadrži neispravne znakove';
            valid = false;
          }
          break;
        case 'shippingPostalCode':
          if (!/^[0-9]{5}$/.test(fieldValue)) {
            errorMessage = 'Poštanski broj mora imati 5 brojeva';
            valid = false;
          }
          break;
        case 'companyName':
          if (fieldValue.length < 2) {
            errorMessage = 'Naziv tvrtke mora imati najmanje 2 znakova';
            valid = false;
          } else if (fieldValue.length > 100) {
            errorMessage = 'Naziv tvrtke ne smije biti duži od 100 znakova';
            valid = false;
          }
          break;
        case 'companyOib':
          if (!/^[0-9]{11}$/.test(fieldValue)) {
            errorMessage = 'OIB mora imati točno 11 brojeva';
            valid = false;
          } else {
            // Basic OIB validation algorithm (Croatian tax number)
            const digits = fieldValue.split('').map(Number);
            let sum = 0;
            for (let i = 0; i < 10; i++) {
              sum += digits[i] * (10 - i);
            }
            const remainder = sum % 11;
            const checkDigit = remainder < 2 ? remainder : 11 - remainder;
            if (checkDigit !== digits[10]) {
              errorMessage = 'Neispravna kontrolna znamenka OIB-a';
              valid = false;
            }
          }
          break;
      }
    }

    setInternalError(errorMessage);
    return { valid, errorMessage };
  }, [name, label, required, touched]);

  // Validate on value change
  useEffect(() => {
    if (validateOnChange && touched) {
      const timeoutId = setTimeout(() => {
        validateField(value);
      }, 300); // Debounce validation

      return () => clearTimeout(timeoutId);
    }
  }, [value, validateOnChange, touched, validateField]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (validateOnChange && !touched) {
      setTouched(true);
    }
  };

  const handleBlur = () => {
    if (validateOnBlur) {
      validateField(value, true);
    }
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
          onBlur={handleBlur}
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
      {hasError && (
        <div id={`${id}-error`} className="field-error" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {displayError}
        </div>
      )}
      {hasWarning && (
        <div id={`${id}-warning`} className="field-warning">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          {displayWarning}
        </div>
      )}
    </div>
  );
}; 
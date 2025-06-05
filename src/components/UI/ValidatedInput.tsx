import React from 'react';
import './ValidatedInput.css';

interface ValidatedInputProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  as?: 'input' | 'textarea' | 'select';
  rows?: number;
  children?: React.ReactNode;
  // Validation states
  showError?: boolean;
  showSuccess?: boolean;
  showWarning?: boolean;
  isValidating?: boolean;
  errorMessage?: string | null;
  warningMessage?: string | null;
  // Additional props
  pattern?: string;
  title?: string;
  autoComplete?: string;
  disabled?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  className = '',
  as = 'input',
  rows,
  children,
  showError = false,
  showSuccess = false,
  showWarning = false,
  isValidating = false,
  errorMessage,
  warningMessage,
  pattern,
  title,
  autoComplete,
  disabled = false
}) => {
  // Enhanced change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e);
  };

  // Enhanced blur handler
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onBlur?.(e);
  };

  // Determine field state classes
  const getFieldStateClass = () => {
    if (showError) return 'error';
    if (showSuccess) return 'success';
    if (showWarning) return 'warning';
    if (isValidating) return 'validating';
    return '';
  };

  const fieldClassName = `
    validated-input
    ${getFieldStateClass()}
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
    'aria-invalid': showError,
    'aria-describedby': showError ? `${name}-error` : showWarning ? `${name}-warning` : undefined
  };

  // Render input based on type
  const renderInput = () => {
    switch (as) {
      case 'textarea':
        return <textarea {...commonProps} rows={rows} />;
      case 'select':
        return <select {...commonProps}>{children}</select>;
      default:
        return <input {...commonProps} type={type} />;
    }
  };

  // Success icon
  const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
  );

  // Error icon
  const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  // Warning icon
  const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );

  // Loading spinner
  const LoadingSpinner = () => (
    <div className="loading-spinner">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
    </div>
  );

  return (
    <div className="validated-input-container">
      <label htmlFor={name} className="validated-input-label">
        {label}
        {required && <span className="required-asterisk" aria-label="required">*</span>}
      </label>
      
      <div className="input-wrapper">
        {renderInput()}
        
        {/* Validation state indicator */}
        <div className="validation-indicator">
          {isValidating && <LoadingSpinner />}
          {showSuccess && !isValidating && <SuccessIcon />}
          {showError && !isValidating && <ErrorIcon />}
          {showWarning && !isValidating && !showError && <WarningIcon />}
        </div>
      </div>
      
      {/* Error message */}
      {showError && errorMessage && (
        <div id={`${name}-error`} className="validation-message error" role="alert">
          <ErrorIcon />
          {errorMessage}
        </div>
      )}
      
      {/* Warning message */}
      {showWarning && warningMessage && !showError && (
        <div id={`${name}-warning`} className="validation-message warning">
          <WarningIcon />
          {warningMessage}
        </div>
      )}
      
      {/* Success message (optional) */}
      {showSuccess && !showError && !showWarning && (
        <div className="validation-message success">
          <SuccessIcon />
          Polje je ispravno uneseno
        </div>
      )}
    </div>
  );
};
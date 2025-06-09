import React from 'react';

interface FormFieldInputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  pattern?: string;
  title?: string;
  className: string;
  hasError: boolean;
  hasWarning: boolean;
}

const FormFieldInput: React.FC<FormFieldInputProps> = ({
  type,
  id,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  placeholder,
  autoComplete,
  pattern,
  title,
  className,
  hasError,
  hasWarning
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
      pattern={pattern}
      title={title}
      className={className}
      aria-required={required ? 'true' : 'false'}
      aria-invalid={hasError ? 'true' : 'false'}
      aria-describedby={hasError ? `${id}-error` : hasWarning ? `${id}-warning` : undefined}
    />
  );
};

export default FormFieldInput; 
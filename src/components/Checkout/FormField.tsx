import React from 'react';
import { FormFieldContainer } from './components';
import { useFormFieldState, useFormFieldHandlers, useFormFieldProps } from './hooks';
import { getFormFieldClassName } from './utils/formFieldStyles';

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

export const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    type, id, name, value, onChange, required = false, placeholder,
    autoComplete, pattern, title, label, icon, validateOnChange = true,
    validateOnBlur = true, externalError, externalWarning, showValidation = true
  } = props;

  const fieldState = useFormFieldState({
    name, value, label, required, validateOnChange, validateOnBlur,
    externalError, externalWarning, showValidation
  });

  const { handleChange, handleFieldBlur } = useFormFieldHandlers({
    onChange, validateOnChange, handleTouch: fieldState.handleTouch, handleBlur: fieldState.handleBlur
  });

  const inputProps = useFormFieldProps({
    type, id, name, value, handleChange, handleFieldBlur,
    required, placeholder, autoComplete, pattern, title
  });

  const fieldClassName = getFormFieldClassName({ 
    hasError: fieldState.hasError, 
    hasWarning: fieldState.hasWarning 
  });

  return (
    <FormFieldContainer
      id={id}
      label={label}
      icon={icon}
      fieldClassName={fieldClassName}
      hasError={fieldState.hasError}
      hasWarning={fieldState.hasWarning}
      displayError={fieldState.displayError || undefined}
      displayWarning={fieldState.displayWarning || undefined}
      inputProps={inputProps}
    />
  );
}; 
import React from 'react';
import { ValidationIcon } from './ValidationIcon';
import { ValidationMessage } from './ValidationMessage';
import { InputField } from './InputField';
import { useValidationState } from './hooks/useValidationState';
import './ValidatedInput.css';

export interface ValidationState {
 showError?: boolean;
 showSuccess?: boolean;
 showWarning?: boolean;
 isValidating?: boolean;
 errorMessage?: string | null;
 warningMessage?: string | null;
}

export interface ValidatedInputProps {
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
 validation?: ValidationState;
 // HTML attributes
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
 validation = {},
 pattern,
 title,
 autoComplete,
 disabled = false
}) => {
 const validationState = useValidationState(validation);

 return (
 <div className="validated-input-container">
 <label htmlFor={name} className="validated-input-label">
 {label}
 {required && <span className="required-asterisk"aria-label="required">*</span>}
 </label>
 
 <div className="input-wrapper">
 <InputField
 name={name}
 type={type}
 value={value}
 onChange={onChange}
 onBlur={onBlur}
 placeholder={placeholder}
 required={required}
 className={className}
 as={as}
 rows={rows}
 pattern={pattern}
 title={title}
 autoComplete={autoComplete}
 disabled={disabled}
 validationState={validationState}
 >
 {children}
 </InputField>
 
 <ValidationIcon validationState={validationState} />
 </div>
 
 <ValidationMessage
 name={name}
 validationState={validationState}
 />
 </div>
 );
};
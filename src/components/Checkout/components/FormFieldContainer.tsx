import React from 'react';
import { FormFieldInput, FormFieldLabel, FormFieldWrapper } from './index';
import FormFieldError from '../FormFieldError';

interface FormFieldContainerProps {
 id: string;
 label: string;
 icon?: React.ReactNode;
 fieldClassName: string;
 hasError: boolean;
 hasWarning: boolean;
 displayError?: string;
 displayWarning?: string;
 inputProps: {
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
 };
}

const FormFieldContainer: React.FC<FormFieldContainerProps> = ({
 id,
 label,
 icon,
 fieldClassName,
 hasError,
 hasWarning,
 displayError,
 displayWarning,
 inputProps
}) => {
 return (
 <div className="form-group">
 <FormFieldLabel htmlFor={id}>{label}</FormFieldLabel>
 <FormFieldWrapper icon={icon}>
 <FormFieldInput
 {...inputProps}
 className={fieldClassName}
 hasError={hasError}
 hasWarning={hasWarning}
 />
 </FormFieldWrapper>
 <FormFieldError
 id={id}
 error={hasError ? displayError || undefined : undefined}
 warning={hasWarning ? displayWarning || undefined : undefined}
 />
 </div>
 );
};

export default FormFieldContainer; 
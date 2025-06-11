interface FormFieldStylesProps {
 hasError: boolean;
 hasWarning: boolean;
}

export const getFormFieldClassName = ({ hasError, hasWarning }: FormFieldStylesProps): string => {
 const classes = ['form-field-input'];
 
 if (hasError) {
 classes.push('error');
 } else if (hasWarning) {
 classes.push('warning');
 }
 
 return classes.join(' ');
}; 
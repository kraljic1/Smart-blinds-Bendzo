import React from 'react';

interface FormFieldLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const FormFieldLabel: React.FC<FormFieldLabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default FormFieldLabel; 
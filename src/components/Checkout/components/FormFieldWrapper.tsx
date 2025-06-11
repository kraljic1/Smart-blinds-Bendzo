import React from 'react';

interface FormFieldWrapperProps {
 children: React.ReactNode;
 icon?: React.ReactNode;
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({ children, icon }) => {
 return (
 <div className="input-wrapper">
 {children}
 {icon && <span className="input-icon">{icon}</span>}
 </div>
 );
};

export default FormFieldWrapper; 
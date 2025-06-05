import React, { useState } from 'react';
import { ValidatedInput } from '../UI/ValidatedInput';
import { useRealTimeValidation } from '../../hooks/useRealTimeValidation';

interface ExampleFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  [key: string]: unknown;
}

export const ValidationExample: React.FC = () => {
  const [formData, setFormData] = useState<ExampleFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: ''
  });

  // Real-time validation hook
  const {
    handleFieldChange,
    handleFieldBlur,
    shouldShowError,
    shouldShowSuccess,
    shouldShowWarning,
    getFieldError,
    getFieldWarning,
    getFieldState,
    isFormValid
  } = useRealTimeValidation(formData, {
    debounceMs: 500,
    validateOnChange: true,
    validateOnBlur: true
  });

  // Enhanced change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Trigger real-time validation
    handleFieldChange(name, value);
  };

  // Enhanced blur handler
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleFieldBlur(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid()) {
      alert('Form is valid! Data: ' + JSON.stringify(formData, null, 2));
    } else {
      alert('Please fix validation errors before submitting.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Real-time Validation Example</h2>
      <form onSubmit={handleSubmit}>
        <ValidatedInput
          name="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
          required
          showError={!!shouldShowError('fullName')}
          showSuccess={!!shouldShowSuccess('fullName')}
          showWarning={!!shouldShowWarning('fullName')}
          isValidating={getFieldState('fullName').isValidating}
          errorMessage={getFieldError('fullName')}
          warningMessage={getFieldWarning('fullName')}
        />

        <ValidatedInput
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="your@email.com"
          required
          showError={!!shouldShowError('email')}
          showSuccess={!!shouldShowSuccess('email')}
          showWarning={!!shouldShowWarning('email')}
          isValidating={getFieldState('email').isValidating}
          errorMessage={getFieldError('email')}
          warningMessage={getFieldWarning('email')}
        />

        <div style={{ display: 'flex', gap: '16px' }}>
          <ValidatedInput
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="City"
            required
            showError={!!shouldShowError('city')}
            showSuccess={!!shouldShowSuccess('city')}
            showWarning={!!shouldShowWarning('city')}
            isValidating={getFieldState('city').isValidating}
            errorMessage={getFieldError('city')}
            warningMessage={getFieldWarning('city')}
          />

          <ValidatedInput
            name="postalCode"
            label="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="10000"
            required
            pattern="[0-9]{5}"
            title="Enter 5-digit postal code"
            showError={!!shouldShowError('postalCode')}
            showSuccess={!!shouldShowSuccess('postalCode')}
            showWarning={!!shouldShowWarning('postalCode')}
            isValidating={getFieldState('postalCode').isValidating}
            errorMessage={getFieldError('postalCode')}
            warningMessage={getFieldWarning('postalCode')}
          />
        </div>

        <button 
          type="submit" 
          style={{
            padding: '12px 24px',
            backgroundColor: isFormValid() ? '#16a34a' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
            marginTop: '20px'
          }}
          disabled={!isFormValid()}
        >
          Submit Form
        </button>
      </form>
    </div>
  );
}; 
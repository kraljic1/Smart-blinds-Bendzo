/**
 * Hook for handling form submission logic
 * Manages submission state, rate limiting, and submission flow
 */

import { useState, useCallback } from 'react';
import { formSubmissionLimiter } from '../utils/securityValidation';
import type { 
  FormData, 
  SubmitCheckResult, 
  ValidationCheckResult 
} from '../types/validation';

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  // Check if form can be submitted
  const canSubmit = useCallback((
    formData: FormData, 
    validateAllFields: (data: FormData) => ValidationCheckResult
  ): SubmitCheckResult => {
    // Check rate limiting
    const userIdentifier = formData.email || 'anonymous';
    if (!formSubmissionLimiter.isAllowed(userIdentifier)) {
      return {
        canSubmit: false,
        reason: 'Rate limit exceeded. Please wait before submitting again.',
        remainingAttempts: formSubmissionLimiter.getRemainingAttempts(userIdentifier)
      };
    }

    // Validate all fields
    const validation = validateAllFields(formData);
    
    return {
      canSubmit: validation.isValid,
      reason: validation.isValid ? null : 'Please fix validation errors before submitting',
      validationState: validation.validationState
    };
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (
    formData: FormData,
    submitFunction: (data: FormData) => Promise<unknown>,
    validateAllFields: (data: FormData) => ValidationCheckResult,
    resetValidationState: () => void
  ) => {
    setIsSubmitting(true);
    setSubmitAttempts(prev => prev + 1);

    try {
      const submitCheck = canSubmit(formData, validateAllFields);
      
      if (!submitCheck.canSubmit) {
        throw new Error(submitCheck.reason || 'Form validation failed');
      }

      // Perform submission
      const result = await submitFunction(formData);
      
      // Reset validation state on successful submission
      resetValidationState();
      setSubmitAttempts(0);
      
      return result;
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit]);

  // Reset submission state
  const resetSubmissionState = useCallback(() => {
    setIsSubmitting(false);
    setSubmitAttempts(0);
  }, []);

  return {
    isSubmitting,
    submitAttempts,
    canSubmit,
    handleSubmit,
    resetSubmissionState
  };
}; 
import { useState } from 'react';

interface PasswordValidationResult {
  isValid: boolean;
  error: string | null;
}

export const usePasswordValidation = () => {
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string, confirmPassword: string): PasswordValidationResult => {
    setError(null);

    if (password.length < 8) {
      const errorMsg = 'Lozinka mora imati najmanje 8 karaktera';
      setError(errorMsg);
      return { isValid: false, error: errorMsg };
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase) {
      const errorMsg = 'Lozinka mora sadržavati najmanje jedno veliko slovo';
      setError(errorMsg);
      return { isValid: false, error: errorMsg };
    }

    if (!hasLowercase) {
      const errorMsg = 'Lozinka mora sadržavati najmanje jedno malo slovo';
      setError(errorMsg);
      return { isValid: false, error: errorMsg };
    }

    if (!hasNumbers) {
      const errorMsg = 'Lozinka mora sadržavati najmanje jedan broj';
      setError(errorMsg);
      return { isValid: false, error: errorMsg };
    }

    if (!hasSymbols) {
      const errorMsg = 'Lozinka mora sadržavati najmanje jedan simbol (!@#$%^&*(),.?":{}|<>)';
      setError(errorMsg);
      return { isValid: false, error: errorMsg };
    }

    if (password !== confirmPassword) {
      const errorMsg = 'Lozinke se ne poklapaju';
      setError(errorMsg);
      return { isValid: false, error: errorMsg };
    }

    return { isValid: true, error: null };
  };

  return {
    error,
    setError,
    validatePassword
  };
}; 
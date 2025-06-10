import { useState } from 'react';
import { ToggleStates } from '../types';

export const useToggleStates = () => {
  const [toggleStates, setToggleStates] = useState<ToggleStates>({
    primary: false,
    success: false,
    warning: false,
    small: false,
    medium: false,
    large: false,
    disabled: false
  });

  const handleToggleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleStates(prev => ({
      ...prev,
      [name]: event.target.checked
    }));
  };

  return {
    toggleStates,
    handleToggleChange
  };
}; 
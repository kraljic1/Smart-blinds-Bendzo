import React, { useState } from 'react';
import { DropdownOption } from './DropdownButton';
import DropdownButton from './DropdownButton';
import DropdownMenu from './DropdownMenu';
import { useDropdownPosition } from '../../hooks/useDropdownPosition';
import { useDropdownEvents } from '../../hooks/useDropdownEvents';
import { useDropdownKeyboard } from '../../hooks/useDropdownKeyboard';

interface ModernDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const ModernDropdown: React.FC<ModernDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dropdownPosition, dropdownRef, updatePosition } = useDropdownPosition();
  
  useDropdownEvents({ isOpen, setIsOpen, dropdownRef });
  const { handleKeyDown } = useDropdownKeyboard({ 
    disabled, 
    isOpen, 
    setIsOpen, 
    updatePosition 
  });

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    if (!disabled) {
      if (!isOpen) {
        updatePosition();
      }
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <DropdownButton
        selectedOption={selectedOption}
        placeholder={placeholder}
        disabled={disabled}
        isOpen={isOpen}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        id={id}
      />

      {isOpen && (
        <DropdownMenu
          options={options}
          selectedValue={value}
          position={dropdownPosition}
          onOptionClick={handleOptionClick}
        />
      )}
    </div>
  );
};

export default ModernDropdown; 
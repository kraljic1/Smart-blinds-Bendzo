import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownButtonProps {
  selectedOption: DropdownOption | undefined;
  placeholder: string;
  disabled: boolean;
  isOpen: boolean;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  id?: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  selectedOption,
  placeholder,
  disabled,
  isOpen,
  onClick,
  onKeyDown,
  id
}) => {
  return (
    <button
      type="button"
      id={id}
      className={`
        relative w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
        rounded-lg shadow-sm pl-3 pr-10 py-2.5 text-left cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-all duration-200 ease-in-out
        ${disabled 
          ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800' 
          : 'hover:border-gray-400 dark:hover:border-gray-500'
        }
        ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
      `}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <span className="block truncate text-sm font-medium text-gray-900 dark:text-white">
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDown 
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </span>
    </button>
  );
};

export default DropdownButton; 
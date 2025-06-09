import React from 'react';
import { Check } from 'lucide-react';
import { DropdownOption as DropdownOptionType } from './DropdownButton';

interface DropdownOptionProps {
  option: DropdownOptionType;
  isSelected: boolean;
  onClick: (value: string) => void;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({
  option,
  isSelected,
  onClick
}) => {
  return (
    <div
      className={`
        cursor-pointer select-none relative py-2.5 pl-3 pr-9 text-sm
        transition-colors duration-150 ease-in-out
        ${isSelected
          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200'
          : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
        }
      `}
      onClick={() => onClick(option.value)}
      role="option"
      aria-selected={isSelected}
    >
      <span className={`block truncate font-medium ${
        isSelected ? 'font-semibold' : 'font-normal'
      }`}>
        {option.label}
      </span>
      {isSelected && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </span>
      )}
    </div>
  );
};

export default DropdownOption; 
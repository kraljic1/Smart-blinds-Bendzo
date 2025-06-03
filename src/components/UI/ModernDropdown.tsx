import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface ModernDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const ModernDropdown: React.FC<ModernDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);



  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen && dropdownRef.current) {
          const rect = dropdownRef.current.getBoundingClientRect();
          const top = rect.bottom + 4;
          const left = rect.left;
          const width = rect.width;
          const maxTop = window.innerHeight - 240;
          const finalTop = Math.min(top, maxTop);
          
          setDropdownPosition({
            top: finalTop,
            left: left,
            width: width
          });
        }
        setIsOpen(!isOpen);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const top = rect.bottom + 4;
            const left = rect.left;
            const width = rect.width;
            const maxTop = window.innerHeight - 240;
            const finalTop = Math.min(top, maxTop);
            
            setDropdownPosition({
              top: finalTop,
              left: left,
              width: width
            });
          }
          setIsOpen(true);
        } else {
          // Focus next option logic could be added here
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          // Focus previous option logic could be added here
        }
        break;
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
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
                onClick={() => {
          if (!disabled) {
            if (!isOpen && dropdownRef.current) {
              const rect = dropdownRef.current.getBoundingClientRect();
              
              // Calculate position relative to viewport, not page
              const top = rect.bottom + 4;
              const left = rect.left;
              const width = rect.width;
              
              // Ensure dropdown stays within viewport
              const maxTop = window.innerHeight - 240; // 240px is max dropdown height
              const finalTop = Math.min(top, maxTop);
              
              setDropdownPosition({
                top: finalTop,
                left: left,
                width: width
              });
            }
            setIsOpen(!isOpen);
          }
        }}
        onKeyDown={handleKeyDown}
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

      {isOpen && (
        <div className="fixed z-[9999] bg-white dark:bg-gray-700 shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none border border-gray-200 dark:border-gray-600"
             style={{
               top: dropdownPosition.top,
               left: dropdownPosition.left,
               width: dropdownPosition.width
             }}>

          {options.map((option) => (
            <div
              key={option.value}
              className={`
                cursor-pointer select-none relative py-2.5 pl-3 pr-9 text-sm
                transition-colors duration-150 ease-in-out
                ${option.value === value
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200'
                  : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }
              `}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              <span className={`block truncate font-medium ${
                option.value === value ? 'font-semibold' : 'font-normal'
              }`}>
                {option.label}
              </span>
              {option.value === value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernDropdown; 
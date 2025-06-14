import React from 'react';
import { DropdownOption as DropdownOptionType } from './DropdownButton';
import DropdownOption from './DropdownOption';
import { DropdownPosition } from '../../hooks/useDropdownPosition';

interface DropdownMenuProps {
 options: DropdownOptionType[];
 selectedValue: string;
 position: DropdownPosition;
 onOptionClick: (value: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
 options,
 selectedValue,
 position,
 onOptionClick
}) => {
 return (
 <div 
 className="fixed z-[9999] bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none border border-gray-200"
 style={{
 top: position.top,
 left: position.left,
 width: position.width
 }}
 >
 {options.map((option) => (
 <DropdownOption
 key={option.value}
 option={option}
 isSelected={option.value === selectedValue}
 onClick={onOptionClick}
 />
 ))}
 </div>
 );
};

export default DropdownMenu; 
import { useState, useRef } from 'react';

export interface DropdownPosition {
 top: number;
 left: number;
 width: number;
}

export const useDropdownPosition = () => {
 const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({ top: 0, left: 0, width: 0 });
 const dropdownRef = useRef<HTMLDivElement>(null);

 const calculatePosition = (): DropdownPosition | null => {
 if (!dropdownRef.current) return null;

 const rect = dropdownRef.current.getBoundingClientRect();
 const top = rect.bottom + 4;
 const left = rect.left;
 const width = rect.width;
 const maxTop = window.innerHeight - 240; // 240px is max dropdown height
 const finalTop = Math.min(top, maxTop);

 return {
 top: finalTop,
 left: left,
 width: width
 };
 };

 const updatePosition = () => {
 const position = calculatePosition();
 if (position) {
 setDropdownPosition(position);
 }
 };

 return {
 dropdownPosition,
 dropdownRef,
 updatePosition
 };
}; 
import React from 'react';
import { FilterGroup as FilterGroupType, FilterOption } from '../../types/filter';


interface FilterGroupProps {
 group: FilterGroupType;
 selectedValues: string[];
 onChange: (value: string, checked: boolean) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ 
 group, 
 selectedValues, 
 onChange 
}) => {
 const handleCheckboxChange = (option: FilterOption, checked: boolean) => {
 onChange(option.value, checked);
 };

 return (
 <div className="filter-group">
 <h3 className="filter-group-title">{group.title}</h3>
 
 <div className="filter-options">
 {group.options.map(option => (
 <label key={option.id} className="filter-option"htmlFor={`filter-${group.id}-${option.id}`}>
 <input
 type="checkbox"
 id={`filter-${group.id}-${option.id}`}
 name={`filter-${group.id}-${option.id}`}
 className="filter-checkbox"
 checked={selectedValues.includes(option.value)}
 onChange={(e) => handleCheckboxChange(option, e.target.checked)}
 />
 <span className="filter-label">{option.label}</span>
 </label>
 ))}
 </div>
 </div>
 );
};

export default FilterGroup; 
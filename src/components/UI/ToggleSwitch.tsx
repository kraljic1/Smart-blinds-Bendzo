import React from 'react';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
 id: string;
 name: string;
 checked: boolean;
 onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
 label: string;
 disabled?: boolean;
 size?: 'small' | 'medium' | 'large';
 variant?: 'primary' | 'success' | 'warning';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
 id,
 name,
 checked,
 onChange,
 label,
 disabled = false,
 size = 'medium',
 variant = 'primary'
}) => {
 return (
 <div className={`toggle-switch-container ${size} ${variant} ${disabled ? 'disabled' : ''}`}>
 <label htmlFor={id} className="toggle-switch-label">
 <span className="toggle-switch-text">{label}</span>
 <div className="toggle-switch-wrapper">
 <input
 type="checkbox"
 id={id}
 name={name}
 checked={checked}
 onChange={onChange}
 disabled={disabled}
 className="toggle-switch-input"
 aria-describedby={`${id}-description`}
 />
 <span className="toggle-switch-slider">
 <span className="toggle-switch-thumb">
 <svg 
 className="toggle-switch-icon toggle-switch-icon-check"
 viewBox="0 0 16 16"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 >
 <path 
 d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
 fill="currentColor"
 />
 </svg>
 <svg 
 className="toggle-switch-icon toggle-switch-icon-cross"
 viewBox="0 0 16 16"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 >
 <path 
 d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
 fill="currentColor"
 />
 </svg>
 </span>
 </span>
 </div>
 </label>
 </div>
 );
};

export default ToggleSwitch; 
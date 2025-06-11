import React from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps {
 id: string;
 label: string;
 placeholder: string;
 value: string;
 showPassword: boolean;
 onChange: (value: string) => void;
 onToggleVisibility: () => void;
 required?: boolean;
 minLength?: number;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
 id,
 label,
 placeholder,
 value,
 showPassword,
 onChange,
 onToggleVisibility,
 required = true,
 minLength = 8
}) => {
 return (
 <div>
 <label htmlFor={id} className="block text-sm font-medium text-gray-700">
 {label}
 </label>
 <div className="mt-1 relative rounded-md shadow-sm">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Lock className="h-5 w-5 text-gray-400"/>
 </div>
 <input
 id={id}
 name={id}
 type={showPassword ?"text":"password"}
 autoComplete="new-password"
 required={required}
 minLength={minLength}
 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
 placeholder={placeholder}
 value={value}
 onChange={(e) => onChange(e.target.value)}
 />
 <button 
 type="button"
 className="absolute inset-y-0 right-0 pr-3 flex items-center"
 onClick={onToggleVisibility}
 tabIndex={-1}
 >
 {showPassword ? (
 <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500"/>
 ) : (
 <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500"/>
 )}
 </button>
 </div>
 </div>
 );
};

export default PasswordField; 
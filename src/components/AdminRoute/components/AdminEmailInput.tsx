import React from 'react';
import { Search } from 'lucide-react';

interface AdminEmailInputProps {
 id: string;
 value: string;
 onChange: (value: string) => void;
 placeholder?: string;
 focusColor?: 'blue' | 'orange';
 required?: boolean;
}

const AdminEmailInput: React.FC<AdminEmailInputProps> = ({
 id,
 value,
 onChange,
 placeholder ="admin@primjer.com",
 focusColor = 'blue',
 required = true
}) => {
 const focusClasses = focusColor === 'blue' 
 ? 'focus:ring-blue-500 focus:border-blue-500'
 : 'focus:ring-orange-500 focus:border-orange-500';

 return (
 <div className="flex-1">
 <label htmlFor={id} className="sr-only">E-mail adresa</label>
 <div className="relative rounded-md shadow-sm">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Search className="h-5 w-5 text-gray-400"/>
 </div>
 <input
 type="email"
 id={id}
 className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 placeholder-gray-500 focus:outline-none ${focusClasses} sm:text-sm`}
 placeholder={placeholder}
 value={value}
 onChange={(e) => onChange(e.target.value)}
 required={required}
 />
 </div>
 </div>
 );
};

export default AdminEmailInput; 
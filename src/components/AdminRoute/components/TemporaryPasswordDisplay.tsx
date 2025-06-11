import React from 'react';

interface TemporaryPasswordDisplayProps {
 password: string;
 onClose: () => void;
}

const TemporaryPasswordDisplay: React.FC<TemporaryPasswordDisplayProps> = ({
 password,
 onClose
}) => {
 const handleCopyPassword = (): void => {
 navigator.clipboard.writeText(password);
 // Note: Could add toast notification here in the future
 };

 return (
 <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg">
 <div className="flex items-start">
 <div className="flex-shrink-0">
 <svg className="h-5 w-5 text-yellow-400"viewBox="0 0 20 20"fill="currentColor">
 <path 
 fillRule="evenodd"
 d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
 clipRule="evenodd"
 />
 </svg>
 </div>
 <div className="ml-3">
 <h3 className="text-sm font-medium text-yellow-800">
 Privremena lozinka kreirana
 </h3>
 <div className="mt-2 text-sm text-yellow-700">
 <p>Privremena lozinka za novog administratora:</p>
 <div className="mt-2 p-2 bg-white dark:bg-gray-800 border border-yellow-300 rounded font-mono text-lg">
 {password}
 </div>
 <p className="mt-2 text-xs">
 ⚠️ Sačuvajte ovu lozinku i pošaljite je novom administratoru. 
 Administrator će biti primoran da promijeni lozinku pri prvoj prijavi.
 </p>
 </div>
 <div className="mt-3">
 <button
 onClick={handleCopyPassword}
 className="text-sm bg-yellow-100 dark:bg-yellow-800 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700"
 >
 📋 Kopiraj lozinku
 </button>
 <button
 onClick={onClose}
 className="ml-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 ✕ Zatvori
 </button>
 </div>
 </div>
 </div>
 </div>
 );
};

export default TemporaryPasswordDisplay; 
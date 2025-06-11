import React from 'react';
import { Lock } from 'lucide-react';

const PasswordChangeHeader: React.FC = () => {
 return (
 <div className="text-center mb-8">
 <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4">
 <Lock className="h-10 w-10 text-yellow-600"/>
 </div>
 <h1 className="text-3xl font-extrabold text-gray-900">
 Promjena lozinke obavezna
 </h1>
 <p className="mt-2 text-sm text-gray-600">
 Morate promijeniti privremenu lozinku prije pristupa admin panelu
 </p>
 </div>
 );
};

export default PasswordChangeHeader; 
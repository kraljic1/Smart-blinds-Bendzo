import React from 'react';
import { Shield } from 'lucide-react';

const LoginHeader: React.FC = () => {
 return (
 <div className="text-center mb-8">
 <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
 <Shield className="h-10 w-10 text-blue-600"/>
 </div>
 <h1 className="text-3xl font-extrabold text-gray-900">
 Admin portal
 </h1>
 <p className="mt-2 text-sm text-gray-600">
 Molimo prijavite se s vašim administratorskim podacima
 </p>
 </div>
 );
};

export default LoginHeader; 
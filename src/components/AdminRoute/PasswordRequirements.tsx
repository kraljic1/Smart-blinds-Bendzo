import React from 'react';

const PasswordRequirements: React.FC = () => {
 return (
 <div className="mt-6 text-center">
 <div className="text-sm text-gray-600">
 <p className="mb-2">Zahtjevi za lozinku:</p>
 <ul className="text-xs space-y-1">
 <li>• Najmanje 8 karaktera</li>
 <li>• Najmanje jedno veliko slovo (A-Z)</li>
 <li>• Najmanje jedno malo slovo (a-z)</li>
 <li>• Najmanje jedan broj (0-9)</li>
 <li>• Najmanje jedan simbol (!@#$%^&*(),.?":{}|&lt;&gt;)</li>
 </ul>
 </div>
 </div>
 );
};

export default PasswordRequirements; 
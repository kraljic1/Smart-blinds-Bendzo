import React from 'react';
import { CheckCircle, Clock, Phone } from 'lucide-react';

const NextSteps: React.FC = () => {
 return (
 <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 print-hide">
 <h3 className="text-lg font-semibold text-blue-900 mb-4">Što slijedi?</h3>
 <ul className="space-y-2 text-blue-800">
 <li className="flex items-start">
 <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-green-600"/>
 <span>Poslat ćemo vam potvrdu narudžbe na email</span>
 </li>
 <li className="flex items-start">
 <Clock className="w-5 h-5 mr-2 mt-0.5 text-blue-600"/>
 <span>Kontaktirat ćemo vas za dogovaranje termina instalacije</span>
 </li>
 <li className="flex items-start">
 <Phone className="w-5 h-5 mr-2 mt-0.5 text-blue-600"/>
 <span>Naš tim će vam se javiti u roku od 24 sata</span>
 </li>
 </ul>
 </div>
 );
};

export default NextSteps; 
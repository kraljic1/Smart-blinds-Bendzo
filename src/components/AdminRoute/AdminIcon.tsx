import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AdminIcon: React.FC = () => {
 return (
 <Link 
 to="/admin/login"
 className="relative flex items-center justify-center w-10 h-10 p-2 rounded-full hover:bg-gray-100 :bg-gray-800 transition-colors"
 aria-label="Admin Login"
 title="Admin Login"
 >
 <Shield className="w-5 h-5"/>
 </Link>
 );
};

export default AdminIcon; 
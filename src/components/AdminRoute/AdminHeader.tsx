import React from 'react';
import { LogOut, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

interface AdminHeaderProps {
 title: string;
 description: string;
 backLink?: string;
 backText?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
 title,
 description,
 backLink = '/admin/orders',
 backText = 'Natrag na Narudžbe',
}) => {
 const navigate = useNavigate();

 const handleLogout = async () => {
 await supabase.auth.signOut();
 navigate('/admin/login');
 };

 return (
 <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
 <div>
 <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
 <p className="mt-1 text-sm text-gray-600">
 {description}
 </p>
 </div>

 <div className="flex flex-wrap items-center gap-3">
 {backLink && (
 <Link
 to={backLink}
 className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 :bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
 >
 <ChevronLeft className="w-4 h-4 mr-2"/>
 {backText}
 </Link>
 )}

 <button
 onClick={handleLogout}
 className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
 >
 <LogOut className="w-4 h-4 mr-2"/>
 Odjava
 </button>
 </div>
 </div>
 );
};

export default AdminHeader; 
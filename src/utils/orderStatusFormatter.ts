// Helper function to get status style based on status value
export const getStatusStyle = (status: string): string => {
 switch(status) {
 case 'received':
 return 'bg-blue-100 text-blue-800 border-blue-200';
 case 'processing':
 return 'bg-yellow-100 text-yellow-800 border-yellow-200';
 case 'shipped':
 return 'bg-green-100 text-green-800 border-green-200';
 case 'completed':
 return 'bg-emerald-100 text-emerald-800 border-emerald-200';
 case 'cancelled':
 return 'bg-red-100 text-red-800 border-red-200';
 default:
 return 'bg-gray-100 text-gray-800 border-gray-200';
 }
};

// Helper function to translate status values
export const getStatusTranslation = (status: string): string => {
 switch(status) {
 case 'received':
 return 'Zaprimljeno';
 case 'processing':
 return 'U obradi';
 case 'shipped':
 return 'Poslano';
 case 'completed':
 return 'Završeno';
 case 'cancelled':
 return 'Otkazano';
 default:
 return status.charAt(0).toUpperCase() + status.slice(1);
 }
};

// Format date for display
export const formatDate = (dateString: string): string => {
 return new Date(dateString).toLocaleString('hr-HR', {
 day: 'numeric',
 month: 'short',
 year: 'numeric',
 hour: '2-digit',
 minute: '2-digit'
 });
}; 
interface LoadingIndicatorProps {
 className?: string;
}

export function LoadingIndicator({ className = '' }: LoadingIndicatorProps) {
 return (
 <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
 <div className="flex items-center space-x-2">
 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
 <span className="text-blue-800 text-sm">Checking browser compatibility...</span>
 </div>
 </div>
 );
} 
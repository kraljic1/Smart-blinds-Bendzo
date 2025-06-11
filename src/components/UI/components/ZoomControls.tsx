import React from 'react';
import { X } from 'lucide-react';

interface ZoomControlsProps {
 onZoomIn: () => void;
 onZoomOut: () => void;
 onReset: () => void;
 onClose: () => void;
}

/**
 * Zoom control buttons component
 * Handles zoom in, zoom out, reset, and close actions
 */
const ZoomControls: React.FC<ZoomControlsProps> = ({
 onZoomIn,
 onZoomOut,
 onReset,
 onClose
}) => {
 return (
 <div className="absolute top-4 right-4 flex space-x-2 z-50">
 <button
 onClick={onZoomIn}
 className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 :bg-gray-700 transition"
 title="Zoom in"
 >
 <svg xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"className="text-gray-700">
 <circle cx="11"cy="11"r="8"></circle>
 <line x1="21"x2="16.65"y1="21"y2="16.65"></line>
 <line x1="11"x2="11"y1="8"y2="14"></line>
 <line x1="8"x2="14"y1="11"y2="11"></line>
 </svg>
 </button>
 <button
 onClick={onZoomOut}
 className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 :bg-gray-700 transition"
 title="Zoom out"
 >
 <svg xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"className="text-gray-700">
 <circle cx="11"cy="11"r="8"></circle>
 <line x1="21"x2="16.65"y1="21"y2="16.65"></line>
 <line x1="8"x2="14"y1="11"y2="11"></line>
 </svg>
 </button>
 <button
 onClick={onReset}
 className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 :bg-gray-700 transition"
 title="Reset zoom"
 >
 <svg xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"className="text-gray-700">
 <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
 <path d="M3 3v5h5"></path>
 </svg>
 </button>
 <button
 onClick={onClose}
 className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 :bg-gray-700 transition"
 title="Close zoom view"
 aria-label="Close zoom view"
 >
 <X className="text-gray-700"/>
 </button>
 </div>
 );
};

export default ZoomControls; 
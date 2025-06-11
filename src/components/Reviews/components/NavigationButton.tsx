import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonProps {
 direction: 'prev' | 'next';
 onClick: () => void;
}

const NavigationButton = ({ direction, onClick }: NavigationButtonProps) => {
 const isPrev = direction === 'prev';
 const Icon = isPrev ? ChevronLeft : ChevronRight;
 const positionClass = isPrev 
 ? 'left-0 -translate-x-4 md:-translate-x-8' 
 : 'right-0 translate-x-4 md:translate-x-8';
 const ariaLabel = isPrev ? 'Previous testimonials' : 'Next testimonials';

 return (
 <button 
 onClick={onClick}
 className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 :bg-gray-700 transition border border-gray-200 `}
 aria-label={ariaLabel}
 >
 <Icon className="w-6 h-6 text-gray-500"/>
 </button>
 );
};

export default NavigationButton; 
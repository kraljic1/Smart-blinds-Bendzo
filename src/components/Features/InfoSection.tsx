import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface InfoSectionProps {
 sectionRef: (node: HTMLDivElement | null) => void;
 icon: LucideIcon;
 title: string;
 description: string;
 imageUrl: string;
 imageAlt: string;
 linkTo: string;
 isReversed?: boolean;
 scrollY: number;
 inView: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({
 sectionRef,
 icon: Icon,
 title,
 description,
 imageUrl,
 imageAlt,
 linkTo,
 isReversed = false,
 scrollY,
 inView
}) => {
 const flexDirection = isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row';

 return (
 <div 
 ref={sectionRef}
 className={`flex flex-col ${flexDirection} items-center gap-12 mb-24 opacity-0 transition-all duration-1000 ease-out`}
 style={{ 
 opacity: inView ? 1 : 0,
 transform: inView
 ? 'translateY(0)' 
 : `translateY(${isReversed ? '20px' : Math.min(scrollY * 0.02, 15) + 'px'})`
 }}
 >
 <div className="flex-1 text-center lg:text-left">
 <div className="mb-6 p-4 inline-block bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl">
 <Icon className="w-12 h-12 text-blue-600"/>
 </div>
 <h3 className="text-2xl font-bold mb-4 text-gray-900">
 {title}
 </h3>
 <p className="text-lg text-gray-600 mb-6 leading-relaxed">
 {description}
 </p>
 <Link
 to={linkTo}
 className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
 >
 <span>Saznajte više o {title} →</span>
 </Link>
 </div>
 <div className="flex-1">
 <div className="relative rounded-2xl overflow-hidden">
 <img 
 src={imageUrl}
 alt={imageAlt} 
 className="rounded-2xl shadow-xl w-full h-auto"
 />
 </div>
 </div>
 </div>
 );
};

export default InfoSection; 
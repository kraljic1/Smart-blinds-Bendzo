import { useRef, useEffect } from 'react';


interface ScoreBarProps {
 score: number;
}

export function ScoreBar({ score }: ScoreBarProps) {
 const scoreBarRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 // Update CSS custom property for score bar width
 if (scoreBarRef.current) {
 scoreBarRef.current.style.setProperty('--score-width', `${score}%`);
 }
 }, [score]);

 // Get score bar class based on score
 const getScoreBarClass = () => {
 if (score >= 80) return 'bg-green-500';
 if (score >= 60) return 'bg-yellow-500';
 return 'bg-red-500';
 };

 return (
 <div className="w-16 h-4 bg-gray-200 rounded-full overflow-hidden">
 <div 
 ref={scoreBarRef}
 className={`h-full transition-all duration-300 ease-out ${getScoreBarClass()}`}
 style={{ width: `${score}%` }}
 />
 </div>
 );
} 
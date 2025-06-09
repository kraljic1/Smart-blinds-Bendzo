import { useRef, useEffect } from 'react';
import styles from '../../SEOAnalyzer.module.css';

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
    if (score >= 80) return styles.scoreBarGreen;
    if (score >= 60) return styles.scoreBarYellow;
    return styles.scoreBarRed;
  };

  return (
    <div className="w-16 h-4 bg-gray-200 rounded-full overflow-hidden">
      <div 
        ref={scoreBarRef}
        className={`${styles.scoreBar} ${getScoreBarClass()}`}
      />
    </div>
  );
} 
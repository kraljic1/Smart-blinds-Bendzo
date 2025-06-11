import React from 'react';

interface PerformanceIndicatorProps {
 performanceStats: { avg_time_ms: number }[];
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({ performanceStats }) => {
 if (performanceStats.length === 0) return null;
 
 const latestStat = performanceStats[0];
 const isGoodPerformance = latestStat?.avg_time_ms < 100;
 
 return (
 <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
 isGoodPerformance 
 ? 'bg-green-100 text-green-800 dark:bg-green-900 ' 
 : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 '
 }`}>
 <span className="mr-1">⚡</span>
 {latestStat?.avg_time_ms?.toFixed(0)}ms
 </div>
 );
};

export default PerformanceIndicator; 
import React from 'react';
import { useSEOAnalysis } from './SEOAnalyzer/hooks/useSEOAnalysis';
import { ScoreBar } from './SEOAnalyzer/components/ScoreBar';
import { IssueList } from './SEOAnalyzer/components/IssueList';
import type { SEOAnalyzerProps } from './SEOAnalyzer/types/seoTypes';

const SEOAnalyzer: React.FC<SEOAnalyzerProps> = ({ showResults = false }) => {
 const { issues, score, shouldRender } = useSEOAnalysis({ showResults });

 // Never render in production unless explicitly requested by admin
 if (!shouldRender) {
 return null;
 }

 return (
 <div className="seo-analyzer fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 z-50 max-w-md overflow-auto max-h-[60vh] hidden lg:block">
 <div className="flex justify-between items-center mb-2">
 <h2 className="text-lg font-bold">SEO Analiza: {score}%</h2>
 <ScoreBar score={score} />
 </div>
 
 <IssueList issues={issues} />
 </div>
 );
};

export default SEOAnalyzer; 
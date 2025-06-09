import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { SEOIssue } from '../types/seoTypes';
import { performBasicSEOChecks } from '../utils/seoChecker';
import { calculateSEOScore } from '../utils/scoreCalculator';

interface UseSEOAnalysisProps {
  showResults: boolean;
}

export function useSEOAnalysis({ showResults }: UseSEOAnalysisProps) {
  const [issues, setIssues] = useState<SEOIssue[]>([]);
  const [score, setScore] = useState(0);
  const location = useLocation();

  // Only run in development mode, never in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  useEffect(() => {
    // Only run in development or when explicitly requested
    if (!isDevelopment && !showResults) {
      return;
    }
    
    // Perform basic SEO checks directly on the document
    const seoIssues = performBasicSEOChecks(document);
    const calculatedScore = calculateSEOScore(seoIssues);
    
    setIssues(seoIssues);
    setScore(calculatedScore);
    
  }, [location.pathname, showResults, isDevelopment]);

  const shouldRender = (isDevelopment || showResults) && issues.length > 0;

  return {
    issues,
    score,
    shouldRender,
    isDevelopment
  };
} 
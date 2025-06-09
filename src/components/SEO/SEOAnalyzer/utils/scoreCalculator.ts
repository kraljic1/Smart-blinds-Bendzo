import type { SEOIssue } from '../types/seoTypes';

export function calculateSEOScore(issues: SEOIssue[]): number {
  // This is a simple scoring system - fewer issues = higher score
  const maxIssues = 10; // Maximum number of possible issues
  const actualIssues = issues.length;
  return Math.max(0, Math.min(100, Math.round(100 * (1 - actualIssues / maxIssues))));
} 
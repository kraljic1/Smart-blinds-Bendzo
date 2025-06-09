export type SEOIssue = {
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
};

export interface SEOAnalyzerProps {
  showResults?: boolean; // Set to false in production or true only for admins
}

export interface SEOCheckResult {
  issues: SEOIssue[];
  score: number;
} 
import type { SEOIssue } from '../types/seoTypes';
import styles from '../../SEOAnalyzer.module.css';

interface IssueListProps {
 issues: SEOIssue[];
}

export function IssueList({ issues }: IssueListProps) {
 // Get issue class based on severity
 const getIssueClass = (severity: string) => {
 switch (severity) {
 case 'error': return styles.issueError;
 case 'warning': return styles.issueWarning;
 case 'info': return styles.issueInfo;
 default: return styles.issueInfo;
 }
 };

 return (
 <div>
 <p className="text-sm mb-2">{issues.length} problema pronađeno</p>
 <ul className="space-y-2">
 {issues.map((issue, index) => (
 <li key={index} className={`text-sm ${styles.issueItem} ${getIssueClass(issue.severity)}`}>
 <div className="font-medium">{issue.name}</div>
 <div className="text-gray-600">{issue.description}</div>
 </li>
 ))}
 </ul>
 </div>
 );
} 
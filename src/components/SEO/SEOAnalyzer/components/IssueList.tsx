import type { SEOIssue } from '../types/seoTypes';


interface IssueListProps {
 issues: SEOIssue[];
}

export function IssueList({ issues }: IssueListProps) {
 // Get issue class based on severity
 const getIssueClass = (severity: string) => {
 switch (severity) {
 case 'error': return 'border-l-4 border-red-500 bg-red-50';
 case 'warning': return 'border-l-4 border-yellow-500 bg-yellow-50';
 case 'info': return 'border-l-4 border-blue-500 bg-blue-50';
 default: return 'border-l-4 border-blue-500 bg-blue-50';
 }
 };

 return (
 <div>
 <p className="text-sm mb-2">{issues.length} problema pronađeno</p>
 <ul className="space-y-2">
 {issues.map((issue, index) => (
 <li key={index} className={`text-sm p-3 rounded ${getIssueClass(issue.severity)}`}>
 <div className="font-medium">{issue.name}</div>
 <div className="text-gray-600">{issue.description}</div>
 </li>
 ))}
 </ul>
 </div>
 );
} 
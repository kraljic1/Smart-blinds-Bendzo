import type { SEOIssue } from '../types/seoTypes';

export function checkCanonical(document: Document): SEOIssue[] {
 const issues: SEOIssue[] = [];
 
 if (!document.querySelector('link[rel="canonical"]')) {
 issues.push({
 name: 'Nedostaje Kanonička Oznaka',
 description: 'Stranica nema kanoničku oznaku',
 severity: 'warning'
 });
 }
 
 return issues;
}

export function checkStructuredData(document: Document): SEOIssue[] {
 const issues: SEOIssue[] = [];
 
 if (!document.querySelector('script[type="application/ld+json"]')) {
 issues.push({
 name: 'Nedostaju Strukturirani Podaci',
 description: 'Na stranici nisu pronađeni strukturirani podaci (JSON-LD)',
 severity: 'info'
 });
 }
 
 return issues;
} 
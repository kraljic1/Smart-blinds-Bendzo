import type { SEOIssue } from '../types/seoTypes';

export function checkHeadings(document: Document): SEOIssue[] {
 const issues: SEOIssue[] = [];
 const h1Elements = document.querySelectorAll('h1');
 
 if (h1Elements.length === 0) {
 issues.push({
 name: 'Nedostaje H1',
 description: 'Stranica nema H1 naslov',
 severity: 'error'
 });
 } else if (h1Elements.length > 1) {
 issues.push({
 name: 'Više H1 Oznaka',
 description: 'Stranica ima više H1 naslova. Koristite samo jedan glavni H1 naslov',
 severity: 'warning'
 });
 }
 
 return issues;
} 
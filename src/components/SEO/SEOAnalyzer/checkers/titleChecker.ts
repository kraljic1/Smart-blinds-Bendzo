import type { SEOIssue } from '../types/seoTypes';

export function checkTitle(document: Document): SEOIssue[] {
  const issues: SEOIssue[] = [];
  const title = document.querySelector('title')?.textContent;
  
  if (!title) {
    issues.push({
      name: 'Nedostaje Naslov',
      description: 'Stranica nema oznaku naslova',
      severity: 'error'
    });
  } else if (title.length < 10) {
    issues.push({
      name: 'Prekratak Naslov',
      description: 'Oznaka naslova je prekratka. Ciljajte na 50-60 znakova',
      severity: 'warning'
    });
  } else if (title.length > 60) {
    issues.push({
      name: 'Predug Naslov',
      description: 'Oznaka naslova je preduga. Držite je ispod 60 znakova',
      severity: 'warning'
    });
  }
  
  return issues;
} 
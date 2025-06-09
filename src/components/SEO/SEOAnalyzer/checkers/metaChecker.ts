import type { SEOIssue } from '../types/seoTypes';

export function checkMetaDescription(document: Document): SEOIssue[] {
  const issues: SEOIssue[] = [];
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
  
  if (!metaDescription) {
    issues.push({
      name: 'Nedostaje Meta Opis',
      description: 'Stranica nema meta opis',
      severity: 'error'
    });
  } else if (metaDescription.length < 50) {
    issues.push({
      name: 'Prekratak Meta Opis',
      description: 'Meta opis je prekratak. Ciljajte na 150-160 znakova',
      severity: 'warning'
    });
  } else if (metaDescription.length > 160) {
    issues.push({
      name: 'Predug Meta Opis',
      description: 'Meta opis je predug. Držite ga ispod 160 znakova',
      severity: 'warning'
    });
  }
  
  return issues;
} 
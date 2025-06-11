import type { SEOIssue } from '../types/seoTypes';

export function checkImages(document: Document): SEOIssue[] {
 const issues: SEOIssue[] = [];
 const images = document.querySelectorAll('img');
 let imagesWithoutAlt = 0;
 
 images.forEach(img => {
 if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
 imagesWithoutAlt++;
 }
 });
 
 if (imagesWithoutAlt > 0) {
 issues.push({
 name: 'Slike Bez Alt Teksta',
 description: `${imagesWithoutAlt} slika(e) bez alt teksta`,
 severity: 'warning'
 });
 }
 
 return issues;
} 
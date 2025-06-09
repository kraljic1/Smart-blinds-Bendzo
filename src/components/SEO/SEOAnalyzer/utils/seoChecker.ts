import type { SEOIssue } from '../types/seoTypes';
import { checkTitle } from '../checkers/titleChecker';
import { checkMetaDescription } from '../checkers/metaChecker';
import { checkHeadings } from '../checkers/headingChecker';
import { checkImages } from '../checkers/imageChecker';
import { checkCanonical, checkStructuredData } from '../checkers/technicalChecker';

export function performBasicSEOChecks(document: Document): SEOIssue[] {
  const allIssues: SEOIssue[] = [];
  
  // Run all individual checkers
  allIssues.push(...checkTitle(document));
  allIssues.push(...checkMetaDescription(document));
  allIssues.push(...checkHeadings(document));
  allIssues.push(...checkImages(document));
  allIssues.push(...checkCanonical(document));
  allIssues.push(...checkStructuredData(document));
  
  return allIssues;
} 
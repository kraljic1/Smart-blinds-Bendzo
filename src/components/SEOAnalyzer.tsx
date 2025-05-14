import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type SEOIssue = {
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
};

interface SEOAnalyzerProps {
  showResults?: boolean; // Set to false in production or true only for admins
}

// Basic SEO checks that can be performed without external libraries
const performBasicSEOChecks = (document: Document): SEOIssue[] => {
  const issues: SEOIssue[] = [];
  
  // Check title
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
  
  // Check meta description
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
  
  // Check headings
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
  
  // Check images for alt text
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
  
  // Check canonical link
  if (!document.querySelector('link[rel="canonical"]')) {
    issues.push({
      name: 'Nedostaje Kanonička Oznaka',
      description: 'Stranica nema kanoničku oznaku',
      severity: 'warning'
    });
  }
  
  // Check structured data
  if (!document.querySelector('script[type="application/ld+json"]')) {
    issues.push({
      name: 'Nedostaju Strukturirani Podaci',
      description: 'Na stranici nisu pronađeni strukturirani podaci (JSON-LD)',
      severity: 'info'
    });
  }
  
  return issues;
};

const SEOAnalyzer: React.FC<SEOAnalyzerProps> = ({ showResults = false }) => {
  const [issues, setIssues] = useState<SEOIssue[]>([]);
  const [score, setScore] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Only run in development or when showResults is true
    if (process.env.NODE_ENV !== 'development' && !showResults) {
      return;
    }
    
    // Perform basic SEO checks directly on the document
    const seoIssues = performBasicSEOChecks(document);
    
    // Calculate score based on issues found
    // This is a simple scoring system - fewer issues = higher score
    const maxIssues = 10; // Maximum number of possible issues
    const actualIssues = seoIssues.length;
    const calculatedScore = Math.max(0, Math.min(100, Math.round(100 * (1 - actualIssues / maxIssues))));
    
    setIssues(seoIssues);
    setScore(calculatedScore);
    
  }, [location.pathname, showResults]);

  // Don't render anything in production unless explicitly requested
  if ((process.env.NODE_ENV !== 'development' && !showResults) || !issues.length) {
    return null;
  }

  return (
    <div className="seo-analyzer fixed bottom-0 right-0 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-tl-lg border border-gray-300 dark:border-gray-700 z-40 max-w-md overflow-auto max-h-[60vh]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">SEO Analiza: {score}%</h2>
        <div className="w-16 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
      
      <div>
        <p className="text-sm mb-2">{issues.length} problema pronađeno</p>
        <ul className="space-y-2">
          {issues.map((issue, index) => (
            <li key={index} className="text-sm border-l-4 pl-2 py-1" 
              style={{ 
                borderColor: issue.severity === 'error' ? 'red' 
                  : issue.severity === 'warning' ? 'orange' : 'blue' 
              }}
            >
              <div className="font-medium">{issue.name}</div>
              <div className="text-gray-600 dark:text-gray-400">{issue.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SEOAnalyzer; 
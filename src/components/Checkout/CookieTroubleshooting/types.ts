export interface CookieTroubleshootingGuideProps {
  onClose: () => void;
  onRetry: () => void;
}

export type BrowserType = 'chrome' | 'firefox' | 'safari' | 'brave';

export interface BrowserGuide {
  title: string;
  icon: string;
  steps: string[];
}

export interface BrowserGuides {
  [key: string]: BrowserGuide;
} 
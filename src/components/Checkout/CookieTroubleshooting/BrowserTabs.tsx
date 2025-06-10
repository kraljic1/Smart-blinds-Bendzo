import { BrowserType } from './types';
import { browserGuides, detectBrowser } from './browserData';
import { BrowserTabButton } from './BrowserTabButton';
import { BrowserGuideContent } from './BrowserGuideContent';

interface BrowserTabsProps {
  activeTab: BrowserType;
  onTabChange: (tab: BrowserType) => void;
}

export const BrowserTabs = ({ activeTab, onTabChange }: BrowserTabsProps) => {
  const currentBrowser = detectBrowser();

  return (
    <div className="browser-tabs">
      <div className="tab-buttons">
        {Object.entries(browserGuides).map(([key, guide]) => (
          <BrowserTabButton
            key={key}
            guide={guide}
            isActive={activeTab === key}
            isRecommended={currentBrowser === key}
            onClick={() => onTabChange(key as BrowserType)}
          />
        ))}
      </div>
      <BrowserGuideContent guide={browserGuides[activeTab]} />
    </div>
  );
}; 
import { useState } from 'react';
import './CookieTroubleshootingGuide.css';

interface CookieTroubleshootingGuideProps {
  onClose: () => void;
  onRetry: () => void;
}

type BrowserType = 'chrome' | 'firefox' | 'safari' | 'brave';

export function CookieTroubleshootingGuide({ onClose, onRetry }: CookieTroubleshootingGuideProps) {
  const [activeTab, setActiveTab] = useState<BrowserType>('chrome');

  const browserGuides = {
    chrome: {
      title: 'Google Chrome',
      icon: '🌐',
      steps: [
        'Kliknite na ikonu katanca pored URL-a',
        'Izaberite "Cookies"',
        'Omogućite "Third-party cookies" za ovaj sajt',
        'Osvežite stranicu'
      ]
    },
    firefox: {
      title: 'Mozilla Firefox',
      icon: '🦊',
      steps: [
        'Idite na Settings > Privacy & Security',
        'U sekciji "Cookies and Site Data"',
        'Kliknite "Manage Exceptions"',
        'Dodajte ovaj sajt kao izuzetak'
      ]
    },
    safari: {
      title: 'Safari',
      icon: '🧭',
      steps: [
        'Idite na Safari > Preferences',
        'Kliknite na "Privacy" tab',
        'Uklonite kvačicu sa "Prevent cross-site tracking"',
        'Osvežite stranicu'
      ]
    },
    brave: {
      title: 'Brave Browser',
      icon: '🦁',
      steps: [
        'Kliknite na Brave Shield ikonu',
        'Postavite "Cross-site cookies blocked" na "Allow"',
        'Ili isključite Shields za ovaj sajt',
        'Osvežite stranicu'
      ]
    }
  };

  const detectBrowser = (): BrowserType => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('brave')) return 'brave';
    if (userAgent.includes('firefox')) return 'firefox';
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'safari';
    return 'chrome';
  };

  const currentBrowser = detectBrowser();

  return (
    <div className="troubleshooting-overlay">
      <div className="troubleshooting-modal">
        <div className="troubleshooting-header">
          <h3>Rešavanje problema sa kolačićima</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="troubleshooting-content">
          <div className="problem-explanation">
            <div className="warning-box">
              <span className="warning-icon">⚠️</span>
              <div>
                <h4>Kolačići su blokirani</h4>
                <p>
                  Vaš browser blokira kolačiće potrebne za Stripe plaćanje. 
                  Ovo je česta sigurnosna mera u modernim browser-ima.
                </p>
              </div>
            </div>
          </div>

          <div className="browser-tabs">
            <div className="tab-buttons">
              {Object.entries(browserGuides).map(([key, guide]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as BrowserType)}
                  className={`tab-button ${activeTab === key ? 'active' : ''} ${currentBrowser === key ? 'recommended' : ''}`}
                >
                  <span className="browser-icon">{guide.icon}</span>
                  {guide.title}
                  {currentBrowser === key && <span className="recommended-badge">Preporučeno</span>}
                </button>
              ))}
            </div>

            <div className="tab-content">
              <div className="browser-guide">
                <h4>Instrukcije za {browserGuides[activeTab].title}:</h4>
                <ol>
                  {browserGuides[activeTab].steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="alternative-solutions">
            <h4>Alternativna rešenja:</h4>
            <div className="solution-cards">
              <div className="solution-card">
                <span className="solution-icon">🔄</span>
                <div>
                  <h5>Pokušajte u privatnom režimu</h5>
                  <p>Otvorite stranicu u incognito/private browsing režimu</p>
                </div>
              </div>
              <div className="solution-card">
                <span className="solution-icon">🌐</span>
                <div>
                  <h5>Koristite drugi browser</h5>
                  <p>Pokušajte sa drugim browser-om koji možda ima manje restriktivne postavke</p>
                </div>
              </div>
              <div className="solution-card">
                <span className="solution-icon">💰</span>
                <div>
                  <h5>Plaćanje gotovinom</h5>
                  <p>Izaberite opciju plaćanja gotovinom pri dostavi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="troubleshooting-actions">
          <button onClick={onRetry} className="retry-button">
            Pokušaj ponovo
          </button>
          <button onClick={onClose} className="close-guide-button">
            Zatvori vodič
          </button>
        </div>
      </div>
    </div>
  );
} 
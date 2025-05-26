import './BraveBrowserGuide.css';

interface BraveBrowserGuideProps {
  onRetry: () => void;
}

export function BraveBrowserGuide({ onRetry }: BraveBrowserGuideProps) {
  return (
    <div className="brave-guide-container">
      <div className="brave-guide-header">
        <svg 
          className="brave-guide-icon"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
        <h3>Sigurno plaćanje karticom</h3>
      </div>

      <div className="brave-guide-content">
        <p className="brave-guide-description">
          Vaš pregljednik štiti vašu privatnost blokiranjem vanjskih skripti. 
          Da biste omogućili sigurno plaćanje karticom, molimo slijedite ove korake:
        </p>

        <div className="browser-instructions">
          <div className="browser-section">
            <h4>
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY1NzIyIi8+Cjwvc3ZnPgo=" 
                alt="Brave" 
                className="browser-icon"
              />
              Za Brave pregljednik
            </h4>
            <ol className="instruction-list">
              <li>
                <strong>Kliknite na ikonu štita</strong> u adresnoj traci (desno od URL-a)
              </li>
              <li>
                <strong>Odaberite "Onemogući štitove za ovu stranicu"</strong>
              </li>
              <li>
                <strong>Osvježite stranicu</strong> klikom na gumb "Pokušaj ponovno" ispod
              </li>
            </ol>
          </div>

          <div className="browser-section">
            <h4>
              <svg className="browser-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              Za ostale preglednike
            </h4>
            <ul className="instruction-list">
              <li>Onemogućite ad blocker za ovu stranicu</li>
              <li>Dozvolite učitavanje vanjskih skripti</li>
              <li>Provjerite postavke privatnosti preglednika</li>
            </ul>
          </div>
        </div>

        <div className="security-note">
          <svg className="security-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <circle cx="12" cy="16" r="1"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <div>
            <strong>Vaša sigurnost je naša prioritet</strong>
            <p>
              Koristimo Stripe, vodeći svjetski sustav za sigurno procesiranje plaćanja. 
              Vaši podaci o kartici se nikad ne pohranjuju na našim serverima.
            </p>
          </div>
        </div>

        <div className="support-section">
          <h4>Trebate pomoć?</h4>
          <p>Ako i dalje imate problema s plaćanjem karticom nakon što ste slijedili upute:</p>
          <ul>
            <li>Kontaktirajte nas na <strong>info@bendzo.hr</strong></li>
            <li>Opišite problem koji imate</li>
            <li>Navesti koji pregljednik koristite</li>
          </ul>
        </div>
      </div>

      <div className="brave-guide-actions">
        <button 
          onClick={onRetry}
          className="retry-button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Pokušaj ponovno
        </button>
        
        <a 
          href="mailto:info@bendzo.hr?subject=Problem s plaćanjem&body=Imam problema s plaćanjem karticom na vašoj stranici."
          className="contact-button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Kontaktiraj podršku
        </a>
      </div>
    </div>
  );
} 
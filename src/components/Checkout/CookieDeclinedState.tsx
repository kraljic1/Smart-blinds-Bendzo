import React from 'react';

interface CookieDeclinedStateProps {
 onRetry: () => void;
 onShowTroubleshooting: () => void;
}

const CookieDeclinedState: React.FC<CookieDeclinedStateProps> = ({
 onRetry,
 onShowTroubleshooting
}) => {
 return (
 <div className="stripe-unavailable">
 <h3>Plaćanje karticom nije dostupno</h3>
 <p>
 Niste prihvatili kolačiće potrebne za plaćanje karticom. 
 Molimo izaberite gotovinu kao način plaćanja.
 </p>
 <div className="unavailable-actions">
 <button 
 onClick={onRetry}
 className="retry-button"
 >
 Pokušaj ponovo
 </button>
 <button 
 onClick={onShowTroubleshooting}
 className="help-button"
 >
 Pomoć sa kolačićima
 </button>
 </div>
 </div>
 );
};

export default CookieDeclinedState; 
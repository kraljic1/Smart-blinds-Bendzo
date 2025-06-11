interface TroubleshootingActionsProps {
 onRetry: () => void;
 onClose: () => void;
}

export const TroubleshootingActions = ({ onRetry, onClose }: TroubleshootingActionsProps) => {
 return (
 <div className="troubleshooting-actions">
 <button onClick={onRetry} className="retry-button">
 Pokušaj ponovo
 </button>
 <button onClick={onClose} className="close-guide-button">
 Zatvori vodič
 </button>
 </div>
 );
}; 
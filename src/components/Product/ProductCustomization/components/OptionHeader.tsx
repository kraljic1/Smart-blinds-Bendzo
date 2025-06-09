import React from 'react';
import { Info } from 'lucide-react';

interface OptionHeaderProps {
  optionId: string;
  optionName: string;
  hasInfo: boolean;
  onToggleInfo: (optionId: string) => void;
}

const OptionHeader: React.FC<OptionHeaderProps> = ({
  optionId,
  optionName,
  hasInfo,
  onToggleInfo
}) => {
  return (
    <div className="option-header">
      <h3 className="option-title">{optionName}</h3>
      {hasInfo && (
        <button 
          className="info-button" 
          onClick={() => onToggleInfo(optionId)}
        >
          <Info size={16} />
        </button>
      )}
    </div>
  );
};

export default OptionHeader; 
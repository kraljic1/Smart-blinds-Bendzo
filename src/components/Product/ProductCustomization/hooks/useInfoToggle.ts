import { useState } from 'react';

export const useInfoToggle = () => {
  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);

  const toggleInfo = (optionId: string) => {
    setActiveInfoId(activeInfoId === optionId ? null : optionId);
  };

  return {
    activeInfoId,
    toggleInfo
  };
}; 
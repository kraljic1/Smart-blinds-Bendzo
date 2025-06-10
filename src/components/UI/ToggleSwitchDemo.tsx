import React from 'react';
import { useToggleStates } from './ToggleSwitchDemo/hooks';
import {
  ColorVariantsSection,
  SizeVariantsSection,
  DisabledStateSection,
  CurrentStatesDisplay
} from './ToggleSwitchDemo/components';
import './ToggleSwitch.css';

const ToggleSwitchDemo: React.FC = () => {
  const { toggleStates, handleToggleChange } = useToggleStates();

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>Toggle Switch Demo</h2>
      
      <ColorVariantsSection 
        toggleStates={toggleStates} 
        handleToggleChange={handleToggleChange} 
      />
      
      <SizeVariantsSection 
        toggleStates={toggleStates} 
        handleToggleChange={handleToggleChange} 
      />
      
      <DisabledStateSection 
        toggleStates={toggleStates} 
        handleToggleChange={handleToggleChange} 
      />
      
      <CurrentStatesDisplay toggleStates={toggleStates} />
    </div>
  );
};

export default ToggleSwitchDemo; 
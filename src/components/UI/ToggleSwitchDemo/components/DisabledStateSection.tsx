import React from 'react';
import ToggleSwitch from '../../ToggleSwitch';
import { ToggleStates } from '../types';

interface DisabledStateSectionProps {
 toggleStates: ToggleStates;
 handleToggleChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DisabledStateSection = ({ toggleStates, handleToggleChange }: DisabledStateSectionProps) => {
 return (
 <div>
 <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Disabled State</h3>
 
 <ToggleSwitch
 id="disabled-toggle"
 name="disabled"
 checked={toggleStates.disabled}
 onChange={handleToggleChange('disabled')}
 label="Disabled toggle switch"
 variant="primary"
 size="medium"
 disabled={true}
 />
 </div>
 );
};

export default DisabledStateSection; 
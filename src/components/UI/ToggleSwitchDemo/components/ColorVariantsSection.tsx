import React from 'react';
import ToggleSwitch from '../../ToggleSwitch';
import { ToggleStates } from '../types';

interface ColorVariantsSectionProps {
 toggleStates: ToggleStates;
 handleToggleChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorVariantsSection = ({ toggleStates, handleToggleChange }: ColorVariantsSectionProps) => {
 return (
 <div style={{ marginBottom: '3rem' }}>
 <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Color Variants</h3>
 
 <ToggleSwitch
 id="primary-toggle"
 name="primary"
 checked={toggleStates.primary}
 onChange={handleToggleChange('primary')}
 label="Primary variant (Blue)"
 variant="primary"
 size="medium"
 />
 
 <ToggleSwitch
 id="success-toggle"
 name="success"
 checked={toggleStates.success}
 onChange={handleToggleChange('success')}
 label="Success variant (Green)"
 variant="success"
 size="medium"
 />
 
 <ToggleSwitch
 id="warning-toggle"
 name="warning"
 checked={toggleStates.warning}
 onChange={handleToggleChange('warning')}
 label="Warning variant (Orange)"
 variant="warning"
 size="medium"
 />
 </div>
 );
};

export default ColorVariantsSection; 
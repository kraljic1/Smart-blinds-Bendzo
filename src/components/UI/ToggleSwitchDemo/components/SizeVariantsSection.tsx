import React from 'react';
import ToggleSwitch from '../../ToggleSwitch';
import { ToggleStates } from '../types';

interface SizeVariantsSectionProps {
  toggleStates: ToggleStates;
  handleToggleChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SizeVariantsSection = ({ toggleStates, handleToggleChange }: SizeVariantsSectionProps) => {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Size Variants</h3>
      
      <ToggleSwitch
        id="small-toggle"
        name="small"
        checked={toggleStates.small}
        onChange={handleToggleChange('small')}
        label="Small size toggle"
        variant="primary"
        size="small"
      />
      
      <ToggleSwitch
        id="medium-toggle"
        name="medium"
        checked={toggleStates.medium}
        onChange={handleToggleChange('medium')}
        label="Medium size toggle (default)"
        variant="primary"
        size="medium"
      />
      
      <ToggleSwitch
        id="large-toggle"
        name="large"
        checked={toggleStates.large}
        onChange={handleToggleChange('large')}
        label="Large size toggle"
        variant="primary"
        size="large"
      />
    </div>
  );
};

export default SizeVariantsSection; 
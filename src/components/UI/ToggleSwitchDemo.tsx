import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import './ToggleSwitch.css';

const ToggleSwitchDemo: React.FC = () => {
  const [toggleStates, setToggleStates] = useState({
    primary: false,
    success: false,
    warning: false,
    small: false,
    medium: false,
    large: false,
    disabled: false
  });

  const handleToggleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleStates(prev => ({
      ...prev,
      [name]: event.target.checked
    }));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>Toggle Switch Demo</h2>
      
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

      <div style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Current States:</h4>
        <pre style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          {JSON.stringify(toggleStates, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ToggleSwitchDemo; 
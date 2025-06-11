import React from 'react';
import { ToggleStates } from '../types';

interface CurrentStatesDisplayProps {
 toggleStates: ToggleStates;
}

const CurrentStatesDisplay = ({ toggleStates }: CurrentStatesDisplayProps) => {
 return (
 <div style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
 <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Current States:</h4>
 <pre style={{ fontSize: '0.875rem', color: '#6b7280' }}>
 {JSON.stringify(toggleStates, null, 2)}
 </pre>
 </div>
 );
};

export default CurrentStatesDisplay; 
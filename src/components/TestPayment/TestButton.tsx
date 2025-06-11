import React from 'react';

interface TestButtonProps {
 onClick: () => void;
 testing: boolean;
}

const TestButton: React.FC<TestButtonProps> = ({ onClick, testing }) => {
 return (
 <button 
 onClick={onClick} 
 disabled={testing}
 style={{
 padding: '12px 24px',
 backgroundColor: testing ? '#ccc' : '#007bff',
 color: 'white',
 border: 'none',
 borderRadius: '4px',
 cursor: testing ? 'not-allowed' : 'pointer',
 marginBottom: '20px'
 }}
 >
 {testing ? 'Running Tests...' : 'Run All Tests'}
 </button>
 );
};

export default TestButton; 
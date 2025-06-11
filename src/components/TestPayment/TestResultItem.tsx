import React from 'react';
import { TestResult } from '../../hooks/usePaymentTests';

interface TestResultItemProps {
 result: TestResult;
}

const TestResultItem: React.FC<TestResultItemProps> = ({ result }) => {
 return (
 <div 
 style={{
 padding: '15px',
 margin: '10px 0',
 border: `2px solid ${result.success ? '#28a745' : '#dc3545'}`,
 borderRadius: '8px',
 backgroundColor: result.success ? '#d4edda' : '#f8d7da'
 }}
 >
 <h3 style={{ 
 margin: '0 0 10px 0', 
 color: result.success ? '#155724' : '#721c24' 
 }}>
 {result.success ? '✅' : '❌'} {result.test}
 </h3>
 
 {result.error && (
 <div style={{ 
 color: '#721c24', 
 fontWeight: 'bold',
 marginBottom: '10px' 
 }}>
 Error: {result.error}
 </div>
 )}
 
 {result.data && (
 <details style={{ marginTop: '10px' }}>
 <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
 View Response Data
 </summary>
 <pre style={{ 
 backgroundColor: '#f8f9fa',
 padding: '10px',
 borderRadius: '4px',
 overflow: 'auto',
 fontSize: '12px',
 marginTop: '10px'
 }}>
 {JSON.stringify(result.data, null, 2)}
 </pre>
 </details>
 )}
 </div>
 );
};

export default TestResultItem; 
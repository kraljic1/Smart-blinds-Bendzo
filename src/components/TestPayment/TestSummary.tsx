import React from 'react';
import { TestResult } from '../../hooks/usePaymentTests';

interface TestSummaryProps {
  results: TestResult[];
}

const TestSummary: React.FC<TestSummaryProps> = ({ results }) => {
  if (results.length === 0) return null;

  const passedCount = results.filter(r => r.success).length;
  const failedCount = results.filter(r => !r.success).length;
  const hasFailures = results.some(r => !r.success);

  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px' 
    }}>
      <h3>Summary</h3>
      <p>
        <strong>Passed:</strong> {passedCount} / {results.length}
      </p>
      <p>
        <strong>Failed:</strong> {failedCount} / {results.length}
      </p>
      
      {hasFailures && (
        <div style={{ marginTop: '15px' }}>
          <h4>Common Issues & Solutions:</h4>
          <ul style={{ textAlign: 'left' }}>
            <li>
              <strong>Environment Variables:</strong> Check if STRIPE_SECRET_KEY, SUPABASE_URL, 
              and SUPABASE_SERVICE_KEY are set in Netlify
            </li>
            <li>
              <strong>Function Deployment:</strong> Ensure functions are properly deployed to Netlify
            </li>
            <li>
              <strong>Database Connection:</strong> Verify Supabase credentials and database access
            </li>
            <li>
              <strong>CORS Issues:</strong> Check if requests are being blocked by browser security
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestSummary; 
import React from 'react';
import { usePaymentTests } from '../hooks/usePaymentTests';
import TestButton from '../components/TestPayment/TestButton';
import TestResultItem from '../components/TestPayment/TestResultItem';
import TestSummary from '../components/TestPayment/TestSummary';

export function TestPayment() {
  const { results, testing, runAllTests } = usePaymentTests();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Payment System Diagnostics</h1>
      <p>This page tests all the payment-related functions to identify issues.</p>
      
      <TestButton onClick={runAllTests} testing={testing} />

      <div style={{ marginTop: '20px' }}>
        {results.map((result, index) => (
          <TestResultItem key={index} result={result} />
        ))}
      </div>

      <TestSummary results={results} />
    </div>
  );
} 
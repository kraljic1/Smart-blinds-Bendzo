import React, { useState } from 'react';

interface TestResult {
  test: string;
  success: boolean;
  error?: string;
  data?: unknown;
}

export function TestPayment() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);

  const runTest = async (testName: string, testFn: () => Promise<unknown>) => {
    try {
      const data = await testFn();
      setResults(prev => [...prev, { test: testName, success: true, data }]);
    } catch (error) {
      setResults(prev => [...prev, { 
        test: testName, 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      }]);
    }
  };

  const runAllTests = async () => {
    setTesting(true);
    setResults([]);

    // Test 1: Debug Payment Function
    await runTest('Debug Payment Function', async () => {
      const response = await fetch('/.netlify/functions/debug-payment', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    });

    // Test 2: Get Orders Function
    await runTest('Get Orders Function', async () => {
      const response = await fetch('/.netlify/functions/get-orders', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    });

    // Test 3: Create Payment Intent
    await runTest('Create Payment Intent', async () => {
      const testData = {
        amount: 100,
        currency: 'eur',
        customer: {
          fullName: 'Test User',
          email: 'test@example.com',
          phone: '+385123456789',
          address: 'Test Address 123',
          shippingAddress: 'Test Address 123'
        },
        items: [{
          productId: 'test-product',
          productName: 'Test Product',
          quantity: 1,
          price: 100
        }],
        metadata: {
          shippingMethod: 'standard',
          notes: 'Test order'
        }
      };

      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    });

    // Test 4: Confirm Payment (with fake data)
    await runTest('Confirm Payment Function', async () => {
      const testData = {
        paymentIntentId: 'pi_test_123456789',
        customer: {
          fullName: 'Test User',
          email: 'test@example.com',
          phone: '+385123456789',
          address: 'Test Address 123',
          shippingAddress: 'Test Address 123',
          paymentMethod: 'Credit/Debit Card',
          shippingMethod: 'standard'
        },
        items: [{
          productId: 'test-product',
          productName: 'Test Product',
          quantity: 1,
          price: 100
        }],
        notes: 'Test order',
        totalAmount: 100,
        taxAmount: 0,
        shippingCost: 0
      };

      const response = await fetch('/.netlify/functions/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    });

    setTesting(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Payment System Diagnostics</h1>
      <p>This page tests all the payment-related functions to identify issues.</p>
      
      <button 
        onClick={runAllTests} 
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

      <div style={{ marginTop: '20px' }}>
        {results.map((result, index) => (
          <div 
            key={index}
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
        ))}
      </div>

      {results.length > 0 && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Summary</h3>
          <p>
            <strong>Passed:</strong> {results.filter(r => r.success).length} / {results.length}
          </p>
          <p>
            <strong>Failed:</strong> {results.filter(r => !r.success).length} / {results.length}
          </p>
          
          {results.some(r => !r.success) && (
            <div style={{ marginTop: '15px' }}>
              <h4>Common Issues & Solutions:</h4>
              <ul style={{ textAlign: 'left' }}>
                <li><strong>Environment Variables:</strong> Check if STRIPE_SECRET_KEY, SUPABASE_URL, and SUPABASE_SERVICE_KEY are set in Netlify</li>
                <li><strong>Function Deployment:</strong> Ensure functions are properly deployed to Netlify</li>
                <li><strong>Database Connection:</strong> Verify Supabase credentials and database access</li>
                <li><strong>CORS Issues:</strong> Check if requests are being blocked by browser security</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
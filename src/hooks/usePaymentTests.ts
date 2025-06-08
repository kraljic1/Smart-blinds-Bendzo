import { useState } from 'react';

export interface TestResult {
  test: string;
  success: boolean;
  error?: string;
  data?: unknown;
}

export const usePaymentTests = () => {
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

  return {
    results,
    testing,
    runAllTests
  };
}; 
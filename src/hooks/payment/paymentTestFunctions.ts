import { createTestPaymentData, createTestConfirmPaymentData } from './testData';

// Test function for debug payment endpoint
export const testDebugPaymentFunction = async (): Promise<unknown> => {
  const response = await fetch('/.netlify/functions/debug-payment', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
};

// Test function for get orders endpoint
export const testGetOrdersFunction = async (): Promise<unknown> => {
  const response = await fetch('/.netlify/functions/get-orders', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
};

// Test function for create payment intent endpoint
export const testCreatePaymentIntent = async (): Promise<unknown> => {
  const testData = createTestPaymentData();

  const response = await fetch('/.netlify/functions/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
};

// Test function for confirm payment endpoint
export const testConfirmPaymentFunction = async (): Promise<unknown> => {
  const testData = createTestConfirmPaymentData();

  const response = await fetch('/.netlify/functions/confirm-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
}; 
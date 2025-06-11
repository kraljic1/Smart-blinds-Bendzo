import { OrderData, OrderResponse } from './orderTypes';

/**
 * Submit order to the serverless function
 */
export const submitOrder = async (orderData: OrderData): Promise<OrderResponse> => {
 try {
 // Check if we're in development mode (localhost)
 const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
 
 // Determine the API endpoint - can use either /api or /.netlify/functions paths
 const apiUrl = '/.netlify/functions/process-order';
 
 // If in development mode and not using Netlify Dev, create a mock response
 if (isDevelopment) {
 console.log('Development mode detected - using Netlify Dev or mocking response');
 
 // Use a slight delay to simulate network request
 await new Promise(resolve => setTimeout(resolve, 500));
 
 // Check if Netlify functions are available by making a test request
 try {
 const testResponse = await fetch(apiUrl, { method: 'HEAD' });
 if (testResponse.status === 404) {
 // Netlify functions not available, return mock data
 console.log('Netlify functions not available, returning mock response');
 
 // Generate a mock order ID
 const mockOrderId = `DEV-ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
 
 // Log order data for debugging
 console.log('Order data that would be submitted:', orderData);
 
 return {
 success: true,
 orderId: mockOrderId,
 message: 'Order received (development mode - mock response)'
 };
 }
 } catch {
 // If the test request fails, return mock data
 console.log('Netlify functions not available, returning mock response');
 
 // Generate a mock order ID
 const mockOrderId = `DEV-ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
 
 // Log order data for debugging
 console.log('Order data that would be submitted:', orderData);
 
 return {
 success: true,
 orderId: mockOrderId,
 message: 'Order received (development mode - mock response)'
 };
 }
 }
 
 // Log the order data before submission for debugging
 console.log('Submitting order with data:', JSON.stringify(orderData));
 
 // Make the actual API call if we're in production or Netlify Dev is running
 const response = await fetch(apiUrl, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(orderData)
 });
 
 if (!response.ok) {
 throw new Error(`Server responded with status: ${response.status}`);
 }
 
 return await response.json();
 } catch (error) {
 console.error('Order submission failed:', error);
 return {
 success: false,
 message: error instanceof Error ? error.message : 'Order submission failed'
 };
 }
}; 
interface DeletedOrderData {
 orderId: string;
 customerName: string;
 customerEmail: string;
}

interface OrderData {
 order_id: string;
 customer_name: string;
 customer_email: string;
 [key: string]: unknown; // Allow additional properties
}

/**
 * Test function to check if an order exists
 * @param orderId The ID of the order to check
 * @returns Promise with order existence status
 */
export const checkOrderExists = async (orderId: string): Promise<{ exists: boolean; message: string; order?: OrderData }> => {
 try {
 console.log(`Checking if order exists: ${orderId}`);
 
 // Use the get-orders Netlify function to check if order exists
 const response = await fetch(`/.netlify/functions/get-orders?orderId=${encodeURIComponent(orderId)}`);
 
 console.log('Check order response status:', response.status);
 
 if (!response.ok) {
 return {
 exists: false,
 message: `Server error: ${response.status}`
 };
 }
 
 const result = await response.json();
 console.log('Check order response:', result);
 
 if (result.success && result.orders && result.orders.length > 0) {
 return {
 exists: true,
 message: 'Order found',
 order: result.orders[0]
 };
 } else {
 return {
 exists: false,
 message: 'Order not found in database'
 };
 }
 
 } catch (error) {
 console.error(`Failed to check order ${orderId}:`, error);
 return {
 exists: false,
 message: `Failed to check order: ${error instanceof Error ? error.message : 'Network error'}`
 };
 }
};

/**
 * Utility function to delete an order using the Netlify function
 * @param orderId The ID of the order to delete
 * @returns Promise with success status and message
 */
export const deleteOrder = async (
 orderId: string
): Promise<{ success: boolean; message: string; deletedOrder?: DeletedOrderData }> => {
 try {
 console.log(`Attempting to delete order: ${orderId}`);
 console.log('Order ID type:', typeof orderId);
 console.log('Order ID length:', orderId.length);
 
 // First, check if the order exists
 const existsCheck = await checkOrderExists(orderId);
 console.log('Order existence check:', existsCheck);
 
 if (!existsCheck.exists) {
 return {
 success: false,
 message: `Order not found: ${existsCheck.message}`
 };
 }
 
 // Use the Netlify function for server-side processing
 const response = await fetch('/.netlify/functions/delete-order', {
 method: 'DELETE',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify({
 orderId
 })
 });

 console.log('Response status:', response.status);
 console.log('Response headers:', Object.fromEntries(response.headers.entries()));

 const result = await response.json();
 console.log('Response body:', result);
 
 if (!response.ok) {
 console.error('Order deletion failed:', result);
 return {
 success: false,
 message: result.message || `Server error: ${response.status}`,
 };
 }

 console.log('Order deleted successfully:', result);
 return result;
 
 } catch (error) {
 console.error(`Failed to delete order ${orderId}:`, error);
 return {
 success: false,
 message: `Failed to delete order: ${error instanceof Error ? error.message : 'Network error'}`
 };
 }
}; 
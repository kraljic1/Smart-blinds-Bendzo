interface DeletedOrderData {
  orderId: string;
  customerName: string;
  customerEmail: string;
}

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

    const result = await response.json();
    
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
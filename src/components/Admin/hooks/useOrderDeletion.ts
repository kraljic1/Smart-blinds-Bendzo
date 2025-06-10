import { useState } from 'react';
import { deleteOrder } from '../../../utils/orderDeletion';

interface DeleteDialogState {
  isOpen: boolean;
  orderId: string;
  customerName: string;
}

interface UseOrderDeletionReturn {
  deleteDialog: DeleteDialogState;
  isDeleting: boolean;
  handleDeleteClick: (orderId: string, customerName: string) => void;
  handleDeleteConfirm: (onSuccess: () => void, onError: (message: string) => void) => Promise<void>;
  handleDeleteCancel: () => void;
}

/**
 * Custom hook for managing order deletion functionality
 * Handles dialog state, deletion process, and error handling
 */
export const useOrderDeletion = (): UseOrderDeletionReturn => {
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    isOpen: false,
    orderId: '',
    customerName: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (orderId: string, customerName: string) => {
    setDeleteDialog({
      isOpen: true,
      orderId,
      customerName
    });
  };

  const handleDeleteConfirm = async (
    onSuccess: () => void, 
    onError: (message: string) => void
  ) => {
    setIsDeleting(true);
    try {
      console.log('Starting order deletion process for:', deleteDialog.orderId);
      const result = await deleteOrder(deleteDialog.orderId);
      
      console.log('Delete order result:', result);
      
      if (result.success) {
        // Close dialog
        setDeleteDialog({ isOpen: false, orderId: '', customerName: '' });
        
        // Call success callback
        onSuccess();
        
        console.log('Order deleted successfully:', result.message);
      } else {
        // Call error callback with detailed message
        const errorMessage = `Greška pri brisanju narudžbe: ${result.message}`;
        onError(errorMessage);
        console.error('Failed to delete order:', result.message);
        
        // Log additional debugging information
        console.error('Order ID that failed to delete:', deleteDialog.orderId);
        console.error('Order ID type:', typeof deleteDialog.orderId);
        console.error('Order ID length:', deleteDialog.orderId.length);
      }
    } catch (error) {
      console.error('Unexpected error during deletion:', error);
      const errorMessage = `Neočekivana greška pri brisanju narudžbe: ${error instanceof Error ? error.message : 'Nepoznata greška'}`;
      onError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, orderId: '', customerName: '' });
  };

  return {
    deleteDialog,
    isDeleting,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel
  };
}; 
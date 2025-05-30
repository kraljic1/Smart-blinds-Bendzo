import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteOrderDialogProps {
  isOpen: boolean;
  orderId: string;
  customerName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

const DeleteOrderDialog: React.FC<DeleteOrderDialogProps> = ({
  isOpen,
  orderId,
  customerName,
  onConfirm,
  onCancel,
  isDeleting
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onCancel}
        />

        {/* Dialog */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Obriši Narudžbu
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Jeste li sigurni da želite obrisati narudžbu <strong>{orderId}</strong> od kupca <strong>{customerName}</strong>?
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-medium">
                  Ova akcija se ne može poništiti. Svi podaci o narudžbi će biti trajno obrisani.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Brisanje...' : 'Obriši Narudžbu'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Odustani
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrderDialog; 
import React, { useState } from 'react';
import { CreditCard, Mail, Phone, Copy, Check } from 'lucide-react';

interface ManualPaymentOptionProps {
  orderTotal: number;
  currency: string;
  onContactSupport: () => void;
  className?: string;
}

export function ManualPaymentOption({ 
  orderTotal, 
  currency, 
  onContactSupport, 
  className = '' 
}: ManualPaymentOptionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    bankName: "Erste Bank",
    iban: "HR1234567890123456789",
    swift: "ESBCHR22",
    accountHolder: "Your Company Name",
    reference: `ORDER-${Date.now()}`
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('hr-HR', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2
    }).format(amount / 100);
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Alternative Payment Methods
        </h3>
        <p className="text-gray-600 text-sm">
          Complete your order using one of the options below
        </p>
      </div>

      <div className="space-y-6">
        {/* Bank Transfer Option */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Bank Transfer
          </h4>
          
          <div className="bg-gray-50 rounded-md p-3 mb-4">
            <div className="text-sm text-gray-700 mb-2">
              <strong>Total Amount: {formatPrice(orderTotal)}</strong>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bank:</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{bankDetails.bankName}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">IBAN:</span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm">{bankDetails.iban}</span>
                <button
                  onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Copy IBAN"
                >
                  {copiedField === 'iban' ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">SWIFT:</span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm">{bankDetails.swift}</span>
                <button
                  onClick={() => copyToClipboard(bankDetails.swift, 'swift')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Copy SWIFT"
                >
                  {copiedField === 'swift' ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reference:</span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm">{bankDetails.reference}</span>
                <button
                  onClick={() => copyToClipboard(bankDetails.reference, 'reference')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Copy Reference"
                >
                  {copiedField === 'reference' ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-blue-800 text-xs">
              <strong>Important:</strong> Please include the reference number in your transfer description. 
              Your order will be processed once payment is received (usually within 1-2 business days).
            </p>
          </div>
        </div>

        {/* Contact Support Option */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </h4>
          
          <p className="text-gray-600 text-sm mb-4">
            Our support team can help you complete your payment or provide additional payment options.
          </p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>support@yourcompany.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>+385 1 234 5678</span>
            </div>
          </div>
          
          <button
            onClick={onContactSupport}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Contact Support Team
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 mb-2">
            Next Steps
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700">
            <li>Choose your preferred payment method above</li>
            <li>Complete the payment using the provided details</li>
            <li>We'll send you an order confirmation via email</li>
            <li>Your order will be processed once payment is received</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 
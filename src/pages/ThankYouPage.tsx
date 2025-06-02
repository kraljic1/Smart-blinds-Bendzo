import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader, User, Mail, Phone, MapPin, CreditCard, Truck, FileText, Calendar, Clock } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import { useBasketContext } from '../hooks/useBasketContext';
import { useOrderContext } from '../context/useOrderContext';
import { getOrderById } from '../utils/orderUtils';

// Type for order items
interface OrderItemDisplay {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  width?: number;
  height?: number;
  options?: Record<string, string | number | boolean>;
}

// Extended type that matches the structure returned by getOrderById from orderUtils
interface ExtendedOrderData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
  totalAmount: number;
  taxAmount?: number;
  shippingCost?: number;
  discountAmount?: number;
  discountCode?: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  trackingNumber?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  items: OrderItemDisplay[];
}

const ThankYouPage: React.FC = () => {
  const { clearBasket } = useBasketContext();
  const { lastOrder } = useOrderContext();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<ExtendedOrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Clear the basket when this page is reached
    clearBasket();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [clearBasket]);

  useEffect(() => {
    // If there's no order info, redirect to home
    if (!lastOrder) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 100);
      
      return () => clearTimeout(timer);
    }
    
    // Fetch order details from Supabase
    if (lastOrder?.orderId) {
      setIsLoading(true);
      getOrderById(lastOrder.orderId)
        .then(data => {
          setOrderDetails(data as unknown as ExtendedOrderData);
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lastOrder, navigate]);

  // If no order is found, show simple message (should redirect)
  if (!lastOrder) {
    return null;
  }

  // Get items from the order details
  const orderItems: OrderItemDisplay[] = orderDetails?.items || [];

  // Calculate subtotal from items
  const subtotal = orderItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const taxAmount = orderDetails?.taxAmount || (subtotal * 0.25); // 25% PDV
  const shippingCost = orderDetails?.shippingCost || 0;
  const total = orderDetails?.totalAmount || (subtotal + taxAmount + shippingCost);

  // Format date and time
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('hr-HR');
    } catch {
      return new Date().toLocaleDateString('hr-HR');
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('hr-HR');
    } catch {
      return new Date().toLocaleTimeString('hr-HR');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <SEO 
        title="Hvala vam na narudžbi | Smartblinds Croatia"
        description="Vaša narudžba je uspješno poslana."
      />
      
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Hvala vam na narudžbi!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Vaša narudžba je uspješno primljena i obrađuje se
          </p>
        </div>

        {/* Order Receipt */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Company Header */}
          <div className="bg-blue-600 dark:bg-blue-700 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">Smartblinds Croatia</h2>
                <div className="text-blue-100 space-y-1">
                  <p>Code and Sail d.o.o.</p>
                  <p>Mihovila Radića 3, 51511 Malinska</p>
                  <p>OIB: 12345678901</p>
                  <p>Email: info@smartblinds.hr | Tel: +385 98 986 1054</p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold mb-2">RAČUN</h3>
                <div className="text-blue-100 space-y-1">
                  <p><strong>Broj:</strong> {lastOrder.orderId}</p>
                  {orderDetails && (
                    <>
                      <p><strong>Datum:</strong> {formatDate(orderDetails.createdAt)}</p>
                      <p><strong>Vrijeme:</strong> {formatTime(orderDetails.createdAt)}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600 dark:text-gray-300">Učitavam detalje narudžbe...</span>
            </div>
          ) : orderDetails ? (
            <>
              {/* Customer Information */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Billing Info */}
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      <User className="w-5 h-5 mr-2" />
                      Podaci o kupcu
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <strong>{orderDetails.customerName}</strong>
                      </p>
                      <p className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {orderDetails.email}
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {orderDetails.phone}
                      </p>
                      <p className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                        <span>{orderDetails.billingAddress}</span>
                      </p>
                    </div>
                  </div>

                  {/* Shipping & Payment Info */}
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      <Truck className="w-5 h-5 mr-2" />
                      Dostava i plaćanje
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p className="flex items-center">
                        <Truck className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>Dostava:</strong> {orderDetails.shippingMethod}</span>
                      </p>
                      <p className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>Plaćanje:</strong> {orderDetails.paymentMethod}</span>
                      </p>
                      <p className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                        <span><strong>Adresa dostave:</strong><br />{orderDetails.shippingAddress}</span>
                      </p>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          orderDetails.paymentStatus === 'completed' ? 'bg-green-500' : 
                          orderDetails.paymentStatus === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                        <span><strong>Status plaćanja:</strong> {
                          orderDetails.paymentStatus === 'completed' ? 'Završeno' :
                          orderDetails.paymentStatus === 'pending' ? 'U tijeku' : 'Nepoznato'
                        }</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <FileText className="w-5 h-5 mr-2" />
                  Naručeni proizvodi
                </h3>
                
                {orderItems.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Proizvod</th>
                          <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">Količina</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">Cijena</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">Ukupno</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                            <td className="py-4 px-2">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{item.productName}</p>
                                {(item.width || item.height) && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Dimenzije: {item.width}cm × {item.height}cm
                                  </p>
                                )}
                                {item.options && Object.keys(item.options).length > 0 && (
                                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {Object.entries(item.options).map(([key, value]) => (
                                      <span key={key} className="mr-3">
                                        {key}: {String(value)}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-2 text-center text-gray-600 dark:text-gray-300">
                              {item.quantity}
                            </td>
                            <td className="py-4 px-2 text-right text-gray-600 dark:text-gray-300">
                              €{Number(item.unitPrice).toFixed(2)}
                            </td>
                            <td className="py-4 px-2 text-right font-medium text-gray-900 dark:text-white">
                              €{Number(item.subtotal).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">Nema dostupnih stavki narudžbe</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <div className="max-w-md ml-auto">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Međuzbroj:</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    {shippingCost > 0 && (
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Dostava:</span>
                        <span>€{shippingCost.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>PDV (25%):</span>
                      <span>€{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                        <span>UKUPNO:</span>
                        <span>€{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {orderDetails.notes && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    <FileText className="w-5 h-5 mr-2" />
                    Napomene
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{orderDetails.notes}</p>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">Nema dostupnih detalja narudžbe</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Što slijedi?</h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-green-600" />
              <span>Poslat ćemo vam potvrdu narudžbe na email</span>
            </li>
            <li className="flex items-start">
              <Clock className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
              <span>Kontaktirat ćemo vas za dogovaranje termina instalacije</span>
            </li>
            <li className="flex items-start">
              <Phone className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
              <span>Naš tim će vam se javiti u roku od 24 sata</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => window.print()}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <FileText className="w-5 h-5 mr-2" />
            Ispiši račun
          </button>
          
          <Link 
            to="/"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Povratak na početnu
          </Link>
          
          <Link 
            to="/products"
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            Nastavi kupovinu
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p className="mb-2">Imate pitanja o vašoj narudžbi?</p>
          <p>
            Kontaktirajte nas na{' '}
            <a href="mailto:info@smartblinds.hr" className="text-blue-600 hover:underline">
              info@smartblinds.hr
            </a>
            {' '}ili{' '}
            <a href="tel:+385989861054" className="text-blue-600 hover:underline">
              +385 98 986 1054
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage; 
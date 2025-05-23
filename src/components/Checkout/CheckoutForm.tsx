import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useOrderContext } from '../../context/useOrderContext';
import { countryPhoneCodes, CountryCode } from '../../data/phoneCodes';
import { submitOrder, basketItemsToOrderItems } from '../../utils/orderUtils';
import { 
  validatePhoneNumberRealTime, 
  getCountryCodeFromDialCode,
  getExamplePhoneNumber 
} from '../../utils/phoneValidation';
import './CheckoutForm.css';

export function CheckoutForm() {
  const { items, getTotalPrice, clearBasket } = useBasketContext();
  const { setLastOrder, loadOrderHistory } = useOrderContext();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+385', // Default to Croatia
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    sameAsBilling: true,
    paymentMethod: 'Cash on delivery',
    shippingMethod: 'Standard delivery',
    additionalNotes: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null as string | null
  });

  const [phoneValidation, setPhoneValidation] = useState({
    isValid: true,
    errorMessage: '',
    suggestion: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name === 'sameAsBilling') {
        setFormData(prev => ({
          ...prev,
          [name]: checked,
          shippingAddress: checked ? prev.address : prev.shippingAddress,
          shippingCity: checked ? prev.city : prev.shippingCity,
          shippingPostalCode: checked ? prev.postalCode : prev.shippingPostalCode
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      // Handle address changes for "same as billing" logic
      if ((name === 'address' || name === 'city' || name === 'postalCode') && formData.sameAsBilling) {
        const shippingFieldMap = {
          address: 'shippingAddress',
          city: 'shippingCity',
          postalCode: 'shippingPostalCode'
        };
        
        setFormData(prev => ({
          ...prev,
          [name]: value,
          [shippingFieldMap[name as keyof typeof shippingFieldMap]]: value
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));

        // Validate phone number in real-time
        if (name === 'phoneNumber' || name === 'phoneCode') {
          const phoneNumber = name === 'phoneNumber' ? value : formData.phoneNumber;
          const phoneCode = name === 'phoneCode' ? value : formData.phoneCode;
          const countryCode = getCountryCodeFromDialCode(phoneCode);
          
          if (countryCode && phoneNumber) {
            const validation = validatePhoneNumberRealTime(phoneNumber, countryCode);
            setPhoneValidation({
              isValid: validation.isValid,
              errorMessage: validation.errorMessage || '',
              suggestion: validation.suggestion || ''
            });
                      } else if (phoneNumber && phoneNumber.length > 0) {
              setPhoneValidation({
                isValid: false,
                errorMessage: 'Molimo odaberite pozivni broj zemlje',
                suggestion: ''
              });
          } else {
            setPhoneValidation({
              isValid: true,
              errorMessage: '',
              suggestion: ''
            });
          }
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    
    // Check if basket is empty
    if (items.length === 0) {
              setFormStatus({
          submitting: false,
          success: false,
          error: "Molimo dodajte proizvode u košaricu prije nastavka s narudžbom."
        });
      return;
    }
    
    setFormStatus({ submitting: true, success: false, error: null });
    
    try {
      // Prepare order data
      const orderData = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.phoneCode}${formData.phoneNumber}`,
          address: `${formData.address}, ${formData.postalCode} ${formData.city}`.trim(),
          shippingAddress: formData.sameAsBilling 
            ? `${formData.address}, ${formData.postalCode} ${formData.city}`.trim()
            : `${formData.shippingAddress}, ${formData.shippingPostalCode} ${formData.shippingCity}`.trim(),
          paymentMethod: formData.paymentMethod,
          shippingMethod: formData.shippingMethod
        },
        items: basketItemsToOrderItems(items),
        notes: formData.additionalNotes,
        totalAmount: getTotalPrice(),
        // Add tax calculation (example: 13% VAT)
        taxAmount: parseFloat((getTotalPrice() * 0.13).toFixed(2)),
        // Add shipping cost based on method
        shippingCost: formData.shippingMethod === 'Express delivery' ? 10 : 
                     formData.shippingMethod === 'Same day delivery' ? 20 : 0
      };
      
      // Save customer email for future order history lookups
      localStorage.setItem('customerEmail', formData.email);
      
      // Submit order to our serverless function
      const response = await submitOrder(orderData);
      
      if (response.success) {
        // Store the order in context
        setLastOrder(response);
        
        // Load order history for this customer
        await loadOrderHistory(formData.email);
        
        // Clear basket and redirect to thank you page
        clearBasket();
        navigate('/thank-you');
      } else {
        throw new Error(response.message || 'Order submission failed');
      }
    } catch (error) {
      console.error('Checkout form submission error:', error);
      
      const errorMessage = 'Došlo je do problema s vašom narudžbom. Molimo pokušajte ponovno ili kontaktirajte podršku.';
      
      setFormStatus({
        submitting: false,
        success: false,
        error: errorMessage
      });
    }
  };
  
  if (formStatus.success) {
    return (
      <div className="checkout-success" role="alert" aria-live="polite">
        <h2>Hvala vam na narudžbi!</h2>
        <p>Primili smo vašu narudžbu i uskoro ćemo vam se javiti.</p>
        <p>Uskoro ćete primiti potvrdu na <strong>{formData.email}</strong>.</p>
      </div>
    );
  }
  
  return (
    <div className="checkout-form-container">
      <h2>Dovršite vašu narudžbu</h2>
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="checkout-form"
        aria-label="Checkout form"
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Puno ime</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Unesite vaše puno ime"
                aria-required="true"
                autoComplete="name"
              />
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email adresa</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="vaš@email.com"
                aria-required="true"
                autoComplete="email"
              />
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
            </div>
          </div>
        </div>
        
        <div className="form-group phone-group">
          <label htmlFor="phoneNumber">Broj telefona</label>
          <div className="phone-input-container" role="group" aria-labelledby="phone-label">
            <span id="phone-label" className="sr-only">Broj telefona s pozivnim brojem zemlje</span>
            <div className="input-wrapper select-wrapper">
                              <select
                id="phoneCode"
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                className="phone-code-select"
                aria-label="Pozivni broj zemlje"
                required
                autoComplete="tel-country-code"
              >
                {countryPhoneCodes.map((country: CountryCode) => (
                  <option key={country.code} value={country.dial_code}>
                    {country.flag} {country.name} ({country.dial_code})
                  </option>
                ))}
              </select>
              <span className="select-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
            <div className="input-wrapper">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder={
                  getCountryCodeFromDialCode(formData.phoneCode) 
                    ? getExamplePhoneNumber(getCountryCodeFromDialCode(formData.phoneCode)!) 
                    : "Unesite vaš broj telefona"
                }
                className={`phone-number-input ${!phoneValidation.isValid && formData.phoneNumber ? 'phone-error' : ''}`}
                aria-required="true"
                pattern="[0-9\s\-\(\)]+"
                title="Molimo unesite važeći broj telefona"
                autoComplete="tel-national"
              />
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </span>
            </div>
            
            {/* Phone validation feedback */}
            {formData.phoneNumber && !phoneValidation.isValid && (
              <div className="phone-validation-error">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{phoneValidation.errorMessage}</span>
              </div>
            )}
            
            {phoneValidation.suggestion && (
              <div className="phone-validation-suggestion">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                <span>{phoneValidation.suggestion}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="address-section">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Adresa dostave
          </h3>
          
          <div className="form-group">
            <label htmlFor="address">Adresa</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Adresa (npr. Praska ulica 3)"
                aria-required="true"
                autoComplete="street-address"
              />
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>
              </span>
            </div>
          </div>
          
          <div className="form-row address-row">
            <div className="form-group">
              <label htmlFor="postalCode">Poštanski broj</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  placeholder="npr. 51511"
                  aria-required="true"
                  autoComplete="postal-code"
                  pattern="[0-9]{5}"
                  title="Molimo unesite 5-znamenkasti poštanski broj"
                />
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8m-4-4h8"></path></svg>
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="city">Grad</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="npr. Malinska"
                  aria-required="true"
                  autoComplete="address-level2"
                />
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18m-2-18v18m-8-18v18m-4-18v18M3 9l9-7 9 7"></path></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <label htmlFor="sameAsBilling">Ista kao adresa za naplatu</label>
          <input
            type="checkbox"
            id="sameAsBilling"
            name="sameAsBilling"
            checked={formData.sameAsBilling}
            onChange={handleChange}
          />
        </div>
        
        <div className="address-section">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20L21 3l-3 3L6 18l-2 2z"></path><path d="M21 14v5h-5M3 10v5h5"></path></svg>
            Adresa dostave
          </h3>
          
          <div className="form-group">
            <label htmlFor="shippingAddress">Adresa</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                required
                placeholder="Adresa (npr. Praska ulica 3)"
                aria-required="true"
                autoComplete="shipping street-address"
                disabled={formData.sameAsBilling}
              />
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>
              </span>
            </div>
          </div>
          
          <div className="form-row address-row">
            <div className="form-group">
              <label htmlFor="shippingPostalCode">Poštanski broj</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="shippingPostalCode"
                  name="shippingPostalCode"
                  value={formData.shippingPostalCode}
                  onChange={handleChange}
                  required
                  placeholder="npr. 51511"
                  aria-required="true"
                  autoComplete="shipping postal-code"
                  pattern="[0-9]{5}"
                  title="Molimo unesite 5-znamenkasti poštanski broj"
                  disabled={formData.sameAsBilling}
                />
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8m-4-4h8"></path></svg>
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="shippingCity">Grad</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="shippingCity"
                  name="shippingCity"
                  value={formData.shippingCity}
                  onChange={handleChange}
                  required
                  placeholder="npr. Malinska"
                  aria-required="true"
                  autoComplete="shipping address-level2"
                  disabled={formData.sameAsBilling}
                />
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18m-2-18v18m-8-18v18m-4-18v18M3 9l9-7 9 7"></path></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="paymentMethod">Način plaćanja</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            autoComplete="off"
          >
            <option value="Cash on delivery">Plaćanje pouzećem</option>
            <option value="Credit card">Kreditna kartica</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="shippingMethod">Način dostave</label>
          <select
            id="shippingMethod"
            name="shippingMethod"
            value={formData.shippingMethod}
            onChange={handleChange}
            required
            autoComplete="off"
          >
            <option value="Standard delivery">Standardna dostava</option>
            <option value="Express delivery">Brza dostava</option>
            <option value="Same day delivery">Dostava isti dan</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="additionalNotes">Dodatne napomene <span className="optional-label">(neobavezno)</span></label>
          <div className="input-wrapper textarea-wrapper">
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={4}
              placeholder="Posebni zahtjevi ili dodatne informacije"
              aria-label="Dodatne napomene ili zahtjevi"
              autoComplete="off"
            />
            <span className="input-icon textarea-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="15" y1="12" x2="3" y2="12"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
            </span>
          </div>
        </div>
        
        <div className="checkout-summary" aria-label="Sažetak narudžbe">
          <h3>Sažetak narudžbe</h3>
          <div className="checkout-items">
            {items.map((item, index) => (
              <div key={index} className="checkout-item">
                <div className="checkout-item-image">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className="checkout-item-content">
                  <div className="checkout-item-name">
                    {item.product.name}
                  </div>
                  <div className="checkout-item-quantity">
                    Količina: {item.quantity}
                  </div>
                </div>
                <div className="checkout-item-price">
                  €{(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>Ukupno:</span>
            <span>€{getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
        
        {formStatus.error && (
          <div className="checkout-error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {formStatus.error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="checkout-submit-btn"
          disabled={formStatus.submitting}
          aria-busy={formStatus.submitting ? "true" : "false"}
        >
          {formStatus.submitting ? (
            <>
              <span className="loading-spinner"></span>
              <span>Obrađuje se...</span>
            </>
          ) : (
            <>
              <span>Dovršite narudžbu</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
} 
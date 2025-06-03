import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div className="mt-8 text-center text-gray-500 dark:text-gray-400 print-hide">
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
  );
};

export default ContactInfo; 
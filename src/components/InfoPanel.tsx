import React from 'react';
import { X } from 'lucide-react';

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={(e) => e.stopPropagation()}
        />
      )}
      
      <div className={`
        fixed right-0 top-0 h-full w-full md:w-[400px] bg-white dark:bg-gray-800 z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">OUR MOTORS</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              All Smartblinds contain a <span className="font-semibold">wireless</span> motor. This motor is equipped with a battery, which lasts a very long time. Depending on the frequency of use and the size of your window decoration, you often need to charge the motor's battery once, twice or three times a year.
            </p>

            <p>
              With some products, you get the choice between 2 motor types. Here, the <span className="font-semibold">Motionblinds Bluetooth motor</span> is the basic variant. This one is slightly cheaper and you can control it in 3 ways: Via the pull cord, a remote control (add as an accessory) and with the Motionblinds Bluetooth App. The app allows you to control your blinds indoors using a Bluetooth connection (range of about 10 metres). You can also set timers on your motor via the app.
            </p>

            <p>
              The <span className="font-semibold">Eve Motionblinds motor</span> is slightly more expensive, but also offers more control options. Indeed, this 'smart' motor can be linked to your smart home, allowing you to control your blinds wherever you are in addition to the pull cord and remote control in your smart home app such as Apple Home. Additionally, in your smart home app, you can pair your Smartblinds with other smart devices, allowing you to start automations and scenes!
            </p>

            <p>
              The connection possibilities of the Eve Motionblinds motor can be different per product category. For more information on the connection and options per motor, you can click on the i's when choosing the motor in the configurator.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPanel;
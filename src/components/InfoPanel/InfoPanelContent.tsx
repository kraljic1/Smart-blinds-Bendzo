import React from 'react';

const InfoPanelContent: React.FC = () => {
  return (
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
  );
};

export default InfoPanelContent;
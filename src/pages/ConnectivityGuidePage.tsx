import { Link } from 'react-router-dom';
import { Wifi, Smartphone, Settings, CheckCircle } from 'lucide-react';

const ConnectivityGuidePage = () => {
 const steps = [
 {
 icon: <Settings className="w-8 h-8 text-blue-600"/>,
 title:"Power Up",
 description:"Ensure your smart blinds are powered on and in pairing mode",
 details: [
"Connect the power adapter or ensure batteries are installed",
"Press and hold the reset button for 5 seconds",
"The LED should start blinking to indicate pairing mode"
 ]
 },
 {
 icon: <Wifi className="w-8 h-8 text-blue-600"/>,
 title:"Network Setup",
 description:"Connect your smart blinds to your home network",
 details: [
"Open your smartphone's WiFi settings",
"Look for the smart blind's network (format: SmartBlinds_XXXX)",
"Connect to the network and wait for confirmation"
 ]
 },
 {
 icon: <Smartphone className="w-8 h-8 text-blue-600"/>,
 title:"App Configuration",
 description:"Complete the setup using our mobile app",
 details: [
"Download and open the SmartBlinds app",
"Follow the in-app setup wizard",
"Name your device and assign it to a room"
 ]
 }
 ];

 return (
 <div className="pt-24 pb-32">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="mb-12">
 <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect to Home</h1>
 <p className="text-xl text-gray-600">Set up your smart blinds with your home network in three easy steps</p>
 </div>

 <div className="space-y-12 mb-16">
 {steps.map((step, index) => (
 <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
 <div className="flex items-start">
 <div className="flex-shrink-0 mr-6">
 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
 {step.icon}
 </div>
 </div>
 <div className="flex-1">
 <h2 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h2>
 <p className="text-gray-600 mb-6">{step.description}</p>
 <ul className="space-y-3">
 {step.details.map((detail, i) => (
 <li key={i} className="flex items-start">
 <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1"/>
 <span className="text-gray-600">{detail}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 ))}
 </div>

 <div className="text-center">
 <p className="text-gray-600 mb-6">Ready to start controlling your smart blinds?</p>
 <Link
 to="/smart-control-guide"
 className="inline-flex items-center px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition"
 >
 Next: Smart Control Guide
 </Link>
 </div>
 </div>
 </div>
 );
};

export default ConnectivityGuidePage;
/**
 * This utility silences React development mode logs in the console
 * while preserving error and warning messages.
 */

export const disableReactDevLogs = () => {
 if (process.env.NODE_ENV !== 'production') {
 // Store original console methods
 const originalConsoleLog = console.log;
 const originalConsoleInfo = console.info;
 
 // Filter out React DevTools messages
 console.log = (...args) => {
 const stringArgs = args.map(arg => String(arg));
 const isReactDevLog = 
 stringArgs.some(arg => 
 arg.includes('Menu state updated:') || 
 arg.includes('Toggle button clicked, current state:')
 );
 
 if (!isReactDevLog) {
 originalConsoleLog(...args);
 }
 };
 
 console.info = (...args) => {
 const stringArgs = args.map(arg => String(arg));
 const isReactDevLog = 
 stringArgs.some(arg => 
 arg.includes('Menu state updated:') || 
 arg.includes('Toggle button clicked, current state:')
 );
 
 if (!isReactDevLog) {
 originalConsoleInfo(...args);
 }
 };
 }
};

export default disableReactDevLogs; 
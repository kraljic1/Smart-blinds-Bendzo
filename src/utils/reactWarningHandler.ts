/**
 * React Warning Handler
 * Helps capture and log React warnings in development mode
 */

interface ReactWarning {
 message: string;
 stack?: string;
 timestamp: Date;
}

class ReactWarningHandler {
 private warnings: ReactWarning[] = [];
 private originalConsoleWarn: typeof console.warn;
 private originalConsoleError: typeof console.error;

 constructor() {
 this.originalConsoleWarn = console.warn;
 this.originalConsoleError = console.error;
 
 if (import.meta.env.DEV) {
 this.interceptConsole();
 }
 }

 private interceptConsole() {
 console.warn = (...args: unknown[]) => {
 const message = args.join(' ');
 
 // Check if this is a React warning
 if (this.isReactWarning(message)) {
 this.logReactWarning(message);
 }
 
 // Still call original console.warn
 this.originalConsoleWarn.apply(console, args);
 };

 console.error = (...args: unknown[]) => {
 const message = args.join(' ');
 
 // Check if this is a React error
 if (this.isReactError(message)) {
 this.logReactWarning(message);
 }
 
 // Still call original console.error
 this.originalConsoleError.apply(console, args);
 };
 }

 private isReactWarning(message: string): boolean {
 const reactWarningPatterns = [
 'Warning: ',
 'Uncaught Invariant Violation',
 'warnOnInvalidChildren',
 'validateDOMNesting',
 'You may be attempting to nest',
 'components within each other',
 'which is not allowed'
 ];
 
 return reactWarningPatterns.some(pattern => 
 message.toLowerCase().includes(pattern.toLowerCase())
 );
 }

 private isReactError(message: string): boolean {
 const reactErrorPatterns = [
 'Invariant Violation',
 'React',
 'validateDOMNesting',
 'warnOnInvalidChildren'
 ];
 
 return reactErrorPatterns.some(pattern => 
 message.toLowerCase().includes(pattern.toLowerCase())
 );
 }

 private logReactWarning(message: string) {
 const warning: ReactWarning = {
 message,
 stack: new Error().stack,
 timestamp: new Date()
 };
 
 this.warnings.push(warning);
 
 // Log with better formatting
 console.group('🚨 React Warning Detected');
 console.log('Message:', message);
 console.log('Timestamp:', warning.timestamp.toISOString());
 console.log('Stack:', warning.stack);
 console.groupEnd();
 }

 public getWarnings(): ReactWarning[] {
 return [...this.warnings];
 }

 public clearWarnings(): void {
 this.warnings = [];
 }

 public getWarningsSummary(): string {
 if (this.warnings.length === 0) {
 return 'No React warnings detected';
 }

 const summary = this.warnings.reduce((acc, warning) => {
 const key = warning.message.substring(0, 100);
 acc[key] = (acc[key] || 0) + 1;
 return acc;
 }, {} as Record<string, number>);

 return Object.entries(summary)
 .map(([message, count]) => `${count}x: ${message}`)
 .join('\n');
 }
}

// Create singleton instance
export const reactWarningHandler = new ReactWarningHandler();

// Export utility functions
export const getReactWarnings = () => reactWarningHandler.getWarnings();
export const clearReactWarnings = () => reactWarningHandler.clearWarnings();
export const getWarningsSummary = () => reactWarningHandler.getWarningsSummary(); 
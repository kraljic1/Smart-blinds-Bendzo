/**
 * Modern Security Monitor
 * Orchestrates security scanning using modular scanner architecture
 */

import { SecurityMonitor } from './security-monitor/SecurityMonitor.js';
import { ReportGenerator } from './security-monitor/ReportGenerator.js';

const projectRoot = process.cwd();

/**
 * Main execution function
 */
async function runSecurityMonitoring() {
  console.log('🔒 Starting Modern Security Monitoring...\n');

  try {
    // Initialize security monitor
    const monitor = new SecurityMonitor(projectRoot);
    
    // Run comprehensive security check
    const exitCode = await monitor.runSecurityCheck();
    
    // Exit with appropriate code
    if (process.env.CI !== 'true') {
      process.exit(exitCode);
    }
    
    return exitCode;
    
  } catch (error) {
    console.error('❌ Security monitoring failed:', error.message);
    if (process.env.NODE_ENV === 'development') {
      console.error(error.stack);
    }
    
    if (process.env.CI !== 'true') {
      process.exit(1);
    }
    
    return 1;
  }
}

// Run if called directly - safer main module detection
const isMainModule = process.argv[1] && (
  import.meta.url === `file://${process.argv[1]}` || 
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('security-monitor.js')
);

if (isMainModule) {
  runSecurityMonitoring().catch(error => {
    console.error('Security monitoring failed:', error);
    process.exit(1);
  });
}

export { runSecurityMonitoring }; 
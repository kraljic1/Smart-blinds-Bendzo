#!/usr/bin/env node

/**
 * Security Monitoring Script - Modular Version
 * Performs comprehensive security checks and monitoring using modular components
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { SecurityMonitor } from './security-monitor/SecurityMonitor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Run security monitoring
const monitor = new SecurityMonitor(projectRoot);

monitor.runSecurityCheck()
  .then(exitCode => {
    if (process.env.CI !== 'true') {
      process.exit(exitCode);
    }
  })
  .catch(error => {
    console.error('Security monitoring failed:', error);
    process.exit(1);
  });

export { SecurityMonitor }; 
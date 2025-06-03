/**
 * Security Header Scanner
 * Validates security headers configuration in config files
 */

import fs from 'fs';
import path from 'path';
import { SECURITY_CONFIG } from '../config.js';

export class SecurityHeaderScanner {
  constructor() {
    this.configFilesChecked = 0;
  }

  /**
   * Validate security headers configuration
   * @param {string} projectRoot - Root directory of the project
   * @returns {Array} Array of security header configuration issues
   */
  async scan(projectRoot) {
    console.log('🔍 Validating security headers configuration...');
    
    const issues = [];
    const securityConfigPath = path.join(projectRoot, 'security.config.js');
    const netlifyConfigPath = path.join(projectRoot, 'netlify.toml');

    // Check security.config.js
    if (fs.existsSync(securityConfigPath)) {
      this.configFilesChecked++;
      const content = fs.readFileSync(securityConfigPath, 'utf8');
      
      for (const header of SECURITY_CONFIG.requiredSecurityHeaders) {
        if (!content.includes(header)) {
          issues.push({
            type: 'SECURITY_HEADERS',
            severity: 'MEDIUM',
            description: `Missing security header: ${header}`,
            file: 'security.config.js'
          });
        }
      }
    } else {
      issues.push({
        type: 'SECURITY_HEADERS',
        severity: 'HIGH',
        description: 'Missing security.config.js file',
        file: 'security.config.js'
      });
    }

    // Check netlify.toml for security headers
    if (fs.existsSync(netlifyConfigPath)) {
      this.configFilesChecked++;
      const content = fs.readFileSync(netlifyConfigPath, 'utf8');
      
      if (!content.includes('Content-Security-Policy')) {
        issues.push({
          type: 'SECURITY_HEADERS',
          severity: 'MEDIUM',
          description: 'CSP not configured in netlify.toml',
          file: 'netlify.toml'
        });
      }
    }

    console.log(`   Checked ${this.configFilesChecked} configuration files\n`);
    return issues;
  }

  /**
   * Get number of config files checked
   * @returns {number} Number of config files checked
   */
  getConfigFilesChecked() {
    return this.configFilesChecked;
  }
} 
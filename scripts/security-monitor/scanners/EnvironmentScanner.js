/**
 * Environment Scanner
 * Validates environment configuration and checks for misplaced secrets
 */

import fs from 'fs';
import path from 'path';
import { SECURITY_CONFIG } from '../config.js';

export class EnvironmentScanner {
  constructor() {
    this.envFilesChecked = 0;
  }

  /**
   * Validate environment configuration
   * @param {string} projectRoot - Root directory of the project
   * @returns {Array} Array of environment configuration issues
   */
  async scan(projectRoot) {
    console.log('🔍 Validating environment configuration...');
    
    const issues = [];

    for (const envFile of SECURITY_CONFIG.envFiles) {
      const envPath = path.join(projectRoot, envFile);
      if (fs.existsSync(envPath)) {
        this.envFilesChecked++;
        const content = fs.readFileSync(envPath, 'utf8');
        
        // Check if .env file contains production secrets
        if (content.includes('sk_live_') && envFile !== '.env.production') {
          issues.push({
            type: 'ENVIRONMENT_CONFIG',
            severity: 'CRITICAL',
            description: `Production secrets found in ${envFile}`,
            file: envFile
          });
        }

        // Check for missing required environment variables
        for (const requiredVar of SECURITY_CONFIG.requiredEnvVars) {
          if (!content.includes(requiredVar)) {
            issues.push({
              type: 'ENVIRONMENT_CONFIG',
              severity: 'MEDIUM',
              description: `Missing required environment variable: ${requiredVar}`,
              file: envFile
            });
          }
        }
      }
    }

    console.log(`   Checked ${this.envFilesChecked} environment files\n`);
    return issues;
  }

  /**
   * Get number of environment files checked
   * @returns {number} Number of environment files checked
   */
  getEnvFilesChecked() {
    return this.envFilesChecked;
  }
} 
/**
 * File Permission Scanner
 * Checks file permissions for security issues on sensitive files
 */

import fs from 'fs';
import path from 'path';
import { SECURITY_CONFIG } from '../config.js';

export class FilePermissionScanner {
  constructor() {
    this.filesChecked = 0;
  }

  /**
   * Check file permissions for security issues
   * @param {string} projectRoot - Root directory of the project
   * @returns {Array} Array of file permission issues
   */
  async scan(projectRoot) {
    console.log('🔍 Checking file permissions...');
    
    const issues = [];

    for (const file of SECURITY_CONFIG.sensitiveFiles) {
      const filePath = path.join(projectRoot, file);
      if (fs.existsSync(filePath)) {
        this.filesChecked++;
        const stats = fs.statSync(filePath);
        const mode = stats.mode;
        
        // Check if file is world-readable (on Unix systems)
        if (process.platform !== 'win32' && (mode & 0o004)) {
          issues.push({
            type: 'FILE_PERMISSIONS',
            severity: 'MEDIUM',
            description: `File ${file} is world-readable`,
            file
          });
        }
      }
    }

    console.log(`   Checked ${this.filesChecked} sensitive files\n`);
    return issues;
  }

  /**
   * Get number of files checked
   * @returns {number} Number of files checked
   */
  getFilesChecked() {
    return this.filesChecked;
  }
} 
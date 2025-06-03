/**
 * Sensitive Data Scanner
 * Scans source code for sensitive data patterns like API keys, passwords, etc.
 */

import fs from 'fs';
import path from 'path';
import { SECURITY_CONFIG } from '../config.js';
import { getLineNumber, shouldScanFile, shouldSkipDirectory } from '../utils.js';

export class SensitiveDataScanner {
  constructor() {
    this.stats = {
      filesScanned: 0
    };
  }

  /**
   * Scan for sensitive data patterns in specified paths
   * @param {string} projectRoot - Root directory of the project
   * @returns {Array} Array of security issues found
   */
  async scan(projectRoot) {
    console.log('🔍 Scanning for sensitive data patterns...');
    
    const issues = [];

    for (const scanPath of SECURITY_CONFIG.scanPaths) {
      const fullPath = path.join(projectRoot, scanPath);
      if (fs.existsSync(fullPath)) {
        const pathIssues = await this.scanDirectory(fullPath, projectRoot);
        issues.push(...pathIssues);
      }
    }

    console.log(`   Scanned ${this.stats.filesScanned} files\n`);
    return issues;
  }

  /**
   * Recursively scan directory for security issues
   * @param {string} dirPath - Directory path to scan
   * @param {string} projectRoot - Project root for relative paths
   * @returns {Array} Array of security issues found
   */
  async scanDirectory(dirPath, projectRoot) {
    const issues = [];
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        if (!shouldSkipDirectory(item)) {
          const dirIssues = await this.scanDirectory(itemPath, projectRoot);
          issues.push(...dirIssues);
        }
      } else if (stat.isFile()) {
        if (shouldScanFile(item)) {
          const fileIssues = await this.scanFile(itemPath, projectRoot);
          issues.push(...fileIssues);
        }
      }
    }

    return issues;
  }

  /**
   * Scan individual file for security issues
   * @param {string} filePath - File path to scan
   * @param {string} projectRoot - Project root for relative paths
   * @returns {Array} Array of security issues found
   */
  async scanFile(filePath, projectRoot) {
    this.stats.filesScanned++;
    const issues = [];

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(projectRoot, filePath);

      for (const { pattern, description, severity } of SECURITY_CONFIG.sensitivePatterns) {
        const matches = content.match(pattern);
        if (matches) {
          for (const match of matches) {
            issues.push({
              type: 'SENSITIVE_DATA',
              severity,
              description,
              file: relativePath,
              match: match.substring(0, 50) + (match.length > 50 ? '...' : ''),
              line: getLineNumber(content, match)
            });
          }
        }
      }
    } catch (error) {
      console.warn(`   Warning: Could not scan ${filePath}: ${error.message}`);
    }

    return issues;
  }

  /**
   * Get scanning statistics
   * @returns {Object} Scanning statistics
   */
  getStats() {
    return this.stats;
  }
} 
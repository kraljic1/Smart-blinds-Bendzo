/**
 * Sensitive Data Scanner
 * Scans source code for sensitive data patterns like API keys, passwords, etc.
 */

import fs from 'fs';
import path from 'path';

export class SensitiveDataScanner {
  constructor() {
    this.stats = {
      filesScanned: 0,
      patternsFound: 0
    };
    
    this.sensitivePatterns = [
      {
        pattern: /console\.log\(/g,
        description: 'Console.log statement (potential info disclosure)',
        severity: 'LOW'
      },
      {
        pattern: /console\.error\(/g,
        description: 'Console.error statement (potential info disclosure)',
        severity: 'LOW'
      },
      {
        pattern: /sk_live_[a-zA-Z0-9]+/g,
        description: 'Stripe live secret key',
        severity: 'CRITICAL'
      },
      {
        pattern: /sk_test_[a-zA-Z0-9]+/g,
        description: 'Stripe test secret key',
        severity: 'HIGH'
      },
      {
        pattern: /pk_live_[a-zA-Z0-9]+/g,
        description: 'Stripe live publishable key',
        severity: 'MEDIUM'
      },
      {
        pattern: /(?:password|pwd|pass)\s*[:=]\s*['"][^'"]+['"]/gi,
        description: 'Hardcoded password',
        severity: 'HIGH'
      },
      {
        pattern: /(?:api[_-]?key|apikey)\s*[:=]\s*['"][^'"]+['"]/gi,
        description: 'Hardcoded API key',
        severity: 'HIGH'
      },
      {
        pattern: /(?:secret|token)\s*[:=]\s*['"][^'"]+['"]/gi,
        description: 'Hardcoded token',
        severity: 'MEDIUM'
      },
      {
        pattern: /eval\s*\(/g,
        description: 'Use of eval() function',
        severity: 'HIGH'
      }
    ];
  }

  /**
   * Scan project for sensitive data patterns
   * @param {string} projectRoot - Root directory to scan
   * @returns {Array} Array of security issues found
   */
  async scan(projectRoot) {
    console.log('🔍 Scanning for sensitive data patterns...');
    
    const issues = [];
    const scanPaths = ['src', 'netlify/functions', 'scripts'];
    
    for (const scanPath of scanPaths) {
      const fullPath = path.join(projectRoot, scanPath);
      if (fs.existsSync(fullPath)) {
        const pathIssues = await this.scanDirectory(fullPath, projectRoot);
        issues.push(...pathIssues);
      }
    }
    
    console.log(`   Scanned ${this.stats.filesScanned} files, found ${issues.length} issues\n`);
    return issues;
  }

  /**
   * Recursively scan directory
   * @param {string} dirPath - Directory to scan
   * @param {string} projectRoot - Project root for relative paths
   * @returns {Array} Issues found in directory
   */
  async scanDirectory(dirPath, projectRoot) {
    const issues = [];
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Skip irrelevant directories
        if (!['node_modules', '.git', 'dist', 'build', '.next'].includes(item)) {
          const dirIssues = await this.scanDirectory(itemPath, projectRoot);
          issues.push(...dirIssues);
        }
      } else if (stat.isFile()) {
        // Only scan relevant file types
        const ext = path.extname(item).toLowerCase();
        if (['.js', '.ts', '.tsx', '.jsx', '.json'].includes(ext)) {
          const fileIssues = await this.scanFile(itemPath, projectRoot);
          issues.push(...fileIssues);
        }
      }
    }

    return issues;
  }

  /**
   * Scan individual file for security issues
   * @param {string} filePath - File to scan
   * @param {string} projectRoot - Project root for relative paths
   * @returns {Array} Issues found in file
   */
  async scanFile(filePath, projectRoot) {
    this.stats.filesScanned++;
    const issues = [];

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(projectRoot, filePath);

      for (const { pattern, description, severity } of this.sensitivePatterns) {
        // Skip false positives
        if (this.shouldSkipPattern(description, relativePath)) {
          continue;
        }
        
        // Find unique matches to avoid duplicates
        const uniqueMatches = this.findUniqueMatches(content, pattern);
        
        for (const match of uniqueMatches) {
          issues.push({
            type: 'SENSITIVE_DATA',
            severity,
            description,
            file: relativePath,
            match: match.text.substring(0, 50) + (match.text.length > 50 ? '...' : ''),
            line: match.line
          });
          this.stats.patternsFound++;
        }
      }
    } catch (error) {
      console.warn(`   Warning: Could not scan ${filePath}: ${error.message}`);
    }

    return issues;
  }

  /**
   * Find unique matches to avoid duplicate counting
   * @param {string} content - File content
   * @param {RegExp} pattern - Pattern to search for
   * @returns {Array} Array of unique matches with line numbers
   */
  findUniqueMatches(content, pattern) {
    const lines = content.split('\n');
    const matches = [];
    const seenMatches = new Set();

    lines.forEach((line, index) => {
      const lineMatches = line.match(pattern);
      if (lineMatches) {
        lineMatches.forEach(match => {
          const key = `${match}:${index + 1}`;
          if (!seenMatches.has(key)) {
            seenMatches.add(key);
            matches.push({
              text: match,
              line: index + 1
            });
          }
        });
      }
    });

    return matches;
  }

  /**
   * Check if pattern should be skipped for this file
   * @param {string} description - Pattern description
   * @param {string} relativePath - File path relative to project root
   * @returns {boolean} True if pattern should be skipped
   */
  shouldSkipPattern(description, relativePath) {
    // Skip eval() detection in security monitoring files
    if (description === 'Use of eval() function' && 
        (relativePath.includes('security-monitor') || relativePath.includes('validation-utils'))) {
      return true;
    }
    
    // Skip token detection in security type definitions
    if (description === 'Hardcoded token' && 
        (relativePath.includes('securityLogger') || relativePath.includes('types/security'))) {
      return true;
    }

    return false;
  }

  /**
   * Get scanner statistics
   * @returns {Object} Scanner statistics
   */
  getStats() {
    return { ...this.stats };
  }
} 
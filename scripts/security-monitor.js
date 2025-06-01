#!/usr/bin/env node

/**
 * Security Monitoring Script
 * Performs comprehensive security checks and monitoring
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Security check configuration
const SECURITY_CONFIG = {
  // Files to scan for sensitive data
  scanPaths: [
    'src',
    'scripts',
    'netlify/functions'
  ],
  
  // Patterns that indicate potential security issues
  sensitivePatterns: [
    {
      pattern: /sk_live_[a-zA-Z0-9]+/g,
      description: 'Live Stripe secret key',
      severity: 'CRITICAL'
    },
    {
      pattern: /sk_test_[a-zA-Z0-9]+/g,
      description: 'Test Stripe secret key',
      severity: 'HIGH'
    },
    {
      pattern: /password\s*[:=]\s*["'][^"']+["']/gi,
      description: 'Hardcoded password',
      severity: 'HIGH'
    },
    {
      pattern: /api[_-]?key\s*[:=]\s*["'][^"']+["']/gi,
      description: 'Hardcoded API key',
      severity: 'HIGH'
    },
    {
      pattern: /secret\s*[:=]\s*["'][^"']+["']/gi,
      description: 'Hardcoded secret',
      severity: 'HIGH'
    },
    {
      pattern: /token\s*[:=]\s*["'][^"']+["']/gi,
      description: 'Hardcoded token',
      severity: 'MEDIUM'
    },
    {
      pattern: /console\.log\(/g,
      description: 'Console.log statement (potential info disclosure)',
      severity: 'LOW'
    },
    {
      pattern: /eval\s*\(/g,
      description: 'Use of eval() function',
      severity: 'HIGH'
    },
    {
      pattern: /innerHTML\s*=/g,
      description: 'Use of innerHTML (potential XSS)',
      severity: 'MEDIUM'
    }
  ],

  // Dependencies to check for known vulnerabilities
  criticalDependencies: [
    'react',
    'react-dom',
    '@supabase/supabase-js',
    '@stripe/stripe-js',
    'stripe'
  ],

  // Environment variables that should be present
  requiredEnvVars: [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_STRIPE_PUBLISHABLE_KEY'
  ]
};

class SecurityMonitor {
  constructor() {
    this.issues = [];
    this.stats = {
      filesScanned: 0,
      issuesFound: 0,
      criticalIssues: 0,
      highIssues: 0,
      mediumIssues: 0,
      lowIssues: 0
    };
  }

  /**
   * Run comprehensive security monitoring
   */
  async runSecurityCheck() {
    console.log('🔒 Starting Security Monitoring...\n');

    try {
      // 1. Scan for sensitive data in code
      await this.scanForSensitiveData();

      // 2. Check dependencies for vulnerabilities
      await this.checkDependencyVulnerabilities();

      // 3. Validate environment configuration
      await this.validateEnvironmentConfig();

      // 4. Check file permissions
      await this.checkFilePermissions();

      // 5. Validate security headers configuration
      await this.validateSecurityHeaders();

      // 6. Generate security report
      this.generateSecurityReport();

    } catch (error) {
      console.error('❌ Security monitoring failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Scan source code for sensitive data patterns
   */
  async scanForSensitiveData() {
    console.log('🔍 Scanning for sensitive data patterns...');

    for (const scanPath of SECURITY_CONFIG.scanPaths) {
      const fullPath = path.join(projectRoot, scanPath);
      if (fs.existsSync(fullPath)) {
        await this.scanDirectory(fullPath);
      }
    }

    console.log(`   Scanned ${this.stats.filesScanned} files\n`);
  }

  /**
   * Recursively scan directory for security issues
   */
  async scanDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Skip node_modules and other irrelevant directories
        if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
          await this.scanDirectory(itemPath);
        }
      } else if (stat.isFile()) {
        // Only scan relevant file types
        const ext = path.extname(item).toLowerCase();
        if (['.js', '.ts', '.tsx', '.jsx', '.json', '.env'].includes(ext)) {
          await this.scanFile(itemPath);
        }
      }
    }
  }

  /**
   * Scan individual file for security issues
   */
  async scanFile(filePath) {
    this.stats.filesScanned++;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(projectRoot, filePath);

      for (const { pattern, description, severity } of SECURITY_CONFIG.sensitivePatterns) {
        const matches = content.match(pattern);
        if (matches) {
          for (const match of matches) {
            this.addIssue({
              type: 'SENSITIVE_DATA',
              severity,
              description,
              file: relativePath,
              match: match.substring(0, 50) + (match.length > 50 ? '...' : ''),
              line: this.getLineNumber(content, match)
            });
          }
        }
      }
    } catch (error) {
      console.warn(`   Warning: Could not scan ${filePath}: ${error.message}`);
    }
  }

  /**
   * Check dependencies for known vulnerabilities
   */
  async checkDependencyVulnerabilities() {
    console.log('🔍 Checking dependencies for vulnerabilities...');

    try {
      // Run npm audit
      const auditResult = execSync('npm audit --json', { 
        cwd: projectRoot,
        encoding: 'utf8'
      });

      const audit = JSON.parse(auditResult);
      
      if (audit.vulnerabilities) {
        Object.entries(audit.vulnerabilities).forEach(([pkg, vuln]) => {
          this.addIssue({
            type: 'DEPENDENCY_VULNERABILITY',
            severity: this.mapAuditSeverity(vuln.severity),
            description: `Vulnerable dependency: ${pkg}`,
            package: pkg,
            vulnerabilityDetails: vuln
          });
        });
      }

      console.log(`   Found ${Object.keys(audit.vulnerabilities || {}).length} vulnerable dependencies\n`);
    } catch (error) {
      // npm audit returns non-zero exit code when vulnerabilities are found
      if (error.stdout) {
        try {
          const audit = JSON.parse(error.stdout);
          if (audit.vulnerabilities) {
            Object.entries(audit.vulnerabilities).forEach(([pkg, vuln]) => {
              this.addIssue({
                type: 'DEPENDENCY_VULNERABILITY',
                severity: this.mapAuditSeverity(vuln.severity),
                description: `Vulnerable dependency: ${pkg}`,
                package: pkg,
                vulnerabilityDetails: vuln
              });
            });
          }
        } catch (parseError) {
          console.warn('   Warning: Could not parse npm audit output');
        }
      }
    }
  }

  /**
   * Validate environment configuration
   */
  async validateEnvironmentConfig() {
    console.log('🔍 Validating environment configuration...');

    // Check for .env files
    const envFiles = ['.env', '.env.local', '.env.production'];
    
    for (const envFile of envFiles) {
      const envPath = path.join(projectRoot, envFile);
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        
        // Check if .env file contains production secrets
        if (content.includes('sk_live_') && envFile !== '.env.production') {
          this.addIssue({
            type: 'ENVIRONMENT_CONFIG',
            severity: 'CRITICAL',
            description: `Production secrets found in ${envFile}`,
            file: envFile
          });
        }

        // Check for missing required environment variables
        for (const requiredVar of SECURITY_CONFIG.requiredEnvVars) {
          if (!content.includes(requiredVar)) {
            this.addIssue({
              type: 'ENVIRONMENT_CONFIG',
              severity: 'MEDIUM',
              description: `Missing required environment variable: ${requiredVar}`,
              file: envFile
            });
          }
        }
      }
    }

    console.log('   Environment configuration validated\n');
  }

  /**
   * Check file permissions for security issues
   */
  async checkFilePermissions() {
    console.log('🔍 Checking file permissions...');

    const sensitiveFiles = [
      '.env',
      '.env.local',
      '.env.production',
      'package.json',
      'package-lock.json'
    ];

    for (const file of sensitiveFiles) {
      const filePath = path.join(projectRoot, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const mode = stats.mode;
        
        // Check if file is world-readable (on Unix systems)
        if (process.platform !== 'win32' && (mode & 0o004)) {
          this.addIssue({
            type: 'FILE_PERMISSIONS',
            severity: 'MEDIUM',
            description: `File ${file} is world-readable`,
            file
          });
        }
      }
    }

    console.log('   File permissions checked\n');
  }

  /**
   * Validate security headers configuration
   */
  async validateSecurityHeaders() {
    console.log('🔍 Validating security headers configuration...');

    const securityConfigPath = path.join(projectRoot, 'security.config.js');
    const netlifyConfigPath = path.join(projectRoot, 'netlify.toml');

    // Check security.config.js
    if (fs.existsSync(securityConfigPath)) {
      const content = fs.readFileSync(securityConfigPath, 'utf8');
      
      const requiredHeaders = [
        'Strict-Transport-Security',
        'X-Content-Type-Options',
        'X-Frame-Options',
        'Content-Security-Policy'
      ];

      for (const header of requiredHeaders) {
        if (!content.includes(header)) {
          this.addIssue({
            type: 'SECURITY_HEADERS',
            severity: 'MEDIUM',
            description: `Missing security header: ${header}`,
            file: 'security.config.js'
          });
        }
      }
    } else {
      this.addIssue({
        type: 'SECURITY_HEADERS',
        severity: 'HIGH',
        description: 'Missing security.config.js file',
        file: 'security.config.js'
      });
    }

    // Check netlify.toml for security headers
    if (fs.existsSync(netlifyConfigPath)) {
      const content = fs.readFileSync(netlifyConfigPath, 'utf8');
      
      if (!content.includes('Content-Security-Policy')) {
        this.addIssue({
          type: 'SECURITY_HEADERS',
          severity: 'MEDIUM',
          description: 'CSP not configured in netlify.toml',
          file: 'netlify.toml'
        });
      }
    }

    console.log('   Security headers configuration validated\n');
  }

  /**
   * Add security issue to the list
   */
  addIssue(issue) {
    this.issues.push(issue);
    this.stats.issuesFound++;
    
    switch (issue.severity) {
      case 'CRITICAL':
        this.stats.criticalIssues++;
        break;
      case 'HIGH':
        this.stats.highIssues++;
        break;
      case 'MEDIUM':
        this.stats.mediumIssues++;
        break;
      case 'LOW':
        this.stats.lowIssues++;
        break;
    }
  }

  /**
   * Generate comprehensive security report
   */
  generateSecurityReport() {
    console.log('📊 Security Monitoring Report');
    console.log('=' .repeat(50));
    
    // Summary statistics
    console.log('\n📈 Summary:');
    console.log(`   Files scanned: ${this.stats.filesScanned}`);
    console.log(`   Issues found: ${this.stats.issuesFound}`);
    console.log(`   Critical: ${this.stats.criticalIssues}`);
    console.log(`   High: ${this.stats.highIssues}`);
    console.log(`   Medium: ${this.stats.mediumIssues}`);
    console.log(`   Low: ${this.stats.lowIssues}`);

    // Detailed issues
    if (this.issues.length > 0) {
      console.log('\n🚨 Security Issues Found:');
      
      const groupedIssues = this.groupIssuesBySeverity();
      
      for (const severity of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) {
        const issues = groupedIssues[severity] || [];
        if (issues.length > 0) {
          console.log(`\n${this.getSeverityIcon(severity)} ${severity} (${issues.length}):`);
          issues.forEach((issue, index) => {
            console.log(`   ${index + 1}. ${issue.description}`);
            if (issue.file) console.log(`      File: ${issue.file}`);
            if (issue.line) console.log(`      Line: ${issue.line}`);
            if (issue.match) console.log(`      Match: ${issue.match}`);
          });
        }
      }
    } else {
      console.log('\n✅ No security issues found!');
    }

    // Recommendations
    console.log('\n💡 Recommendations:');
    if (this.stats.criticalIssues > 0) {
      console.log('   - Address CRITICAL issues immediately');
    }
    if (this.stats.highIssues > 0) {
      console.log('   - Review and fix HIGH severity issues');
    }
    console.log('   - Run security monitoring regularly');
    console.log('   - Keep dependencies updated');
    console.log('   - Review security headers configuration');

    // Save report to file
    this.saveReportToFile();

    // Exit with appropriate code
    const exitCode = this.stats.criticalIssues > 0 ? 2 : 
                    this.stats.highIssues > 0 ? 1 : 0;
    
    console.log(`\n${exitCode === 0 ? '✅' : '❌'} Security monitoring completed with exit code ${exitCode}`);
    
    if (process.env.CI !== 'true') {
      process.exit(exitCode);
    }
  }

  /**
   * Helper methods
   */
  getLineNumber(content, match) {
    const index = content.indexOf(match);
    if (index === -1) return null;
    return content.substring(0, index).split('\n').length;
  }

  mapAuditSeverity(severity) {
    const mapping = {
      'critical': 'CRITICAL',
      'high': 'HIGH',
      'moderate': 'MEDIUM',
      'low': 'LOW'
    };
    return mapping[severity] || 'MEDIUM';
  }

  groupIssuesBySeverity() {
    return this.issues.reduce((groups, issue) => {
      const severity = issue.severity;
      if (!groups[severity]) groups[severity] = [];
      groups[severity].push(issue);
      return groups;
    }, {});
  }

  getSeverityIcon(severity) {
    const icons = {
      'CRITICAL': '🔴',
      'HIGH': '🟠',
      'MEDIUM': '🟡',
      'LOW': '🔵'
    };
    return icons[severity] || '⚪';
  }

  saveReportToFile() {
    const reportData = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      issues: this.issues
    };

    const reportPath = path.join(projectRoot, 'security-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Detailed report saved to: security-report.json`);
  }
}

// Run security monitoring if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new SecurityMonitor();
  monitor.runSecurityCheck().catch(error => {
    console.error('Security monitoring failed:', error);
    process.exit(1);
  });
}

export default SecurityMonitor; 
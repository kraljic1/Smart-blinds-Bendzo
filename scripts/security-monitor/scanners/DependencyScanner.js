/**
 * Dependency Scanner
 * Checks dependencies for known vulnerabilities using npm audit
 */

import { execSync } from 'child_process';
import { mapAuditSeverity } from '../utils.js';

export class DependencyScanner {
  constructor() {
    this.vulnerabilityCount = 0;
  }

  /**
   * Check dependencies for known vulnerabilities
   * @param {string} projectRoot - Root directory of the project
   * @returns {Array} Array of dependency vulnerability issues
   */
  async scan(projectRoot) {
    console.log('🔍 Checking dependencies for vulnerabilities...');
    
    const issues = [];

    try {
      // Run npm audit
      const auditResult = execSync('npm audit --json', { 
        cwd: projectRoot,
        encoding: 'utf8'
      });

      const audit = JSON.parse(auditResult);
      
      if (audit.vulnerabilities) {
        Object.entries(audit.vulnerabilities).forEach(([pkg, vuln]) => {
          issues.push({
            type: 'DEPENDENCY_VULNERABILITY',
            severity: mapAuditSeverity(vuln.severity),
            description: `Vulnerable dependency: ${pkg}`,
            package: pkg,
            vulnerabilityDetails: vuln
          });
          this.vulnerabilityCount++;
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
              issues.push({
                type: 'DEPENDENCY_VULNERABILITY',
                severity: mapAuditSeverity(vuln.severity),
                description: `Vulnerable dependency: ${pkg}`,
                package: pkg,
                vulnerabilityDetails: vuln
              });
              this.vulnerabilityCount++;
            });
          }
          console.log(`   Found ${Object.keys(audit.vulnerabilities || {}).length} vulnerable dependencies\n`);
        } catch (parseError) {
          console.warn('   Warning: Could not parse npm audit output');
        }
      } else {
        console.warn('   Warning: Could not run npm audit:', error.message);
      }
    }

    return issues;
  }

  /**
   * Get vulnerability count
   * @returns {number} Number of vulnerabilities found
   */
  getVulnerabilityCount() {
    return this.vulnerabilityCount;
  }
} 
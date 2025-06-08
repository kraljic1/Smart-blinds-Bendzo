/**
 * Dependency Scanner
 * Checks dependencies for known vulnerabilities using npm audit
 */

import { execSync } from 'child_process';

export class DependencyScanner {
  constructor() {
    this.vulnerabilityCount = 0;
  }

  /**
   * Scan dependencies for vulnerabilities
   * @param {string} projectRoot - Root directory of the project
   * @returns {Array} Array of dependency vulnerability issues
   */
  async scan(projectRoot) {
    console.log('🔍 Checking dependencies for vulnerabilities...');
    
    const issues = [];
    
    try {
      // Run npm audit with JSON output
      const auditResult = execSync('npm audit --json', { 
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: 'pipe'
      });

      const audit = JSON.parse(auditResult);
      const vulnerabilities = this.parseAuditResults(audit);
      issues.push(...vulnerabilities);
      
    } catch (error) {
      // npm audit returns non-zero exit code when vulnerabilities are found
      if (error.stdout) {
        try {
          const audit = JSON.parse(error.stdout);
          const vulnerabilities = this.parseAuditResults(audit);
          issues.push(...vulnerabilities);
        } catch (parseError) {
          console.warn('   Warning: Could not parse npm audit output');
          console.warn(`   Error: ${parseError.message}`);
        }
      } else {
        console.warn(`   Warning: npm audit failed: ${error.message}`);
      }
    }
    
    this.vulnerabilityCount = issues.length;
    console.log(`   Found ${issues.length} vulnerable dependencies\n`);
    
    return issues;
  }

  /**
   * Parse npm audit results into security issues
   * @param {Object} audit - npm audit JSON output
   * @returns {Array} Array of vulnerability issues
   */
  parseAuditResults(audit) {
    const issues = [];
    
    if (audit.vulnerabilities) {
      Object.entries(audit.vulnerabilities).forEach(([packageName, vulnerability]) => {
        // Handle both old and new npm audit formats
        const severity = vulnerability.severity || 'MEDIUM';
        const title = vulnerability.title || `Vulnerability in ${packageName}`;
        const via = vulnerability.via || [];
        
        issues.push({
          type: 'DEPENDENCY_VULNERABILITY',
          severity: this.mapAuditSeverity(severity),
          description: `Vulnerable dependency: ${packageName}`,
          package: packageName,
          title: title,
          severity_original: severity,
          via: Array.isArray(via) ? via : [via],
          range: vulnerability.range || 'unknown',
          fixAvailable: vulnerability.fixAvailable || false
        });
      });
    }
    
    // Handle legacy audit format
    if (audit.advisories) {
      Object.entries(audit.advisories).forEach(([id, advisory]) => {
        issues.push({
          type: 'DEPENDENCY_VULNERABILITY',
          severity: this.mapAuditSeverity(advisory.severity),
          description: `Vulnerable dependency: ${advisory.module_name}`,
          package: advisory.module_name,
          title: advisory.title,
          advisory_id: id,
          severity_original: advisory.severity,
          vulnerable_versions: advisory.vulnerable_versions,
          patched_versions: advisory.patched_versions
        });
      });
    }
    
    return issues;
  }

  /**
   * Map npm audit severity to our severity levels
   * @param {string} severity - npm audit severity
   * @returns {string} Mapped severity level
   */
  mapAuditSeverity(severity) {
    const mapping = {
      'critical': 'CRITICAL',
      'high': 'HIGH',
      'moderate': 'MEDIUM',
      'medium': 'MEDIUM',
      'low': 'LOW',
      'info': 'LOW'
    };
    
    return mapping[severity?.toLowerCase()] || 'MEDIUM';
  }

  /**
   * Get vulnerability count
   * @returns {number} Number of vulnerabilities found
   */
  getVulnerabilityCount() {
    return this.vulnerabilityCount;
  }
} 
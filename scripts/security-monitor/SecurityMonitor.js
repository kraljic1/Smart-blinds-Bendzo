/**
 * Main Security Monitor
 * Orchestrates all security scanners and generates comprehensive reports
 */

import { SensitiveDataScanner } from './scanners/SensitiveDataScanner.js';
import { DependencyScanner } from './scanners/DependencyScanner.js';
import { EnvironmentScanner } from './scanners/EnvironmentScanner.js';
import { FilePermissionScanner } from './scanners/FilePermissionScanner.js';
import { SecurityHeaderScanner } from './scanners/SecurityHeaderScanner.js';
import { ReportGenerator } from './ReportGenerator.js';

export class SecurityMonitor {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.reportGenerator = new ReportGenerator();
    
    // Initialize scanners
    this.scanners = {
      sensitiveData: new SensitiveDataScanner(),
      dependency: new DependencyScanner(),
      environment: new EnvironmentScanner(),
      filePermission: new FilePermissionScanner(),
      securityHeader: new SecurityHeaderScanner()
    };
  }

  /**
   * Run comprehensive security monitoring
   * @returns {number} Exit code (0 = success, 1 = high issues, 2 = critical issues)
   */
  async runSecurityCheck() {
    console.log('🔒 Starting Security Monitoring...\n');

    try {
      // 1. Scan for sensitive data in code
      await this.runSensitiveDataScan();

      // 2. Check dependencies for vulnerabilities
      await this.runDependencyScan();

      // 3. Validate environment configuration
      await this.runEnvironmentScan();

      // 4. Check file permissions
      await this.runFilePermissionScan();

      // 5. Validate security headers configuration
      await this.runSecurityHeaderScan();

      // 6. Generate security report
      return this.reportGenerator.generateReport(this.projectRoot);

    } catch (error) {
      console.error('❌ Security monitoring failed:', error.message);
      return 1;
    }
  }

  /**
   * Run sensitive data scanning
   */
  async runSensitiveDataScan() {
    const issues = await this.scanners.sensitiveData.scan(this.projectRoot);
    this.reportGenerator.addIssues(issues);
    this.reportGenerator.updateFilesScanned(this.scanners.sensitiveData.getStats().filesScanned);
  }

  /**
   * Run dependency vulnerability scanning
   */
  async runDependencyScan() {
    const issues = await this.scanners.dependency.scan(this.projectRoot);
    this.reportGenerator.addIssues(issues);
  }

  /**
   * Run environment configuration validation
   */
  async runEnvironmentScan() {
    const issues = await this.scanners.environment.scan(this.projectRoot);
    this.reportGenerator.addIssues(issues);
  }

  /**
   * Run file permission checking
   */
  async runFilePermissionScan() {
    const issues = await this.scanners.filePermission.scan(this.projectRoot);
    this.reportGenerator.addIssues(issues);
  }

  /**
   * Run security header validation
   */
  async runSecurityHeaderScan() {
    const issues = await this.scanners.securityHeader.scan(this.projectRoot);
    this.reportGenerator.addIssues(issues);
  }

  /**
   * Get current statistics
   * @returns {Object} Current statistics from all scanners
   */
  getStats() {
    return {
      ...this.reportGenerator.getStats(),
      scanners: {
        sensitiveData: this.scanners.sensitiveData.getStats(),
        dependency: { vulnerabilities: this.scanners.dependency.getVulnerabilityCount() },
        environment: { envFilesChecked: this.scanners.environment.getEnvFilesChecked() },
        filePermission: { filesChecked: this.scanners.filePermission.getFilesChecked() },
        securityHeader: { configFilesChecked: this.scanners.securityHeader.getConfigFilesChecked() }
      }
    };
  }

  /**
   * Get all issues found
   * @returns {Array} All security issues found
   */
  getIssues() {
    return this.reportGenerator.getIssues();
  }
} 
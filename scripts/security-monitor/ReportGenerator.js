/**
 * Security Report Generator
 * Handles generating and saving comprehensive security reports
 */

import fs from 'fs';
import path from 'path';
import { groupIssuesBySeverity, getSeverityIcon } from './utils.js';

export class ReportGenerator {
  constructor() {
    this.stats = {
      filesScanned: 0,
      issuesFound: 0,
      criticalIssues: 0,
      highIssues: 0,
      mediumIssues: 0,
      lowIssues: 0
    };
    this.issues = [];
  }

  /**
   * Add issues to the report
   * @param {Array} issues - Array of security issues
   */
  addIssues(issues) {
    this.issues.push(...issues);
    this.stats.issuesFound += issues.length;
    
    // Count issues by severity
    issues.forEach(issue => {
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
    });
  }

  /**
   * Update files scanned count
   * @param {number} count - Number of files scanned
   */
  updateFilesScanned(count) {
    this.stats.filesScanned += count;
  }

  /**
   * Generate comprehensive security report
   * @param {string} projectRoot - Root directory of the project
   */
  generateReport(projectRoot) {
    console.log('📊 Security Monitoring Report');
    console.log('=' .repeat(50));
    
    // Summary statistics
    this.printSummary();

    // Detailed issues
    if (this.issues.length > 0) {
      this.printDetailedIssues();
    } else {
      console.log('\n✅ No security issues found!');
    }

    // Recommendations
    this.printRecommendations();

    // Save report to file
    this.saveReportToFile(projectRoot);

    // Return exit code
    return this.getExitCode();
  }

  /**
   * Print summary statistics
   */
  printSummary() {
    console.log('\n📈 Summary:');
    console.log(`   Files scanned: ${this.stats.filesScanned}`);
    console.log(`   Issues found: ${this.stats.issuesFound}`);
    console.log(`   Critical: ${this.stats.criticalIssues}`);
    console.log(`   High: ${this.stats.highIssues}`);
    console.log(`   Medium: ${this.stats.mediumIssues}`);
    console.log(`   Low: ${this.stats.lowIssues}`);
  }

  /**
   * Print detailed issues grouped by severity
   */
  printDetailedIssues() {
    console.log('\n🚨 Security Issues Found:');
    
    const groupedIssues = groupIssuesBySeverity(this.issues);
    
    for (const severity of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) {
      const issues = groupedIssues[severity] || [];
      if (issues.length > 0) {
        console.log(`\n${getSeverityIcon(severity)} ${severity} (${issues.length}):`);
        issues.forEach((issue, index) => {
          console.log(`   ${index + 1}. ${issue.description}`);
          if (issue.file) console.log(`      File: ${issue.file}`);
          if (issue.line) console.log(`      Line: ${issue.line}`);
          if (issue.match) console.log(`      Match: ${issue.match}`);
        });
      }
    }
  }

  /**
   * Print security recommendations
   */
  printRecommendations() {
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
  }

  /**
   * Save detailed report to JSON file
   * @param {string} projectRoot - Root directory of the project
   */
  saveReportToFile(projectRoot) {
    const reportData = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      issues: this.issues
    };

    const reportPath = path.join(projectRoot, 'security-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Detailed report saved to: security-report.json`);
  }

  /**
   * Get appropriate exit code based on issues found
   * @returns {number} Exit code (0 = success, 1 = high issues, 2 = critical issues)
   */
  getExitCode() {
    const exitCode = this.stats.criticalIssues > 0 ? 2 : 
                    this.stats.highIssues > 0 ? 1 : 0;
    
    console.log(`\n${exitCode === 0 ? '✅' : '❌'} Security monitoring completed with exit code ${exitCode}`);
    return exitCode;
  }

  /**
   * Get current statistics
   * @returns {Object} Current statistics
   */
  getStats() {
    return { ...this.stats };
  }

  /**
   * Get all issues
   * @returns {Array} All security issues found
   */
  getIssues() {
    return [...this.issues];
  }
} 
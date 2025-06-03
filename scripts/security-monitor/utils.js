/**
 * Security Monitor Utility Functions
 * Helper functions for security monitoring operations
 */

/**
 * Get line number where a match occurs in content
 * @param {string} content - File content
 * @param {string} match - String to find
 * @returns {number|null} Line number or null if not found
 */
export function getLineNumber(content, match) {
  const index = content.indexOf(match);
  if (index === -1) return null;
  return content.substring(0, index).split('\n').length;
}

/**
 * Map npm audit severity to our severity levels
 * @param {string} severity - npm audit severity
 * @returns {string} Mapped severity level
 */
export function mapAuditSeverity(severity) {
  const mapping = {
    'critical': 'CRITICAL',
    'high': 'HIGH',
    'moderate': 'MEDIUM',
    'low': 'LOW'
  };
  return mapping[severity] || 'MEDIUM';
}

/**
 * Group issues by severity level
 * @param {Array} issues - Array of security issues
 * @returns {Object} Issues grouped by severity
 */
export function groupIssuesBySeverity(issues) {
  return issues.reduce((groups, issue) => {
    const severity = issue.severity;
    if (!groups[severity]) groups[severity] = [];
    groups[severity].push(issue);
    return groups;
  }, {});
}

/**
 * Get icon for severity level
 * @param {string} severity - Severity level
 * @returns {string} Emoji icon for severity
 */
export function getSeverityIcon(severity) {
  const icons = {
    'CRITICAL': '🔴',
    'HIGH': '🟠',
    'MEDIUM': '🟡',
    'LOW': '🔵'
  };
  return icons[severity] || '⚪';
}

/**
 * Check if file extension should be scanned
 * @param {string} filename - Name of the file
 * @returns {boolean} True if file should be scanned
 */
export function shouldScanFile(filename) {
  const ext = filename.toLowerCase().split('.').pop();
  return ['js', 'ts', 'tsx', 'jsx', 'json', 'env'].includes(ext);
}

/**
 * Check if directory should be skipped during scanning
 * @param {string} dirName - Directory name
 * @returns {boolean} True if directory should be skipped
 */
export function shouldSkipDirectory(dirName) {
  return ['node_modules', '.git', 'dist', 'build'].includes(dirName);
} 
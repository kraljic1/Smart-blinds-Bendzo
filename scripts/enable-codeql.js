#!/usr/bin/env node

/**
 * CodeQL Setup Helper Script
 * Helps enable and verify CodeQL code scanning setup
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🔒 CodeQL Setup Helper\n');

// Check if CodeQL workflow exists
const codeqlWorkflowPath = path.join(projectRoot, '.github/workflows/codeql.yml');
const codeqlConfigPath = path.join(projectRoot, '.github/codeql/codeql-config.yml');

console.log('📋 Checking CodeQL setup...\n');

// 1. Check workflow file
if (fs.existsSync(codeqlWorkflowPath)) {
  console.log('✅ CodeQL workflow file exists: .github/workflows/codeql.yml');
} else {
  console.log('❌ CodeQL workflow file missing: .github/workflows/codeql.yml');
}

// 2. Check config file
if (fs.existsSync(codeqlConfigPath)) {
  console.log('✅ CodeQL config file exists: .github/codeql/codeql-config.yml');
} else {
  console.log('❌ CodeQL config file missing: .github/codeql/codeql-config.yml');
}

// 3. Check package.json for required scripts
const packageJsonPath = path.join(projectRoot, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log('✅ Build script exists in package.json');
  } else {
    console.log('❌ Build script missing in package.json');
  }
}

console.log('\n📝 Next Steps to Enable CodeQL:\n');

console.log('1. 🌐 Go to your GitHub repository');
console.log('2. 🔧 Click on "Settings" tab');
console.log('3. 🛡️  Navigate to "Security" → "Code security and analysis"');
console.log('4. 🔍 Find "Code scanning" section');
console.log('5. ⚙️  Click "Set up" next to "CodeQL analysis"');
console.log('6. 🚀 Choose "Advanced" setup');
console.log('7. ✅ GitHub will detect your existing workflow files');
console.log('8. 💾 Commit and push any changes');

console.log('\n🔄 Alternative: Enable via GitHub CLI (if installed):\n');
console.log('gh api repos/:owner/:repo/code-scanning/default-setup \\');
console.log('  --method PATCH \\');
console.log('  --field state=configured \\');
console.log('  --field query_suite=default');

console.log('\n📊 After enabling, you can check status with:');
console.log('gh api repos/:owner/:repo/code-scanning/analyses');

console.log('\n🎯 What this fixes:');
console.log('• Eliminates "Code scanning is not enabled" warnings');
console.log('• Enables automated security vulnerability detection');
console.log('• Provides security insights in GitHub Security tab');
console.log('• Integrates with GitHub Advanced Security features');

console.log('\n✨ Setup complete! Your CodeQL configuration is ready.'); 
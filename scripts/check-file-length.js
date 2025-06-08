#!/usr/bin/env node

/**
 * File Length Checker
 * Enforces 200-line limit for TypeScript/JavaScript files
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const CONFIG = {
  maxLines: 200,
  scanPatterns: ['src/**/*.{ts,tsx,js,jsx}'],
  excludePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/scripts/**',
    '**/vite-plugins/**'
  ],
  // Files that are allowed to exceed the limit (legacy files)
  exemptFiles: [
    'src/data/phoneCodes.ts',
    'src/data/customizationOptions.ts',
    'src/data/collections/classicCollection.ts',
    'src/data/collections/essentialCollectionPart1.ts',
    'src/data/collections/essentialCollectionPart2.ts'
  ]
};

class FileLengthChecker {
  constructor() {
    this.violations = [];
    this.stats = {
      filesChecked: 0,
      violations: 0,
      exemptFiles: 0
    };
  }

  /**
   * Check all files for length violations
   */
  async checkFiles() {
    console.log('🔍 Checking file lengths...\n');

    const files = await this.findFiles();
    
    for (const file of files) {
      await this.checkFile(file);
    }

    return this.violations.length === 0;
  }

  /**
   * Find all files to check
   */
  async findFiles() {
    const allFiles = [];
    
    for (const pattern of CONFIG.scanPatterns) {
      const files = await glob(pattern, { 
        ignore: CONFIG.excludePatterns,
        absolute: true 
      });
      allFiles.push(...files);
    }
    
    return [...new Set(allFiles)];
  }

  /**
   * Check a single file
   */
  async checkFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // Count non-empty, non-comment lines
      const codeLines = lines.filter(line => {
        const trimmed = line.trim();
        return trimmed.length > 0 && 
               !trimmed.startsWith('//') && 
               !trimmed.startsWith('/*') && 
               !trimmed.startsWith('*') &&
               trimmed !== '*/';
      });

      this.stats.filesChecked++;
      const relativePath = path.relative(process.cwd(), filePath);

      // Check if file is exempt
      if (CONFIG.exemptFiles.includes(relativePath)) {
        this.stats.exemptFiles++;
        if (codeLines.length > CONFIG.maxLines) {
          console.log(`⚠️  ${relativePath}: ${codeLines.length} lines (EXEMPT - legacy file)`);
        }
        return;
      }

      // Check for violations
      if (codeLines.length > CONFIG.maxLines) {
        this.violations.push({
          file: relativePath,
          lines: codeLines.length,
          excess: codeLines.length - CONFIG.maxLines
        });
        this.stats.violations++;
      }

    } catch (error) {
      console.error(`❌ Error checking ${filePath}:`, error.message);
    }
  }

  /**
   * Show results
   */
  showResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 File Length Check Results');
    console.log('='.repeat(60));
    
    console.log(`📁 Files checked: ${this.stats.filesChecked}`);
    console.log(`⚠️  Exempt files: ${this.stats.exemptFiles}`);
    console.log(`❌ Violations: ${this.stats.violations}`);
    
    if (this.violations.length > 0) {
      console.log('\n🚨 FILES EXCEEDING 200-LINE LIMIT:');
      console.log('-'.repeat(60));
      
      this.violations
        .sort((a, b) => b.lines - a.lines)
        .forEach(violation => {
          const percentage = Math.round((violation.excess / CONFIG.maxLines) * 100);
          console.log(`❌ ${violation.file}`);
          console.log(`   📏 ${violation.lines} lines (+${violation.excess} over limit, ${percentage}% excess)`);
          console.log('');
        });
      
      console.log('💡 SOLUTIONS:');
      console.log('   1. Break large components into smaller ones');
      console.log('   2. Extract utility functions to separate files');
      console.log('   3. Move data constants to data/ directory');
      console.log('   4. Create custom hooks for complex logic');
      console.log('   5. Split forms into multiple step components');
      
      console.log('\n🔧 QUICK FIXES:');
      console.log('   • npm run lint -- --fix (auto-fix some issues)');
      console.log('   • Use the refactoring suggestions above');
      console.log('   • Consider using composition over large components');
      
      return false;
    } else {
      console.log('\n✅ All files comply with the 200-line limit!');
      return true;
    }
  }
}

// CLI interface
const args = process.argv.slice(2);
const isPreCommit = args.includes('--pre-commit');

const checker = new FileLengthChecker();

checker.checkFiles().then(success => {
  const allGood = checker.showResults();
  
  if (!allGood) {
    if (isPreCommit) {
      console.log('\n🚫 COMMIT BLOCKED: Fix file length violations before committing');
      process.exit(1);
    } else {
      console.log('\n⚠️  Please fix these violations to maintain code quality');
      process.exit(1);
    }
  } else {
    console.log('\n🎉 Ready to commit!');
    process.exit(0);
  }
}).catch(error => {
  console.error('❌ File length check failed:', error.message);
  process.exit(1);
}); 
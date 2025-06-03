#!/usr/bin/env node

/**
 * Console Log Migration Script
 * Helps migrate existing console.log statements to use the production logger
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Configuration
const CONFIG = {
  // Directories to scan
  scanDirs: ['src/**/*.{ts,tsx,js,jsx}'],
  
  // Console methods to migrate
  consoleMethods: ['log', 'info', 'warn', 'error', 'debug'],
  
  // Files to exclude
  excludePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/scripts/**',
    '**/vite-plugins/**',
    '**/utils/productionLogger.ts',
    '**/utils/secureLogger.ts',
    '**/utils/disableReactDevLogs.ts'
  ],
  
  // Backup directory
  backupDir: '.console-migration-backup'
};

class ConsoleMigrator {
  constructor() {
    this.stats = {
      filesScanned: 0,
      filesModified: 0,
      consoleStatementsFound: 0,
      consoleStatementsMigrated: 0,
      errors: []
    };
  }

  /**
   * Main migration function
   */
  async migrate(dryRun = false) {
    console.log('🔄 Starting Console Log Migration...\n');
    
    if (dryRun) {
      console.log('📋 DRY RUN MODE - No files will be modified\n');
    }

    try {
      // Create backup directory if not dry run
      if (!dryRun) {
        this.createBackupDir();
      }

      // Find all files to process
      const files = await this.findFiles();
      console.log(`📁 Found ${files.length} files to scan\n`);

      // Process each file
      for (const file of files) {
        await this.processFile(file, dryRun);
      }

      // Show results
      this.showResults(dryRun);

    } catch (error) {
      console.error('❌ Migration failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Find all files to process
   */
  async findFiles() {
    const allFiles = [];
    
    for (const pattern of CONFIG.scanDirs) {
      const files = await glob(pattern, { 
        ignore: CONFIG.excludePatterns,
        absolute: true 
      });
      allFiles.push(...files);
    }
    
    return [...new Set(allFiles)]; // Remove duplicates
  }

  /**
   * Process a single file
   */
  async processFile(filePath, dryRun) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let modifiedContent = content;
      let fileModified = false;
      let consoleStatementsInFile = 0;

      this.stats.filesScanned++;

      // Check if file already imports production logger
      const hasProductionLoggerImport = content.includes('from \'../utils/productionLogger\'') ||
                                       content.includes('from \'./utils/productionLogger\'') ||
                                       content.includes('from \'../../utils/productionLogger\'');

      // Find console statements
      CONFIG.consoleMethods.forEach(method => {
        const regex = new RegExp(`console\\.${method}\\s*\\([^)]*\\)`, 'g');
        const matches = content.match(regex);
        
        if (matches) {
          consoleStatementsInFile += matches.length;
          this.stats.consoleStatementsFound += matches.length;

          if (!dryRun) {
            // Replace console statements with production logger
            const replacement = this.getReplacementForMethod(method);
            modifiedContent = modifiedContent.replace(regex, replacement);
            fileModified = true;
          }
        }
      });

      if (consoleStatementsInFile > 0) {
        console.log(`📄 ${path.relative(process.cwd(), filePath)}: ${consoleStatementsInFile} console statements`);
        
        if (!dryRun && fileModified) {
          // Add import if needed and not already present
          if (!hasProductionLoggerImport) {
            const importPath = this.getImportPath(filePath);
            modifiedContent = `import { log } from '${importPath}';\n${modifiedContent}`;
          }

          // Create backup
          this.createBackup(filePath, originalContent);
          
          // Write modified file
          fs.writeFileSync(filePath, modifiedContent, 'utf8');
          
          this.stats.filesModified++;
          this.stats.consoleStatementsMigrated += consoleStatementsInFile;
        }
      }

    } catch (error) {
      this.stats.errors.push(`${filePath}: ${error.message}`);
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  /**
   * Get replacement for console method
   */
  getReplacementForMethod(method) {
    const methodMap = {
      'log': 'log.debug',
      'debug': 'log.debug',
      'info': 'log.info',
      'warn': 'log.warn',
      'error': 'log.error'
    };
    
    return `${methodMap[method] || 'log.debug'}`;
  }

  /**
   * Get import path for production logger
   */
  getImportPath(filePath) {
    const relativePath = path.relative(path.dirname(filePath), path.join(process.cwd(), 'src/utils'));
    return `${relativePath}/productionLogger`;
  }

  /**
   * Create backup directory
   */
  createBackupDir() {
    if (!fs.existsSync(CONFIG.backupDir)) {
      fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    }
  }

  /**
   * Create backup of original file
   */
  createBackup(filePath, content) {
    const relativePath = path.relative(process.cwd(), filePath);
    const backupPath = path.join(CONFIG.backupDir, relativePath);
    const backupDir = path.dirname(backupPath);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    fs.writeFileSync(backupPath, content, 'utf8');
  }

  /**
   * Show migration results
   */
  showResults(dryRun) {
    console.log('\n' + '='.repeat(50));
    console.log('📊 Console Log Migration Results');
    console.log('='.repeat(50));
    
    console.log(`📁 Files scanned: ${this.stats.filesScanned}`);
    console.log(`🔍 Console statements found: ${this.stats.consoleStatementsFound}`);
    
    if (!dryRun) {
      console.log(`📝 Files modified: ${this.stats.filesModified}`);
      console.log(`✅ Console statements migrated: ${this.stats.consoleStatementsMigrated}`);
      
      if (this.stats.filesModified > 0) {
        console.log(`\n💾 Backups created in: ${CONFIG.backupDir}`);
        console.log('📋 To restore backups: npm run restore-console-backups');
      }
    } else {
      console.log('\n📋 This was a dry run - no files were modified');
      console.log('🚀 To perform actual migration: npm run migrate-console-logs');
    }
    
    if (this.stats.errors.length > 0) {
      console.log(`\n❌ Errors encountered: ${this.stats.errors.length}`);
      this.stats.errors.forEach(error => console.log(`   ${error}`));
    }
    
    console.log('\n✨ Migration complete!');
  }
}

// CLI interface
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run') || args.includes('-d');

const migrator = new ConsoleMigrator();
migrator.migrate(dryRun); 
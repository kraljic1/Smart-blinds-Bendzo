import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all source files
function getAllFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Extract imports from a file
function extractImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = [];
    
    // Match various import patterns
    const importPatterns = [
      /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g,
      /import\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g,
      /require\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g
    ];
    
    for (const pattern of importPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        imports.push(match[1]);
      }
    }
    
    return imports;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

// Convert import path to actual file path
function resolveImportPath(importPath, fromFile) {
  if (importPath.startsWith('.')) {
    const fromDir = path.dirname(fromFile);
    const resolved = path.resolve(fromDir, importPath);
    
    // Try different extensions
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
    
    for (const ext of extensions) {
      const fullPath = resolved + ext;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    
    // Check if it's a directory with index file
    if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
      for (const indexFile of ['index.ts', 'index.tsx', 'index.js', 'index.jsx']) {
        const indexPath = path.join(resolved, indexFile);
        if (fs.existsSync(indexPath)) {
          return indexPath;
        }
      }
    }
  }
  
  return null;
}

// Main analysis
function findUnusedFiles() {
  const projectRoot = path.resolve(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  const allFiles = getAllFiles(srcDir);
  const referencedFiles = new Set();
  
  // Add entry points
  const entryPoints = [
    path.join(projectRoot, 'src', 'main.tsx'),
    path.join(projectRoot, 'src', 'App.tsx'),
    path.join(projectRoot, 'index.html')
  ];
  
  entryPoints.forEach(entry => {
    if (fs.existsSync(entry)) {
      referencedFiles.add(entry);
    }
  });
  
  // Analyze all files for imports
  console.log('Analyzing imports...');
  
  for (const file of allFiles) {
    const imports = extractImports(file);
    
    for (const importPath of imports) {
      const resolvedPath = resolveImportPath(importPath, file);
      if (resolvedPath) {
        referencedFiles.add(resolvedPath);
      }
    }
  }
  
  // Find unused files
  const unusedFiles = allFiles.filter(file => !referencedFiles.has(file));
  
  console.log('\n=== UNUSED FILES ANALYSIS ===\n');
  console.log(`Total files analyzed: ${allFiles.length}`);
  console.log(`Referenced files: ${referencedFiles.size}`);
  console.log(`Potentially unused files: ${unusedFiles.length}\n`);
  
  if (unusedFiles.length > 0) {
    console.log('🗑️  POTENTIALLY UNUSED FILES:');
    console.log('=====================================');
    
    unusedFiles.forEach(file => {
      const relativePath = path.relative(projectRoot, file);
      const stats = fs.statSync(file);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`📄 ${relativePath} (${sizeKB} KB)`);
    });
    
    const totalSize = unusedFiles.reduce((sum, file) => {
      return sum + fs.statSync(file).size;
    }, 0);
    
    console.log(`\n💾 Total size of unused files: ${(totalSize / 1024).toFixed(2)} KB`);
  } else {
    console.log('✅ No unused files found!');
  }
  
  // Show some referenced files for verification
  console.log('\n📋 SAMPLE REFERENCED FILES:');
  console.log('============================');
  Array.from(referencedFiles).slice(0, 10).forEach(file => {
    const relativePath = path.relative(projectRoot, file);
    console.log(`✓ ${relativePath}`);
  });
  
  if (referencedFiles.size > 10) {
    console.log(`... and ${referencedFiles.size - 10} more files`);
  }
}

// Run the analysis
findUnusedFiles(); 
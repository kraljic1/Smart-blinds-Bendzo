import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of files that are definitely safe to remove
const safeToRemove = [
  // Duplicate components
  'src/components/Header.tsx', // Duplicate of Layout/Header.tsx
  'src/components/Footer.tsx', // Likely duplicate of Layout/Footer.tsx
  'src/components/Hero/Hero.tsx', // Duplicate of Hero/index.tsx
  'src/components/ImageZoomModal.tsx', // Duplicate of UI/ImageZoomModal.tsx
  'src/components/ModernProductCard.tsx', // Duplicate of Product/ModernProductCard.tsx
  'src/components/ScrollIndicator.tsx', // Duplicate of UI/ScrollIndicator.tsx
  'src/components/ProductOptions.tsx', // Duplicate of Product/ProductOptions.tsx
  'src/components/ProductOptionsModal.tsx', // Duplicate of Product/ProductOptionsModal.tsx
  'src/components/SEO.tsx', // Duplicate of SEO/SEOAnalyzer.tsx
  
  // Unused card components (replaced by modern components)
  'src/components/Card/CardActions.tsx',
  'src/components/Card/CardBadge.tsx',
  'src/components/Card/CardContent.tsx',
  'src/components/Card/CardImage.tsx',
  'src/components/Card/CardPrice.tsx',
  'src/components/Card/CardRoot.tsx',
  'src/components/Card/CardTitle.tsx',
  'src/components/Card/index.ts',
  
  // Unused pages
  'src/pages/HoneycombBlindsPage.tsx',
  'src/pages/ShopPage.tsx',
  
  // Unused utilities
  'src/utils/imageChecker.ts',
  'src/utils/logConfig.ts',
  'src/utils/productionLogger.ts',
  'src/utils/secureLogger.ts',
  'src/utils/phoneFormatters.ts',
  'src/utils/phoneValidators.ts',
  
  // Unused types
  'src/types/stripe.ts',
  'src/data/productData.ts',
  
  // Environment file
  'src/vite-env.d.ts'
];

// Files that might be used conditionally or in production
const conditionalFiles = [
  'src/components/Admin/SecurityDashboard.tsx',
  'src/config/security.ts',
  'src/hooks/useSecureValidation.ts',
  'src/hooks/useSecurityMonitoring.ts',
  'src/utils/security/comprehensiveValidation.ts',
  'src/utils/security/rateLimiter.ts',
  'src/utils/security/securityUtils.ts',
  'src/utils/adminService.ts',
  'src/utils/orderRetrieval.ts',
  'src/utils/orderStatusManagement.ts',
  'src/utils/orderSubmission.ts',
  'src/utils/orderTransformers.ts'
];

function cleanupFiles() {
  const projectRoot = path.resolve(__dirname, '..');
  
  console.log('🧹 CLEANUP UNUSED FILES');
  console.log('========================\n');
  
  // Calculate total size of safe-to-remove files
  let totalSize = 0;
  const existingFiles = [];
  
  for (const file of safeToRemove) {
    const fullPath = path.join(projectRoot, file);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      totalSize += stats.size;
      existingFiles.push({ path: file, size: stats.size });
    }
  }
  
  console.log(`📊 SAFE TO REMOVE (${existingFiles.length} files):`);
  console.log('===========================================');
  existingFiles.forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(2);
    console.log(`🗑️  ${file.path} (${sizeKB} KB)`);
  });
  
  console.log(`\n💾 Total size to be freed: ${(totalSize / 1024).toFixed(2)} KB\n`);
  
  console.log(`⚠️  CONDITIONAL FILES (${conditionalFiles.length} files):`);
  console.log('==========================================');
  conditionalFiles.forEach(file => {
    const fullPath = path.join(projectRoot, file);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`⚡ ${file} (${sizeKB} KB) - May be used in production/admin`);
    }
  });
  
  console.log('\n📋 CLEANUP RECOMMENDATIONS:');
  console.log('============================');
  console.log('✅ Safe to remove: Duplicate components and unused utilities');
  console.log('⚠️  Keep conditional: Security and admin-related files');
  console.log('🔍 Manual review: Check if any conditional files are actually needed');
  
  console.log('\n🚀 TO CLEAN UP SAFE FILES, RUN:');
  console.log('================================');
  console.log('node scripts/cleanup-unused-files.js --execute');
  
  // If --execute flag is passed, actually remove the files
  if (process.argv.includes('--execute')) {
    console.log('\n🗑️  REMOVING SAFE FILES...');
    console.log('===========================');
    
    let removedCount = 0;
    let freedSpace = 0;
    
    for (const file of safeToRemove) {
      const fullPath = path.join(projectRoot, file);
      if (fs.existsSync(fullPath)) {
        try {
          const stats = fs.statSync(fullPath);
          fs.unlinkSync(fullPath);
          freedSpace += stats.size;
          removedCount++;
          console.log(`✅ Removed: ${file}`);
        } catch (error) {
          console.log(`❌ Failed to remove: ${file} - ${error.message}`);
        }
      }
    }
    
    console.log(`\n🎉 CLEANUP COMPLETE!`);
    console.log(`📁 Files removed: ${removedCount}`);
    console.log(`💾 Space freed: ${(freedSpace / 1024).toFixed(2)} KB`);
    console.log('\n⚠️  Remember to test your application after cleanup!');
  }
}

cleanupFiles(); 
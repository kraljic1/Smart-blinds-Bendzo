import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://bendzosmartblinds.netlify.app';
const SITE_PAGES = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/products', changefreq: 'weekly', priority: '0.9' },
  { url: '/products/roller-blinds', changefreq: 'weekly', priority: '0.8' },
  { url: '/products/zebra-blinds', changefreq: 'weekly', priority: '0.8' },
  { url: '/products/curtain-blinds', changefreq: 'weekly', priority: '0.8' },
  { url: '/products/accessories', changefreq: 'weekly', priority: '0.7' },
  { url: '/how-it-works', changefreq: 'monthly', priority: '0.7' },
  { url: '/support', changefreq: 'monthly', priority: '0.6' },
  { url: '/installation-guide', changefreq: 'monthly', priority: '0.6' },
  { url: '/connectivity-guide', changefreq: 'monthly', priority: '0.6' },
  { url: '/smart-control-guide', changefreq: 'monthly', priority: '0.6' },
  { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
  { url: '/accessibility', changefreq: 'yearly', priority: '0.3' }
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  SITE_PAGES.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
}

function updateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin/

# Disallow checkout and cart pages (sensitive user data)
Disallow: /checkout
Disallow: /basket
Disallow: /liked

# Disallow configuration pages (dynamic content)
Disallow: /products/configure/

# Disallow thank you page (only accessible after purchase)
Disallow: /thank-you

# Disallow demo pages
Disallow: /pricing-demo
Disallow: /product-options-demo

# Allow important pages
Allow: /products/
Allow: /how-it-works
Allow: /support
Allow: /installation-guide
Allow: /connectivity-guide
Allow: /smart-control-guide
Allow: /privacy-policy
Allow: /terms-of-service
Allow: /accessibility

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay (1 second between requests)
Crawl-delay: 1`;

  return robotsContent;
}

function main() {
  try {
    // Generate sitemap
    const sitemapContent = generateSitemap();
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log('✅ Sitemap generated successfully:', sitemapPath);
    
    // Update robots.txt
    const robotsContent = updateRobotsTxt();
    const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    console.log('✅ Robots.txt updated successfully:', robotsPath);
    
    console.log('\n📊 SEO Files Summary:');
    console.log(`- Sitemap: ${SITE_PAGES.length} pages indexed`);
    console.log(`- Last modified: ${new Date().toISOString().split('T')[0]}`);
    console.log(`- Site URL: ${SITE_URL}`);
    
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
}

// Run the main function
main();

export { generateSitemap, updateRobotsTxt }; 
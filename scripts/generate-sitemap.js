import fs from 'fs';
import path from 'path';

// This list should mirror your routes in App.tsx
const routes = [
  '/',
  '/products',
  '/products/roller-blinds',
  '/products/zebra-blinds',
  '/products/curtain-blinds',
  '/products/accessories',
  '/how-it-works',
  '/support',
  '/installation-guide',
  '/connectivity-guide',
  '/smart-control-guide',
  '/pricing-demo',
  '/basket',
  '/liked',
  '/checkout',
  '/privacy-policy',
  '/terms-of-service',
  '/accessibility'
];

// Base URL of your website
const baseUrl = 'https://smartblinds-croatia.com';

// Generate sitemap content
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(route => {
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return sitemap;
};

// Write sitemap to the public directory
const writeSitemap = () => {
  const sitemap = generateSitemap();
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated at ${outputPath}`);
};

writeSitemap(); 
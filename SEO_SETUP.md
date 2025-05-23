# SEO Setup Documentation - Smartblinds Hrvatska

## Overview
This document outlines the complete SEO setup for Smartblinds Hrvatska, including all components, files, and configurations created for optimal search engine optimization in the Croatian market.

## 🚀 What's Been Created

### 1. **Enhanced SEO Component** (`src/components/SEO.tsx`)
- Extended with Croatian-specific meta tags
- Added geographic targeting for Croatia
- Enhanced Open Graph and Twitter Card support
- Product-specific meta tags for e-commerce
- Improved performance with preconnect and DNS prefetch

### 2. **Croatian SEO Component** (`src/components/CroatianSEO.tsx`)
- Specialized component for Croatian market
- Structured data generation (Organization, Product, Website, Breadcrumbs)
- Local business information
- Croatian keyword integration
- Geographic targeting for Zagreb/Croatia

### 3. **Sitemap Generation** (`scripts/generate-sitemap.js`)
- Dynamic sitemap generation
- Automated last modified dates
- Proper priority and change frequency settings
- All important pages included

### 4. **Robots.txt** (`public/robots.txt`)
- Search engine crawler instructions
- Proper disallow rules for sensitive pages
- Sitemap location specification
- Crawl delay configuration

### 5. **Enhanced index.html**
- Comprehensive Croatian meta tags
- Local business structured data
- Geographic targeting
- Performance optimizations
- Social media meta tags

## 📋 Croatian Meta Tags

### Primary Tags Created:
- **Title**: "Smartblinds Hrvatska - Pametne Rolete za Moderan Dom | Automatske Rolete Zagreb"
- **Description**: "Otkrijte najbolje pametne rolete u hrvatskoj! Automatske rolete s daljinskim upravljanjem, smart home integracija, energetska efikasnost. Besplatna dostava po Zagrebu i Hrvatskoj. ⭐ Garancija 5 godina"
- **Keywords**: "pametne rolete, automatske rolete, smart home, pametni dom, rolete na daljinski, električne rolete, rolete Zagreb, rolete Hrvatska, zebra rolete, blackout rolete, motorizirane rolete"

### Geographic Targeting:
- **Region**: HR-21 (Zagreb)
- **Country**: Croatia
- **Coordinates**: 45.815, 15.9819 (Zagreb)
- **Business Address**: Ilica 123, Zagreb

## 🛠 Usage Instructions

### Using the CroatianSEO Component

```tsx
import CroatianSEO from '../components/CroatianSEO';

// For home page
<CroatianSEO 
  title="Smartblinds Hrvatska - Pametne Rolete za Moderan Dom"
  description="Pametne rolete koje se prilagođavaju vašem rasporedu..."
  keywords="pametne rolete, automatske rolete, smart home"
  pageType="home"
  ogType="website"
  breadcrumbs={[
    { name: 'Početna', item: 'https://bendzosmartblinds.netlify.app/' }
  ]}
/>

// For product pages
<CroatianSEO 
  title="Zebra Rolete - Pametne Rolete Hrvatska"
  description="Otkrijte naše zebra rolete s daljinskim upravljanjem..."
  pageType="product"
  productData={{
    name: "Zebra Rolete Premium",
    price: "299",
    currency: "EUR",
    category: "Zebra Rolete",
    availability: "InStock",
    condition: "NewCondition",
    brand: "Smartblinds",
    sku: "ZR-001"
  }}
  breadcrumbs={[
    { name: 'Početna', item: 'https://bendzosmartblinds.netlify.app/' },
    { name: 'Proizvodi', item: 'https://bendzosmartblinds.netlify.app/products' },
    { name: 'Zebra Rolete', item: 'https://bendzosmartblinds.netlify.app/products/zebra-blinds' }
  ]}
/>
```

### Generating Updated Sitemap

```bash
# Run the sitemap generation script
npm run generate-sitemap

# Or manually
node scripts/generate-sitemap.js
```

## 📊 SEO Files Structure

```
public/
├── robots.txt          # Search engine crawler instructions
├── sitemap.xml         # Site structure for search engines
├── og-image.jpg        # 1200x630px social media image (TO BE ADDED)
├── logo.png           # 512x512px logo (TO BE ADDED)
├── favicon.ico        # Already exists
├── favicon.svg        # Already exists
├── apple-touch-icon.png # Already exists
└── site.webmanifest   # Already exists

src/components/
├── SEO.tsx            # Enhanced base SEO component
└── CroatianSEO.tsx    # Croatian-specific SEO component

scripts/
└── generate-sitemap.js # Automated sitemap generation
```

## 🖼 Required Images

### 1. OG Image (`public/og-image.jpg`)
- **Dimensions**: 1200x630px
- **Content**: Smart blinds in modern home setting
- **Text**: Croatian benefits and brand logo
- **Suggestions**: 
  - "Pametne Rolete za Moderan Dom"
  - "Automatske Rolete s Daljinskim Upravljanjem"
  - "Smart Home Integracija"
  - "Energetska Efikasnost"

### 2. Logo (`public/logo.png`)
- **Dimensions**: 512x512px
- **Format**: PNG with transparent background
- **Usage**: Structured data and social media

## 🔧 Configuration

### Sitemap Configuration
Edit `scripts/generate-sitemap.js` to:
- Add new pages to `SITE_PAGES` array
- Update priorities and change frequencies
- Modify site URL if needed

### Meta Tags Configuration
Edit `src/components/CroatianSEO.tsx` to:
- Update business information
- Modify structured data
- Add new product categories

## 📈 Benefits Implemented

### SEO Benefits:
- ✅ Croatian language targeting
- ✅ Local business optimization (Zagreb)
- ✅ Product-specific structured data
- ✅ Enhanced meta descriptions
- ✅ Proper sitemap with priorities
- ✅ Geographic targeting
- ✅ Social media optimization
- ✅ Performance optimizations

### Technical Benefits:
- ✅ Automated sitemap generation
- ✅ Modular SEO components
- ✅ TypeScript support
- ✅ Breadcrumb structured data
- ✅ Proper robots.txt configuration

## 🔄 Maintenance

### Regular Tasks:
1. **Monthly**: Update sitemap with new products/pages
2. **Quarterly**: Review and update meta descriptions
3. **Yearly**: Update business information in structured data

### Commands:
```bash
# Update sitemap
npm run generate-sitemap

# Build and preview
npm run build
npm run preview
```

## 📋 SEO Checklist

### Completed ✅
- [x] Comprehensive meta tags in Croatian
- [x] Local business structured data
- [x] Geographic targeting (Zagreb, Croatia)
- [x] Sitemap generation with proper priorities
- [x] Robots.txt with crawler instructions
- [x] Enhanced Open Graph tags
- [x] Twitter Card optimization
- [x] Product-specific structured data
- [x] Breadcrumb structured data
- [x] Performance optimizations (preconnect, DNS prefetch)

### To Do 📝
- [ ] Create og-image.jpg (1200x630px)
- [ ] Create logo.png (512x512px)
- [ ] Add Croatian translations for all meta descriptions
- [ ] Set up Google Search Console
- [ ] Configure Google Analytics
- [ ] Add review structured data
- [ ] Create FAQ structured data

## 🌐 Croatian Market Optimization

### Keywords Targeted:
- Primary: "pametne rolete", "automatske rolete", "smart home hrvatska"
- Secondary: "rolete Zagreb", "električne rolete", "motorizirane rolete"
- Long-tail: "pametne rolete s daljinskim upravljanjem", "automatske rolete za stan"

### Geographic Targeting:
- Country: Croatia (HR)
- Region: Zagreb (HR-21)
- Language: Croatian (hr_HR)
- Currency: EUR
- Business Location: Zagreb, Ilica 123

This SEO setup provides a solid foundation for ranking well in Croatian search results and attracting local customers interested in smart blinds and home automation solutions. 
# Components Organization

This document outlines the organized structure of the components folder for better maintainability and navigation.

## Folder Structure

### 📁 Layout
Components related to page layout and structure:
- `Header.tsx` - Main site header
- `Footer.tsx` - Site footer
- `Navbar.tsx` - Navigation bar
- `Layout.tsx` - Main layout wrapper

### 📁 Navigation
Components for navigation and user movement:
- `MobileMenu.tsx` - Mobile navigation menu
- `MobileMenuWrapper.tsx` - Mobile menu wrapper
- `Breadcrumb.tsx` - Breadcrumb navigation
- `BackToTop.tsx` - Back to top button

### 📁 Product
All product-related components:
- `ProductCard.tsx` - Basic product card
- `ModernProductCard.tsx` - Enhanced product card
- `ProductCustomization.tsx` - Product customization interface
- `ProductCustomizationForm.tsx` - Customization form
- `PriceCalculator.tsx` - Price calculation component
- `ProductOptionsModal.tsx` - Product options modal
- `ProductOptions.tsx` - Product options display
- `ProductShowcase.tsx` - Product showcase component
- `PriceDemo.tsx` - Price demonstration component

### 📁 UI
Reusable UI components and utilities:
- `ScrollIndicator.tsx` - Page scroll indicator
- `ImageZoomModal.tsx` - Image zoom modal
- `Price.tsx` - Price display component
- `TouchFriendly.tsx` - Touch-friendly wrapper
- `BlackOverlay.tsx` - Black overlay component
- `ModalBackground.tsx` - Modal background
- `ThemeToggle.tsx` - Theme toggle button
- `BaseCard.tsx` - Base card component

### 📁 SEO
SEO and metadata components:
- `SEO.tsx` - Main SEO component
- `CroatianSEO.tsx` - Croatian-specific SEO
- `SEOAnalyzer.tsx` - SEO analysis tool
- `StructuredData.tsx` - Structured data component

### 📁 Common
Common utilities and providers:
- `ThemeProvider.tsx` - Theme context provider

### 📁 Existing Specialized Folders
These folders were already well-organized:
- `Admin/` - Admin-specific components
- `AdminRoute/` - Admin routing components
- `Basket/` - Shopping basket components
- `Card/` - Card-related components
- `Checkout/` - Checkout process components
- `Features/` - Feature showcase components
- `Filters/` - Product filtering components
- `Hero/` - Hero section components
- `InfoPanel/` - Information panel components
- `Liked/` - Liked items components
- `Notification/` - Notification components
- `ProductConfiguration/` - Product configuration components
- `Products/` - Product listing components
- `Reviews/` - Review components

## Usage

Each organized folder includes an `index.ts` file for easier imports:

```typescript
// Instead of:
import Header from '../components/Header';
import Footer from '../components/Footer';

// You can now use:
import { Header, Footer } from '../components/Layout';
```

## Benefits

1. **Better Organization**: Related components are grouped together
2. **Easier Navigation**: Clear folder structure makes finding components easier
3. **Improved Maintainability**: Logical grouping makes code maintenance simpler
4. **Cleaner Imports**: Index files allow for cleaner import statements
5. **Scalability**: New components can be easily categorized and added

## Guidelines

- Keep components under 200 lines as per project standards
- Use meaningful names that describe the component's purpose
- Add new components to the appropriate folder based on their functionality
- Update the corresponding `index.ts` file when adding new components
- Maintain TypeScript types for all components 
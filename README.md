# SmartBlinds - Smart Window Solutions

A modern e-commerce platform for smart window coverings powered by Eve MotionBlinds motors. This project showcases a complete solution for browsing, configuring, and purchasing smart blinds.

![SmartBlinds Preview](https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)

## Features

- 🎨 Modern, responsive design with dark mode support
- 🛍️ Comprehensive product catalog with multiple categories
- ⚡ Real-time product configuration
- 🔍 Detailed product views with specifications
- 📱 Mobile-friendly interface
- 🌙 Dark mode support
- 🔄 Interactive product filtering
- 💳 Product customization system
- 📖 Detailed installation and setup guides

## Technologies Used

### Frontend
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- React Router DOM 6.22.3
- Tailwind CSS 3.4.1
- Lucide React 0.344.0 (for icons)

### Development Tools
- ESLint 9.9.1
- PostCSS 8.4.35
- Autoprefixer 10.4.18

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

You can check your versions by running:
```bash
node --version
npm --version
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
smartblinds/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Card/          # Card-related components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   └── useTheme.ts
│   ├── types/             # TypeScript type definitions
│   │   └── product.ts
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── index.html           # HTML template
└── package.json         # Project dependencies and scripts
```

## Key Features Explained

### Product Categories
- Roller Blinds
- Zebra Blinds
- Curtain Tracks

### Smart Features
- Light Sensing
- Smart Control via App
- Long Battery Life
- 5-Year Warranty

### User Guide Sections
- Quick Installation
- Connect to Home
- Smart Control

## Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration can be found in:
- `tailwind.config.js`
- `postcss.config.js`

### TypeScript

TypeScript configuration is split into:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific configuration
- `tsconfig.node.json` - Node.js specific configuration

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks
- Implement responsive design using Tailwind CSS
- Use semantic HTML elements
- Maintain component-based architecture

### Component Structure
- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error handling
- Add appropriate loading states
- Include proper accessibility attributes

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Best Practices

### File Organization
- Create small, focused components
- Break down large files into multiple smaller modules
- Each file should have a single responsibility
- Extract reusable logic into utility files
- Keep related files together in feature-specific folders

### Code Quality
- Write clean, self-documenting code
- Add comments for complex logic
- Use meaningful variable and function names
- Follow TypeScript best practices
- Implement proper error handling

### Performance
- Optimize images and assets
- Implement lazy loading where appropriate
- Use React.memo for expensive computations
- Minimize bundle size
- Follow React performance best practices

## Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev/)
# Pagination Implementation

## Overview

This document describes the pagination implementation for the admin orders page, which displays 10 orders per page instead of showing all 33 orders on a single page.

## Components Created

### 1. Pagination Component (`src/components/UI/Pagination.tsx`)

A reusable pagination component that provides:
- Page navigation with previous/next buttons
- Numbered page buttons with ellipsis for large page counts
- Mobile-responsive design
- Dark mode support
- Accessibility features

**Props:**
- `currentPage`: Current active page number
- `totalPages`: Total number of pages
- `onPageChange`: Callback function when page changes
- `itemsPerPage`: Number of items per page
- `totalItems`: Total number of items

### 2. usePagination Hook (`src/hooks/usePagination.ts`)

A custom hook that handles pagination logic:
- Calculates paginated data from the full dataset
- Manages current page state
- Provides navigation functions
- Automatically resets to page 1 when data changes

**Parameters:**
- `data`: Array of items to paginate
- `itemsPerPage`: Number of items per page
- `initialPage`: Starting page (default: 1)

**Returns:**
- `currentPage`: Current page number
- `totalPages`: Total number of pages
- `paginatedData`: Current page's data
- `goToPage`: Function to navigate to specific page
- `nextPage`: Function to go to next page
- `previousPage`: Function to go to previous page
- `canGoNext`: Boolean indicating if next page is available
- `canGoPrevious`: Boolean indicating if previous page is available

### 3. Updated Components

#### AdminOrdersPage (`src/pages/AdminOrdersPage.tsx`)
- Added pagination configuration (10 items per page)
- Integrated usePagination hook
- Updated to pass paginated data to OrderTable
- Added Pagination component to the UI

#### OrderSearch (`src/components/Admin/OrderSearch.tsx`)
- Enhanced to show pagination-aware information
- Displays current page and item range
- Shows filtered vs total counts

#### Pagination Styles (`src/styles/Pagination.css`)
- Custom CSS for pagination component
- Responsive design
- Dark mode support
- Accessibility improvements

## Usage

The pagination is automatically applied to the admin orders page. Users can:

1. **Navigate Pages**: Click on page numbers or use previous/next buttons
2. **Search**: Search functionality works across all pages, with pagination applied to filtered results
3. **Responsive**: Works on both desktop and mobile devices
4. **Accessibility**: Keyboard navigation and screen reader support

## Configuration

To change the number of items per page, modify the `ITEMS_PER_PAGE` constant in `AdminOrdersPage.tsx`:

```typescript
const ITEMS_PER_PAGE = 10; // Change this value as needed
```

## Features

- **Performance**: Only renders 10 orders at a time, improving page performance
- **Search Integration**: Pagination works with search/filter functionality
- **Responsive Design**: Adapts to different screen sizes
- **Dark Mode**: Supports both light and dark themes
- **Accessibility**: ARIA labels and keyboard navigation
- **Reusable**: Components can be used for other paginated lists

## Technical Details

- Uses React hooks for state management
- TypeScript for type safety
- CSS modules for styling
- Responsive breakpoints for mobile optimization
- Maintains URL state (can be extended for URL-based pagination)

## Future Enhancements

Potential improvements that could be added:
- URL-based pagination (page number in URL)
- Configurable items per page dropdown
- Jump to page input field
- Server-side pagination for large datasets
- Infinite scroll option 
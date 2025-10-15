# Mini Catalog + Cart

A React + TypeScript + Tailwind CSS application that implements a product catalog with shopping cart functionality for a Shopify test assignment.

## Features Implemented

### Core Requirements ✅

- **Product Catalog**: Fetches and displays products from `/products.json`
- **Search Functionality**: Search products by title with real-time filtering
- **Sort Functionality**: Sort products by price (ascending/descending)
- **Add to Cart**: Add products to cart with quantity controls
- **Cart Management**: View cart items, update quantities, remove items
- **Line Totals & Subtotal**: Calculate and display individual line totals and cart subtotal
- **localStorage Persistence**: Cart state persists across browser sessions
- **Loading & Error States**: Proper loading spinner and error handling
- **Accessible HTML**: Semantic HTML structure with proper ARIA labels

### Technical Implementation

#### State Management

- **React Context API**: Used for cart state management instead of external libraries
- **useReducer**: Implemented for complex cart state logic with actions
- **localStorage**: Automatic persistence of cart data

#### Component Architecture

```
src/
├── components/
│   ├── __tests__/        # Component test files
│   │   ├── Cart.test.tsx
│   │   └── ProductCard.test.tsx
│   ├── ProductCard.tsx   # Individual product display with add to cart
│   ├── Cart.tsx          # Shopping cart with quantity controls
│   └── CartNotification.tsx # Cart operation notifications
├── contexts/
│   ├── __tests__/        # Context test files
│   │   └── CartContext.test.tsx
│   └── CartContext.tsx   # Cart state management with Context API
├── data/
│   └── products.ts       # Product fetching from JSON file
├── hooks/
│   ├── useCart.ts        # Main cart hook combining local and API operations
│   ├── useCartApi.ts     # API operations for cart persistence
│   └── useLocalCart.ts   # Local cart state management
├── services/
│   ├── __tests__/        # Service test files
│   │   └── cartApi.test.ts
│   └── cartApi.ts        # API service for cart operations
├── test/
│   ├── setup.ts          # Test environment setup
│   └── test-utils.tsx    # Testing utilities and helpers
├── types/
│   └── index.ts          # TypeScript interfaces
├── utils/
│   ├── __tests__/        # Utility test files
│   │   └── format.test.ts
│   └── format.ts         # Price formatting utilities
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

#### Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Error Handling**: Graceful error states with retry functionality
- **Performance**: useMemo for optimized filtering and sorting
- **Accessibility**: Proper ARIA labels, semantic HTML, keyboard navigation
- **Optimistic Updates**: Immediate UI updates with API rollback on failure
- **Real-time Feedback**: Loading states and error notifications

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage

1. **Browse Products**: View the product catalog with search and sort options
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Manage Cart**: Use quantity controls (+/-) or remove items
4. **Persistent Cart**: Cart data automatically saves to localStorage
5. **Save to API**: Click "Save Cart" to persist changes to the API

### Testing

```bash
# Run all tests
npm run test:run

# Run tests in watch mode
npm run test


**Test Coverage:**

- **Hooks**: Local cart state management and API operations
- **Components**: Product cards, cart display, and user interactions
- **Context**: Cart state management and localStorage integration
- **Utilities**: Price formatting and data transformation
- **Services**: API simulation and error handling

## Technical Decisions

### Why React Context over Zustand?

- **Simplicity**: Context API is built into React, no additional dependencies
- **Small Scale**: For this application size, Context provides sufficient state management
- **Learning**: Demonstrates understanding of React's built-in state management

### Why localStorage over API?

- **Assignment Scope**: Focus on frontend functionality rather than backend integration
- **Simplicity**: localStorage provides immediate persistence without server setup
- **User Experience**: Cart persists across browser sessions

### Design Choices

- **Tailwind CSS**: Rapid development with utility-first approach
- **TypeScript**: Type safety and better developer experience
- **Semantic HTML**: Proper accessibility and SEO structure
- **Mobile-First**: Responsive design starting from mobile breakpoints

### Optimistic Cart Implementation

The application implements optimistic updates for cart operations:

1. **Immediate UI Updates**: Cart changes appear instantly for better UX
2. **API Integration**: Simulated `/api/cart` endpoint with 10% failure rate for testing
3. **Automatic Rollback**: Failed operations automatically revert to previous state
4. **User Feedback**: Loading indicators and error notifications with retry options
5. **Dual Persistence**: Both localStorage and API persistence for reliability

**How it works:**

- User action → Immediate UI update → API call in background
- If API succeeds → State confirmed
- If API fails → UI reverts + error notification with retry option

## What Was Skipped (Stretch Goals)

### Stretch Goals Implemented ✅

- **✅ Context for cart state**: React Context API with useReducer
- **✅ Optimistic "save cart" to /api/cart**: Simulated API calls with rollback on error
- **✅ Error handling**: User-friendly error notifications with retry functionality
- **✅ Loading states**: Visual feedback during cart operations

### Testing Implementation ✅

- **✅ Test Framework**: Vitest with React Testing Library
- **✅ Unit Tests**: Comprehensive test coverage for:
  - `useLocalCart` hook - Local cart state management
  - `useCartApi` hook - API operations and error handling
  - `CartContext` - Context provider and localStorage integration
  - `ProductCard` component - Product display and interactions
  - `Cart` component - Cart display and operations
  - `formatPrice` utility - Price formatting functions
  - `cartApi` service - API simulation and error handling

### Optional Features Not Implemented

- **Advanced Features**: No wishlist, product details, or checkout flow

### Reasoning

- **Time Constraints**: Focus on core requirements first
- **Scope Management**: Assignment specified these as optional stretch goals
- **MVP Approach**: Deliver a fully functional core product

## Future Enhancements

If this were a production application, consider adding:

- Unit and integration tests
- API integration with proper error handling
- Product detail pages
- User authentication
- Checkout flow
- Payment integration
- Admin panel for product management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes as part of a Shopify technical assessment.
```

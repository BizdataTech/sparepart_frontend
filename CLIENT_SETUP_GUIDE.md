# Client-Side Setup Guide

## Overview

The client-side is the customer-facing e-commerce application where users can browse products, manage their cart, place orders, and view their profile and order history.

## Prerequisites

- Backend API running and accessible
- Frontend dependencies installed

## Initial Setup

### 1. Environment Configuration

Make sure env variables are set in `.env`:

### 2. Global Providers Setup

The app requires two main context providers:

- **UserContext** - Handles user authentication and login/logout
- **CartContext** - Manages shopping cart items for authenticated users

These are typically wrapped in `AppProvider.jsx` and applied to the root layout.

### 3. Starting the App

```bash
npm install
npm run dev
```

Then visit: `http://localhost:3000`

## How Client-Side Works

### Authentication Flow

1. User visits the app
2. **UserContext** verifies user automatically on load
3. Three states: `null` (loading), `false` (not logged in), `{user}` (logged in)
4. If not logged in, user can browse products but cannot add to cart
5. Login/Register pages at `/register/sign-in` and `/register/sign-up`

### Cart System

1. **CartContext** depends on UserContext
2. Cart only loads when user is authenticated
3. Users can add/remove items from cart
4. Cart data syncs across pages

### Main Layout

- **Header** - Navigation, search, user menu, cart icon
- **Main Content** - Page-specific content
- **Footer** - Contact info, links, company info

## Key Components & Files

| Component     | Purpose                                        |
| ------------- | ---------------------------------------------- |
| `Header.jsx`  | Navigation bar with search, auth buttons, cart |
| `Footer.jsx`  | Footer section with links and info             |
| `UserContext` | User authentication management                 |
| `CartContext` | Shopping cart state & API calls                |
| `layout.jsx`  | Main layout wrapper                            |

## Page Routes

| Route                 | Purpose                         |
| --------------------- | ------------------------------- |
| `/`                   | Home page with product sections |
| `/category/[name]`    | Browse products by category     |
| `/product/[id]`       | View single product details     |
| `/cart`               | Shopping cart page              |
| `/checkout`           | Checkout with address & payment |
| `/profile/profile`    | User profile info               |
| `/profile/orders`     | View past orders                |
| `/profile/wishlist`   | Saved wishlist items            |
| `/order-summary/[id]` | View specific order details     |
| `/register/sign-in`   | User login page                 |
| `/register/sign-up`   | User registration page          |

## Key Services

The app uses API services for various operations:

- **cartServices.js** - Cart API operations
- **orderServices.js** - Order management API calls
- Additional services in `/services` folder

See service files for available functions and usage examples.

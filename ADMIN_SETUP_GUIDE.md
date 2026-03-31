# Admin Panel Setup Guide

## Overview

The admin panel is a protected dashboard for managing products, orders, categories, brands, users, and vehicles in your e-commerce application.

## Prerequisites

- Backend API running and accessible
- Admin credentials from your backend

## Initial Setup

### 1. Environment Configuration

Make sure env variables are set in `.env`:

### 2. Authentication Flow

- Admin users access via `/admin/sign-in` page
- `AdminContext` automatically verifies user credentials
- User data is stored in context for use across the app
- Unauthorized users are redirected to sign-in page

### 3. Starting the App

```bash
npm install
npm run dev
```

Then visit: `http://localhost:3000/admin`

## How Admin Panel Works

### Authentication Layer

- `AdminContext.jsx` - Manages user authentication state
- Verifies user on app load via backend API
- Three states: `null` (loading), `false` (not authenticated), `{user}` (authenticated)

### Layout System

- `AdminLayout.jsx` - Main wrapper for all admin pages
- Provides sidebar, breadcrumbs, and page title bar
- Auto-checks authentication before showing content

### Routing

- `useRoute.js` hook - Tracks current page and generates breadcrumbs
- Integrates with `adminRouteData.js` for route metadata
- Dynamically updates page titles and icons

## Key Files Location

| File               | Purpose                   |
| ------------------ | ------------------------- |
| `AdminContext.jsx` | User authentication state |
| `AdminLayout.jsx`  | Main layout wrapper       |
| `layout.jsx`       | Next.js layout export     |
| `admin/`           | All admin module pages    |
| `utils/`           | Shared admin utilities    |

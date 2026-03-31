# Admin Panel Folder Structure

## Directory Overview

```
app/(admin)/
├── admin.css                    # Admin-specific styles
├── AdminContext.jsx             # Authentication & user state management
├── AdminLayout.jsx              # Main layout component wrapper
├── layout.jsx                   # Next.js layout file
├── utils/                       # Shared utilities
└── admin/                       # Main admin module pages
    ├── brands/
    ├── categories/
    ├── home-management/
    ├── orders/
    ├── products/
    ├── users/
    └── vehicles/

components/admin/                # Shared admin UI components
├── AdminBreadCrumbs.jsx
├── AdminSectionTitle.jsx
├── SearchSection.jsx
├── Sidebar.jsx
└── ... (others)
```

---

## File Descriptions

### `admin.css`

**Purpose:** Stores all admin panel CSS styles

- Page layouts and spacing
- Component styling
- Responsive design rules

---

### `AdminContext.jsx`

**Purpose:** Global user authentication management
**Main Objectives:**

- Verify admin user on app startup
- Store authenticated user data
- Handle unauthorized access
- Provide user state to all admin pages

**Key Functions:**

- Fetches user from backend API
- Sets user state (null → loading, false → not auth, {user} → authenticated)
- Redirects unauthenticated users to login

---

### `AdminLayout.jsx`

**Purpose:** Main wrapper component for all admin pages
**Main Objectives:**

- Display sidebar navigation
- Show page title and breadcrumbs
- Protect routes with authentication check
- Provide consistent layout across all admin pages

**Contains:**

- Sidebar import and display
- Page title display
- Breadcrumb navigation
- Loading spinner during auth verification
- Main content area

---

### `layout.jsx`

**Purpose:** Next.js layout file for the admin route group

- Wraps all admin pages with providers
- Applies AdminContext to all child pages
- Ensures authentication on all admin routes

---

### `utils/`

**Purpose:** Shared utility functions and helpers for admin operations
**Used for:**

- Common admin operations
- Helper functions
- Reusable logic across modules

---

### `admin/` (Main Module Folder)

#### `useRoute.js`

**Purpose:** Custom hook for route tracking and breadcrumb generation
**Does:**

- Reads current URL path
- Matches path with route metadata
- Generates page titles and icons
- Creates breadcrumb data

---

## Module Folders (`brands/`, `categories/`, `orders/`, `products/`, `users/`, `vehicles/`)

Each module follows the same pattern:

### Standard Module Structure

```
module-name/
├── page.jsx              # Next.js page entry point
├── ModuleName.jsx        # Main component (e.g., Brand.jsx)
├── ModuleList.jsx        # List/table view (e.g., BrandList.jsx)
├── ModuleCreation.jsx    # Create/edit form (e.g., BrandCreation.jsx)
└── useModule.js          # Custom hook (e.g., useBrand.js)
```

### What Each File Does

**`page.jsx`**

- Next.js page file
- Entry point for the route
- Imports and renders the main component


**`useModule.js`** (e.g., `useBrand.js`)

- Custom React hook for module logic
- API calls to backend
- State management for the module
- Data fetching and mutations

---

### `components/admin/` (Shared UI Components)

**Purpose:** Reusable UI elements specific to the admin panel.

- **`Sidebar.jsx`**: Main navigation component for the admin panel.
- **`AdminBreadCrumbs.jsx`**: Displays the current path and allows navigation back.
- **`AdminSectionTitle.jsx`**: Standardized heading for admin pages.
- **`SearchSection.jsx`**: Common search and filter interface for lists.
- **`ShimmerContainer.jsx`**: Loading skeleton for data fetching states.
- **`AdminElseBlock.jsx`**: Handles empty states or "no data found" messages.
- **`InputLabel.jsx`**: Styled labels for form inputs.
- **`EmptyRow.jsx`**: Placeholder for empty table rows.
- **`ProductNameTag.jsx`**: specialized tag for displaying product names.

---

## Data Flow

```
User Login → AdminContext (verify) → AdminLayout (check auth)
                                          ↓
                                    useRoute (read URL)
                                          ↓
                                    Render Module Page
                                          ↓
                                  Display Sidebar + Content
```



## Key Points to Remember

✓ All admin pages must be inside `app/(admin)/admin/` folder
✓ Authentication is checked automatically through AdminLayout
✓ Always create a custom hook (useModule.js) for API calls
✓ Follow the module naming pattern for consistency
✓ Breadcrumbs update automatically via useRoute hook

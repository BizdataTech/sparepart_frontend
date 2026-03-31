# Client-Side Folder Structure

## Directory Overview

```
app/(client)/
├── layout.jsx                   # Main client layout (Header, Footer)
├── page.jsx                     # Home page
├── (profile)/                   # User profile section
│   ├── layout.jsx              # Profile layout
│   ├── profile/                # Profile info page
│   ├── orders/                 # Order history page
│   └── wishlist/               # Saved items page
├── cart/                        # Shopping cart
│   ├── page.jsx
│   └── CartItem.jsx            # Cart item component
├── category/                    # Product category browsing
│   └── [category]/             # Dynamic category page
├── checkout/                    # Order checkout process
│   ├── page.jsx
│   ├── Address.jsx
│   ├── AddressCard.jsx
│   ├── AddressModal.jsx
│   ├── NewAddressModal.jsx
│   ├── Payment.jsx
│   ├── ProductList.jsx
│   └── Summary.jsx
├── product/                     # Product details
│   └── [id]/                   # Dynamic product page
└── order-summary/               # Order confirmation
    ├── page.jsx
    ├── OrderSummaryLayout.jsx
    └── useOrder.js

register/                        # Authentication pages
├── layout.jsx
├── sign-in/
│   ├── page.jsx
│   ├── schema.js
│   └── SignInForm.jsx
└── sign-up/
    ├── page.jsx
    ├── schema.js
    └── SignUpForm.jsx
```

---

## File & Folder Descriptions

### `layout.jsx`

**Purpose:** Main wrapper for all client pages
**Contains:**

- Header component
- Footer component
- Sonner toaster for notifications
- Modal container
- Responsive layout structure

**Key Features:**

- 90% width on mobile, 85% on desktop
- Flexbox layout for header at top, footer at bottom
- Neutral gray background color

---

### `page.jsx` (Home Page)

**Purpose:** Landing page showing featured products
**Does:**

- Fetches available sections from backend
- Displays banner section
- Shows product listing sections
- Handles loading states

---

## Section: `(profile)/` - User Profile Area

### `layout.jsx`

**Purpose:** Profile section layout

- Wraps all profile-related pages
- Provides sidebar navigation for profile sections

### `profile/`

**Purpose:** Display user account information

- User profile data
- Account settings
- Personal information

### `orders/`

**Purpose:** Show order history

- List all past orders
- Order status tracking
- Quick access to view details

### `wishlist/`

**Purpose:** Saved items section

- Bookmarked/favorited products
- Quick add to cart from wishlist

---

## Section: `cart/` - Shopping Cart

### `page.jsx`

**Purpose:** Main cart display page
**Does:**

- Shows all items in user's cart
- Displays subtotal and total
- Option to proceed to checkout

### `CartItem.jsx`

**Purpose:** Individual cart item component
**Shows:**

- Product image and name
- Quantity selector
- Price per item
- Remove button

---

## Section: `checkout/` - Multi-Step Checkout

### `page.jsx`

**Purpose:** Main checkout page entry point

- Orchestrates checkout flow
- Manages checkout state

### `Address.jsx`

**Purpose:** Address selection component

- List of saved addresses
- New address option
- Address validation

### `AddressCard.jsx`

**Purpose:** Display single address

- Shows address details
- Select button
- Edit/Delete options

### `AddressModal.jsx` & `NewAddressModal.jsx`

**Purpose:** Address input forms

- **AddressModal** - Edit existing address
- **NewAddressModal** - Add new address
- Form validation
- Submit handler

### `ProductList.jsx`

**Purpose:** Items being purchased summary

- Shows all items in current order
- Quantities and individual prices

### `Payment.jsx`

**Purpose:** Payment method selection

- Payment options
- Payment details input
- Payment processing

### `Summary.jsx`

**Purpose:** Final order review

- Item summary
- Address summary
- Total calculation
- Final submit button

### `useOrder.js`

**Purpose:** Custom hook for checkout operations

- Manages checkout state
- API calls for order submission
- Address and payment handling

---

## Section: `category/` - Product Browsing

### `[category]/`

**Purpose:** Dynamic page for each product category
**Shows:**

- All products in category
- Filters and sorting
- Product grid/list view
- Pagination if needed

**Route:** `/category/electronics`, `/category/parts`, etc.

---

## Section: `product/` - Product Details

### `[id]/`

**Purpose:** Dynamic page for individual product
**Shows:**

- Product images/gallery
- Product description
- Price and availability
- Add to cart button
- Related products

**Route:** `/product/1`, `/product/42`, etc.

---

## Section: `order-summary/` - Order Confirmation

### `page.jsx`

**Purpose:** Order confirmation display

- Shows order was successful
- Order number and details
- Next steps information

### `OrderSummaryLayout.jsx`

**Purpose:** Layout wrapper for order summary

- Provides styling and structure
- Thank you message

### `useOrder.js`

**Purpose:** Hook to fetch and manage order data

- Retrieves order details from backend
- Handles order state

---

## Section: `register/` - Authentication

### `layout.jsx`

**Purpose:** Auth pages layout

- Different from client layout (no header/footer typically)
- Simple centered form layout

### `sign-in/` - Login Page

**`page.jsx`**

- Login page entry point

**`SignInForm.jsx`**

- Email/password input fields
- Submit button
- Link to sign-up page

**`schema.js`**

- Form validation rules
- Email format validation
- Password requirements

### `sign-up/` - Registration Page

**`page.jsx`**

- Registration page entry point

**`SignUpForm.jsx`**

- Name, email, password inputs
- Terms & conditions checkbox
- Submit button
- Link to login page

**`schema.js`**

- Form validation schema
- Password confirmation rules
- Email validation

---

## Global Context Files

### `context/userContext.jsx`

**Purpose:** Manages user authentication state globally
**Functions:**

- `getUserStat()` - Verify user on app load
- `loginUser()` - Handle user login
- `signupUser()` - Handle user registration
- `logoutUser()` - Handle logout

**States:**

- `null` = Loading/verifying
- `false` = Not authenticated
- `{user}` = User object with data

### `context/cartContext.jsx`

**Purpose:** Manages shopping cart state globally
**Functions:**

- `getCart()` - Fetch user's cart
- `addToCart()` - Add product to cart
- `removeFromCart()` - Remove item from cart
- `updateCartQuantity()` - Change item quantity

**Depends on:** UserContext (only loads when user authenticated)

### `context/AppProvider.jsx`

**Purpose:** Root provider component

- Wraps UserContext around entire app
- Wraps CartContext (depends on UserContext)
- Makes contexts available to all pages

---

## Component Organization

### Reusable Components

Located in `/components/client/`:

- **Header/** - Navigation components
- **Footer/** - Footer components
- **Home/** - Home page sections
- **Product/** - Product display components
- **sections/** - Reusable section components
- **ProfileSidebar.jsx** - Profile navigation
- **RegisterForm.jsx** - Auth form components

### Services

Located in `/services/`:

- **cartServices.js** - Cart API operations
- **orderServices.js** - Order management

---

## Key User Journeys

### New User Flow

```
Home → Browse Categories → View Product → Sign Up →
Add to Cart → Checkout → Enter Address → Payment → Order Confirmation
```

### Returning User Flow

```
Home → Sign In → Browse → Add to Cart →
Checkout (address auto-filled) → Payment → Order Confirmation
```

### Profile/Order History

```
Profile → View Orders → Click Order → Order Summary →
See full order details
```

---

## Important Notes

✓ All authenticated routes require UserContext user to be set
✓ Cart only available after user is logged in
✓ Checkout requires authenticated user with saved addresses
✓ Each dynamic route [param] creates unique page for each value
✓ Authentication pages in `/register` are public (no auth required)
✓ Profile section requires logged-in user

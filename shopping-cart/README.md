# Morrow Market — Shopping Cart Workspace

A standalone React + Vite e-commerce frontend in the `shopping-cart/` folder. It is an interactive prototype for three retail departments: groceries, home & living, and fashion.

## Features

- Responsive storefront with department landing cards and product discovery
- Product catalogue with search, department/category filters, price filters and sorting
- Product detail pages with image galleries, size/colour options where applicable, quantity selection and buy-now flow
- Redux Toolkit cart with quantity controls, variant-aware cart lines, coupon codes and derived totals
- Redux Toolkit wishlist
- Checkout form with address and simulated payment method selection
- Mock order creation, confirmation and order history
- Persisted cart, wishlist and orders in browser localStorage
- RTK Query product catalogue caching
- DummyJSON product data with local seed fallback
- Replaceable provider boundary for future backend integration

## Run this app by itself

From this folder:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Run from the app-test workspace

From the repository root:

```bash
npm install
npm run dev --workspace=shopping-cart
npm run build
```

The repository root build discovers this workspace and places its production files under `dist/shopping-cart/`.

## Data providers

The default provider uses DummyJSON's products API:

- `GET https://dummyjson.com/products?limit=0`
- `GET https://dummyjson.com/products/:id` (the prototype currently loads the catalogue once and resolves detail from that catalogue)

The service layer normalizes API records into the app's canonical product model. If DummyJSON is unavailable, the app falls back to local curated sample products. DummyJSON values are fictional sample data. The numeric price is converted using a fixed prototype multiplier solely to show INR-style prices; it is not a live currency conversion or real retail price.

To switch to the future backend adapter, set:

```env
VITE_COMMERCE_PROVIDER=backend
VITE_API_BASE_URL=/api
```

The backend adapter expects:
- `GET /api/products` → `{ products, total, page, pageSize }`
- `GET /api/products/:id` → one canonical product object
- `GET /api/departments` → department array
- `POST /api/orders` → created order object

Adjust only the provider/service layer when the Express API contract differs. Components and Redux state should continue using the canonical product and order models.

## Prototype boundaries

- Cart, wishlist and order history are local to this browser profile.
- Checkout and order creation are simulated.
- UPI/card methods are selectors only; no payment credentials are collected and no real payment is initiated.
- Product stock, price, discount and totals are demonstration values. A future backend must validate authoritative prices, stock, coupons and order totals.
- Customer details entered into this prototype remain in the browser form flow; connect a secure backend before collecting real customer data.

## Technology

React 19, Vite 8, Redux Toolkit, RTK Query, React Redux, React Router, and Lucide React.

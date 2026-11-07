# App Test Lab

A single Vite-powered repository containing independently structured frontend applications. Each mini-app is an npm workspace with its own package manifest, Vite config, React entry point, components, styles, and local build output. The root build collects all finished apps into one `dist/` directory for a single Vercel deployment.

## Install and run

Install all workspace dependencies once, from the repository root:

```bash
npm install
```

Run the root App Test Lab landing page (the homepage manifest is generated automatically):

```bash
npm run dev
```

Run an individual application:

```bash
npm run dev --workspace=student-library
npm run dev --workspace=shopping-cart
```

Each application can also be copied out and run independently with `npm install` and `npm run dev` inside its folder.

## Build all applications

From the repository root:

```bash
npm run build
```

The root build discovers top-level workspace folders with a `package.json` and `build` script, generates `public/apps.json` for the homepage, builds the landing page, builds each workspace independently, assigns its deployed base path, and copies its local `dist/` into `dist/<app-folder>/`. The generated manifest is ignored by Git and recreated for every root development start and production build.

## Add another mini-app

Create a new top-level folder with its own `package.json`, Vite config, `index.html`, and `src/`. Give it a unique package name and a `build` script, and configure Vite with:

```js
base: process.env.APP_BASE_PATH || "/"
```

Its normal build output should be the folder's local `dist/`. The root npm workspace pattern (`*`) and build script automatically discover top-level folders that contain a package manifest and build script. The app is automatically built under `/<folder-name>/` and added to the homepage; **you do not need to edit the root `index.html`**.

For a polished homepage card, add optional metadata to the new app's `package.json`:

```json
{
  "appTestLab": {
    "displayName": "My Project",
    "description": "A short description of the application.",
    "category": "TOOLS · REACT",
    "icon": "✦",
    "sortOrder": 30
  }
}
```

If omitted, the card title is derived from the folder name and sensible defaults are used for the description, category, and icon. Lower `sortOrder` values appear first.

## Vercel

Connect this repository as one Vercel project. Use the repository root as Root Directory, `npm install` as Install Command, `npm run build` as Build Command, and `dist` as Output Directory. The root Vercel config includes an app-scoped fallback for Shopping Cart's client-side routes.

## Current applications

- **Student Library** — responsive library dashboard with catalogue search/filtering, add/remove, checkout/return, statistics, and browser localStorage persistence.
- **Shopping Cart** — React + Redux Toolkit commerce prototype with DummyJSON products, groceries/home/fashion departments, cart, wishlist, simulated checkout and orders, plus replaceable mock/backend service providers.

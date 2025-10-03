# Hydrogen Express Skeleton

This is a Hydrogen skeleton template configured to run with NodeJS [Express](https://expressjs.com/) instead of Shopify Oxygen. 

Hydrogen is Shopify's stack for headless commerce, designed to dovetail with [React Router](https://reactrouter.com/), the full stack web framework. This template contains a **minimal Express setup** with basic components and routes to get started with Hydrogen on Node.js.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with React Router](https://reactrouter.com/en/main)

## What's included

- React Router 7
- Hydrogen
- Express server
- Vite
- TypeScript
- ESLint
- Minimal setup of components and routes

## Important Notes

This Express setup differs from the standard Hydrogen template:

1. **Cache Implementation**: Uses an in-memory cache. In production, you should implement redis, memcached, or another cache that implements the [Cache interface](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
2. **Storefront Redirect**: Does not utilize [`storefrontRedirect`](https://shopify.dev/docs/api/hydrogen/utilities/storefrontredirect) functionality.
3. **Minimal Routes**: Only includes index and product routes. Add more routes as needed.

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher (but less than 22.0.0)

### Environment Setup

Create a `.env` file with your Shopify store credentials:

```env
PUBLIC_STOREFRONT_API_TOKEN="your-token"
PUBLIC_STORE_DOMAIN="your-store.myshopify.com"
PUBLIC_STOREFRONT_ID="your-storefront-id"
SESSION_SECRET="your-session-secret-at-least-32-chars"
```

## Local development

Start the Express development server:

```bash
npm run dev
```

This starts your app in development mode with hot module replacement.

## Building for production

```bash
npm run build
```

## Production deployment

Run the app in production mode:

```bash
npm start
```

### Deployment

When deploying your Express application, ensure you deploy:

- `build/` directory
- `server.mjs` file
- `package.json` and dependencies
- Your `.env` configuration

The Express server runs on the port specified by the `PORT` environment variable (defaults to 3000).

## Project Structure

- `server.mjs` - Express server configuration
- `scripts/dev.mjs` - Development server orchestration
- `app/` - React Router application code
  - `entry.client.tsx` - Client-side entry point
  - `entry.server.tsx` - Server-side rendering entry point
  - `root.tsx` - Root layout component
  - `routes/` - Application routes
- `build/` - Production build output (generated)
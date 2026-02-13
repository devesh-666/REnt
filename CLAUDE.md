# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TechRent — a React SPA for computer/electronics rentals. Frontend-only with mock data (no backend). Uses React 19, Vite 7, React Router v7, and Lucide icons.

## Commands

- `npm run dev` — Start dev server (Vite HMR)
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run preview` — Preview production build

No test framework is configured.

## Architecture

**State management:** React Context API with localStorage persistence.
- `src/context/AuthContext.jsx` — user auth state, `useAuth()` hook. Admin detection: email containing "admin" sets `isAdmin` flag. All auth is client-side mock.
- `src/context/CartContext.jsx` — cart state, `useCart()` hook. Provides addToCart, removeFromCart, clearCart, calculateTotal.

**Routing** (React Router DOM v7, defined in `src/App.jsx`):
`/` Home, `/rentals` listing, `/rentals/:id` detail, `/cart` checkout, `/admin` dashboard, `/login`, `/about`, `/contact`

**Data:** All product data lives in `src/utils/dummyData.js` — 6 hardcoded computer objects with id, name, category, brand, image URLs, specs, pricing (day/week/month), and status.

**Pages** (`src/pages/`): Each route maps to a page component. Cart has a multi-step checkout flow (review → form → confirmation). Admin has tabs for stats, computer management, orders, and users.

**Shared components** (`src/components/`): Navbar (responsive, cart badge, user menu), ComputerCard (product display), Footer.

## Styling

CSS variables defined in `src/index.css`. Mix of page-specific CSS files and inline JSX styles. Primary color: `#2563eb`, accent: `#f59e0b`. Responsive breakpoint at 768px.

## Code Conventions

- All functional components with hooks (no class components)
- ES modules (`"type": "module"` in package.json)
- Plain JavaScript (JSX), no TypeScript
- ESLint flat config with react-hooks and react-refresh plugins

# Gemini Project: The Carpenter

## Project Overview

This project is an e-commerce website for "The Carpenter," a company that sells doors. A unique requirement for this project is that it will not display any prices for the products. Customers will be able to browse and inquire about products, but not purchase them directly through the site.

## Tech Stack

- **CMS:** [PayloadCMS v3](https://payloadcms.com/)
- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [ShadCN](httpss://ui.shadcn.com/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Project Structure

The project is a standard Next.js application with PayloadCMS integrated. Here are some of the key files and directories:

- `src/payload.config.ts`: The main configuration file for PayloadCMS. This is where you define collections, globals, and other CMS settings.
- `src/collections/`: This directory contains the definitions for the PayloadCMS collections.
  - `src/collections/Users.ts`: Defines the `Users` collection for authentication and user management.
  - `src/collections/Posts.ts`: A sample collection that can be used for blog posts or other content. This will likely be replaced with a `Products` or `Doors` collection.
- `src/app/(app)`: This directory contains the frontend of the e-commerce site.
  - `src/app/(app)/layout.tsx`: The main layout for the customer-facing website.
  - `src/app/(app)/page.tsx`: The homepage of the website.
- `src/app/(payload)`: This directory contains the PayloadCMS admin panel and API.
  - `src/app/(payload)/admin`: The route for the PayloadCMS admin interface.
- `src/components/`: This directory contains reusable React components.
  - `src/components/ui/`: This directory is for ShadCN UI components.
- `next.config.mjs`: The configuration file for Next.js.
- `tailwind.config.js`: The configuration file for Tailwind CSS.

## Core Features

- **Product Catalog:** Display a catalog of doors without prices.
- **Product Details:** Each product will have a dedicated page with detailed information and images.
- **Inquiry Form:** A form for customers to inquire about products.
- **Content Management:** The ability to manage products and other site content through the PayloadCMS admin panel.
- **Request Quotation:** Customers can view products and add to a quotation basket. Similarly to a checkout cart, customers can checkout their quotations that are stored in localStorage to send to a form.

## Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Set up environment variables:**
    Copy `.env.example` to `.env` and fill in the required values.
3.  **Run the development server:**
    `bash
pnpm dev
`
    This will start the Next.js development server and you can access the site at `http://localhost:3000` and the Payload admin panel at `http://localhost:3000/admin`.

## Testing Strategy

This project uses [Vitest](https://vitest.dev/) for testing. The testing strategy is divided into three main categories:

Please don't create tests that are to just match static text.

### 1. Unit Tests

Unit tests are used to test the smallest parts of the application in isolation, such as individual functions and hooks. This is particularly important for testing business logic.

- **What to test:**
  - State management logic (e.g., `useQuotationStore`).
  - Utility functions.

### 2. Component Tests

Component tests focus on testing individual React components. The goal is to ensure that they render correctly with different props and that they handle user interactions as expected.

- **What to test:**
  - Rendering with different props.
  - User interactions (e.g., button clicks).
  - Components like `ProductCard`, `Header`, etc.

### 3. Integration Tests

Integration tests are used to test how multiple components work together. This is useful for testing user flows.

- **What to test:**
  - The entire quotation flow, from adding a product to the quotation to seeing the updated count in the header.

## Block Development

When editing or removing fields from a block in the `src/blocks` directory, you must also update the corresponding block definition in the `src/collections` or `src/globals` directories. This ensures that the CMS and the frontend components are in sync.
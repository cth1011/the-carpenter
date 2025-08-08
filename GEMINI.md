# Project: The Carpenter

This document provides a central overview of The Carpenter project for developers.

## 1. Project Goal

The primary goal of this project is to migrate a client's existing website from WordPress to a modern, performant, and visually rich platform using a headless CMS approach.

## 2. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **CMS**: [React Bricks](https://reactbricks.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 3. Core Concepts

- **Content Management**: All visual content is managed through React Bricks. Content editors can create and edit pages using a visual interface.
- **Bricks**: The fundamental building blocks of the site are "Bricks," which are React components defined in the `/react-bricks/bricks` directory.
- **Styling**: The project uses Tailwind CSS for utility-first styling. Global styles and Tailwind configurations are located in the `/css` and root configuration files respectively.
- **Routing**: The site uses the Next.js App Router for all page routing, with dynamic segments for localized and slug-based pages.

# The Carpenter - Website Management Manual

Welcome to your website management dashboard! This guide will walk you through how to manage your website using the **Payload Content Management System (CMS)**.

---

## 1. Getting Started

To manage your website, log in to the Admin Panel.

*   **Admin Panel URL:** `https://thecarpenter.com.ph/admin`
*   **Credentials:** Provided separately by your administrator.

Once logged in, you will see a sidebar on the left with different categories like **Collections** (Products, Pages, Media) and **Globals** (Header, Footer, Landing Page).

---

## 2. Managing Images & Media

Images are the most important part of your website. Proper management ensures your site stays fast and remains accessible to everyone.

### Why is "Alt Text" needed?
When you upload an image, you will see a field for **Alt Text**. 
1.  **Accessibility:** It describes the image for people who are visually impaired and use screen readers.
2.  **SEO (Search Engines):** Google uses Alt Text to understand what is in your photos, helping your website appear in search results.

**Tip for writing Alt Text:** Be descriptive but concise. Instead of "Image1", use "Solid Oak Entrance Door with glass panels."

### How to Upload an Image
1.  Go to **Media** in the left sidebar.
2.  Click **Create New**.
3.  Choose a file from your computer. 
    *   *Note: To keep the site fast, try to use images under 500KB. Large files can make your site slow to load.*
4.  Enter the **Alt Text** in the field provided.
5.  Click **Publish**.

---

## 3. Managing Products

This is where you add or update the doors and other products you sell.

### How to Add a New Product
1.  Click on **Products** in the sidebar.
2.  Click the **Create New** button in the top right.
3.  **Name:** Enter the name of the product (e.g., "Classic Mahogany Main Door").
4.  **Category:** Select the category it belongs to.
5.  **Product Images:** 
    *   Click **Add Image**.
    *   You can **Upload New** or **Choose Existing** from your Media library.
    *   The first image will be the primary photo shown in the catalog.
6.  **Dimension Options:** 
    *   Add available sizes for **Thickness**, **Width**, and **Height**. 
    *   Click **Add** for each value (e.g., Width: "80cm", "90cm").
7.  Click **Publish** to make the product live.

---

## 4. Categories

Categories help customers find what they are looking for (e.g., "Entrance Doors", "Internal Doors").

### Creating a New Category
1.  Click **Categories** in the sidebar.
2.  Click **Create New**.
3.  **Title:** Give the category a name.
4.  **Sort Order:** Use numbers to choose the order (e.g., "1" for the most important category).
5.  Click **Publish**.

---

## 5. Changing Website Text (Pages & Globals)

### Editing Pages (About, Contact, etc.)
1.  Click on **Pages** and select the page you want to edit.
2.  The page is made of **Blocks**. Expand any block to change its text or images.
3.  You can reorder blocks by dragging the handle on their left side.

### Global Settings (Header & Footer)
*   **Header:** Change your logo name and manage the main menu links.
*   **Footer:** Update your company description, contact details, and social media links.
*   **Landing Page:** Change the main headline and the featured products on the homepage.

---

## 6. Architecture Overview

Your website relies on a few different interconnected services to run smoothly. Here's a simple breakdown of how things work behind the scenes:

*   **Domain Name (Namecheap):** This is your address (`thecarpenter.com.ph`). It acts like the front door, pointing visitors to where your website lives.
*   **Hosting (Vercel):** This is the engine that runs your website code and makes it visible on the internet. It takes the data from your database and images from storage, assembling them into the pages your customers see.
*   **Database (Neon):** This is where all your text content, product details, categories, and settings are securely stored. Think of it as a giant spreadsheet that holds everything except pictures.
*   **Image Storage (Cloudflare):** All the photos you upload are stored here. Cloudflare is optimized to deliver high-quality images quickly to users anywhere in the world.

---

## Tips for Success
*   **Save Draft:** Use this if you want to save your work without showing it to the public yet.
*   **Live Preview:** Click the "Live Preview" button in the top right to see how your changes will look on the live site before you publish!

---

*Manual generated for The Carpenter.*

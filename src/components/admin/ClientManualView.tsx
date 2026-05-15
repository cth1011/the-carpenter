import React from 'react'

export const ClientManualView: React.FC = () => {
  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '1000px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6',
      color: 'var(--theme-elevation-800)'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--theme-elevation-150)', paddingBottom: '0.5rem' }}>
        The Carpenter - Website Management Manual
      </h1>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        Welcome to your website management dashboard! This guide will walk you through how to manage your website using the <strong>Payload Content Management System (CMS)</strong>.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--theme-elevation-700)' }}>1. Getting Started</h2>
        <p>To manage your website, log in to the Admin Panel.</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Admin Panel URL:</strong> <code style={{ background: 'var(--theme-elevation-100)', padding: '2px 5px' }}>https://thecarpenter.com.ph/admin</code></li>
          <li><strong>Credentials:</strong> Provided separately by your administrator.</li>
        </ul>
        <p>Once logged in, you will see a sidebar on the left with different categories like <strong>Collections</strong> (Products, Pages, Media) and <strong>Globals</strong> (Header, Footer, Landing Page).</p>
      </section>

      <section style={{ marginBottom: '3rem', background: 'var(--theme-elevation-50)', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--theme-elevation-700)' }}>2. Managing Images & Media</h2>
        <p>Images are the most important part of your website. Proper management ensures your site stays fast and remains accessible to everyone.</p>
        
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Why is "Alt Text" needed?</h3>
          <p>When you upload an image, you will see a field for <strong>Alt Text</strong>.</p>
          <ol style={{ paddingLeft: '20px' }}>
            <li><strong>Accessibility:</strong> It describes the image for people who are visually impaired and use screen readers.</li>
            <li><strong>SEO (Search Engines):</strong> Google uses Alt Text to understand what is in your photos, helping your website appear in search results.</li>
          </ol>
          <p><em><strong>Tip:</strong> Be descriptive but concise. Instead of "Image1", use "Solid Oak Entrance Door with glass panels."</em></p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>How to Upload an Image</h3>
          <ol style={{ paddingLeft: '20px' }}>
            <li>Go to <strong>Media</strong> in the left sidebar.</li>
            <li>Click <strong>Create New</strong>.</li>
            <li>Choose a file from your computer. 
              <br/><em>Note: To keep the site fast, try to use images under 500KB. Large files can make your site slow to load.</em>
            </li>
            <li>Enter the <strong>Alt Text</strong> in the field provided.</li>
            <li>Click <strong>Publish</strong>.</li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--theme-elevation-700)' }}>3. Managing Products</h2>
        <p>This is where you add or update the doors and other products you sell.</p>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Click on <strong>Products</strong> in the sidebar.</li>
          <li>Click the <strong>Create New</strong> button in the top right.</li>
          <li><strong>Name:</strong> Enter the name of the product (e.g., "Classic Mahogany Main Door").</li>
          <li><strong>Category:</strong> Select the category it belongs to.</li>
          <li><strong>Product Images:</strong> Click <strong>Add Image</strong>. You can Upload New or Choose Existing. The first image will be the primary photo.</li>
          <li><strong>Dimension Options:</strong> Add available sizes for Thickness, Width, and Height (e.g., Width: "80cm").</li>
          <li>Click <strong>Publish</strong> to make the product live.</li>
        </ol>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--theme-elevation-700)' }}>4. Categories</h2>
        <p>Categories help customers find what they are looking for (e.g., "Entrance Doors").</p>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Click <strong>Categories</strong> in the sidebar.</li>
          <li>Click <strong>Create New</strong>.</li>
          <li><strong>Title:</strong> Give the category a name.</li>
          <li><strong>Sort Order:</strong> Use numbers (e.g., "1" for top priority).</li>
          <li>Click <strong>Publish</strong>.</li>
        </ol>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--theme-elevation-700)' }}>5. Changing Website Text</h2>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Editing Pages</h3>
        <p>Pages are made of <strong>Blocks</strong>. Expand any block to change its text or images. You can reorder blocks by dragging the handle on their left side.</p>
        
        <h3 style={{ fontSize: '1.3rem', marginTop: '15px', marginBottom: '0.5rem' }}>Global Settings</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Header:</strong> Change your logo name and menu links.</li>
          <li><strong>Footer:</strong> Update contact details and social media links.</li>
          <li><strong>Landing Page:</strong> Change the main homepage headline and featured products.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--theme-elevation-700)' }}>6. Architecture Overview</h2>
        <p>Your website relies on a few different interconnected services to run smoothly. Here's a simple breakdown of how things work behind the scenes:</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Domain Name (Namecheap):</strong> This is your address (<code style={{ background: 'var(--theme-elevation-100)', padding: '2px 5px' }}>thecarpenter.com.ph</code>). It acts like the front door, pointing visitors to where your website lives.</li>
          <li><strong>Hosting (Vercel):</strong> This is the engine that runs your website code and makes it visible on the internet. It takes the data from your database and images from storage, assembling them into the pages your customers see.</li>
          <li><strong>Database (Neon):</strong> This is where all your text content, product details, categories, and settings are securely stored. Think of it as a giant spreadsheet that holds everything except pictures.</li>
          <li><strong>Image Storage (Cloudflare):</strong> All the photos you upload are stored here. Cloudflare is optimized to deliver high-quality images quickly to users anywhere in the world.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem', background: 'var(--theme-elevation-50)', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--theme-elevation-700)' }}>7. Troubleshooting Guide</h2>
        <p>If something isn't working right, check these common solutions:</p>
        <div style={{ marginTop: '15px' }}>
          <strong>Changes aren't showing up on the live site:</strong>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Did you click "Save Draft" instead of "Publish"? Check the document status in the top right.</li>
            <li>Sometimes, it takes a minute or two for the hosting server (Vercel) to rebuild the page with your new content. Try refreshing your browser after 2-3 minutes.</li>
          </ul>
        </div>
        <div style={{ marginTop: '15px' }}>
          <strong>Images are loading slowly or failing to upload:</strong>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Make sure the image file size is under 500KB.</li>
            <li>Ensure the file type is a standard web format (like .jpg, .png, or .webp).</li>
          </ul>
        </div>
        <div style={{ marginTop: '15px' }}>
          <strong>Can't log into the Admin Panel:</strong>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Double-check that you are using the correct email and password. Ensure caps-lock is off.</li>
            <li>If you forgot your password, contact your technical administrator to have it reset.</li>
          </ul>
        </div>
        <div style={{ marginTop: '15px' }}>
          <strong>Website is completely down:</strong>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Check your domain status on Namecheap to ensure the registration hasn't expired.</li>
            <li>Contact support to verify if the hosting (Vercel) or database (Neon) is undergoing scheduled maintenance.</li>
          </ul>
        </div>
      </section>

      <footer style={{ marginTop: '4rem', padding: '20px', borderTop: '1px solid var(--theme-elevation-150)', textAlign: 'center', fontSize: '0.9rem', opacity: 0.7 }}>
        Manual generated for The Carpenter.
      </footer>
    </div>
  )
}

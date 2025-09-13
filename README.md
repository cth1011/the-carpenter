# The Carpenter - E-commerce Website

A modern e-commerce website for "The Carpenter," a company that sells handcrafted doors. This project features a unique business model where customers can browse products and request quotations, but prices are not displayed publicly.

## 🚀 Features

- **Product Catalog**: Browse doors by category with detailed product information
- **Quotation System**: Add products to a quotation basket and submit inquiries
- **Content Management**: Full CMS integration with PayloadCMS for easy content management
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **No Pricing Display**: Unique business model where prices are only provided through quotations
- **Product Categories**: Interior, Exterior, Sliding, French, Barn, and Custom doors
- **Contact Forms**: Easy communication channels for customer inquiries

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **CMS**: [PayloadCMS v3](https://payloadcms.com/) for content management
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design system
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/) for consistent design
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Database**: MongoDB with Mongoose adapter
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful icons

## 📁 Project Structure

```
the-carpenter-payload/
├── src/
│   ├── app/
│   │   ├── (app)/                    # Customer-facing pages
│   │   │   ├── api/                  # API routes
│   │   │   ├── products/             # Product pages
│   │   │   ├── quotation/            # Quotation system
│   │   │   ├── contact/              # Contact page
│   │   │   ├── about/                # About page
│   │   │   ├── categories/           # Category pages
│   │   │   ├── globals.css           # Global styles
│   │   │   ├── layout.tsx            # Main layout
│   │   │   └── page.tsx              # Homepage
│   │   └── (payload)/                # PayloadCMS admin
│   ├── collections/                  # CMS collections
│   │   ├── Products.ts               # Product collection
│   │   ├── Media.ts                  # Media collection
│   │   ├── Posts.ts                  # Blog posts
│   │   └── Users.ts                  # User management
│   ├── components/                   # React components
│   │   ├── ui/                       # ShadCN UI components
│   │   ├── Navigation.tsx            # Site navigation
│   │   └── ProductCard.tsx           # Product display
│   ├── contexts/                     # React contexts
│   │   └── QuotationContext.tsx      # Quotation state management
│   ├── hooks/                        # Custom hooks
│   │   └── useQuotation.ts           # Quotation logic
│   ├── lib/                          # Utility functions
│   └── payload.config.ts             # PayloadCMS configuration
├── public/                           # Static assets
└── package.json                      # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.19.0 or higher
- pnpm (recommended) or npm
- MongoDB database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd the-carpenter-payload
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URI=mongodb://localhost:27017/the-carpenter
   PAYLOAD_SECRET=your-secret-key-here
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Access the application**
   - **Customer Website**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin

### Initial Setup

1. **Create your first admin user**
   - Visit http://localhost:3000/admin
   - Follow the setup wizard to create your first user

2. **Add products to the catalog**
   - Log into the admin panel
   - Navigate to "Products" collection
   - Add your door products with images, descriptions, and specifications

3. **Upload media**
   - Use the "Media" collection to upload product images
   - Images will be automatically optimized and resized

## 🎨 Customization

### Styling

The project uses Tailwind CSS with a custom design system. Main colors and styles can be modified in:

- `src/app/(app)/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration

### Content Management

All content is managed through PayloadCMS:

- **Products**: Add, edit, and organize door products
- **Media**: Upload and manage images
- **Users**: Manage admin users and permissions

### Adding New Features

- **New Pages**: Add routes in `src/app/(app)/`
- **New Components**: Create reusable components in `src/components/`
- **New Collections**: Define CMS collections in `src/collections/`

## 📱 Key Features Explained

### Quotation System

- Customers can add products to a quotation basket
- Quotations are stored in localStorage for persistence
- Customers can submit inquiries with contact information
- No prices are displayed publicly - all pricing is handled through quotations

### Product Management

- Rich product information including specifications, features, and multiple images
- Category-based organization
- Status tracking (Available, Out of Stock, Custom Order)
- SEO-friendly URLs and metadata

### Responsive Design

- Mobile-first approach
- Optimized for all device sizes
- Fast loading with Next.js optimizations

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm devsafe          # Clean start (removes .next folder)

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Utilities
pnpm lint             # Run ESLint
pnpm generate:types   # Generate PayloadCMS types
```

### Code Structure

- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Reusable, composable components
- **State Management**: React Context for quotation state
- **API Routes**: Server-side API endpoints for data fetching

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📞 Support

For questions or support:

- Create an issue in the repository
- Contact the development team
- Check the PayloadCMS documentation for CMS-related questions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**The Carpenter** - Crafting exceptional doors since 2002

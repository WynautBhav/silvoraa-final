# Silvoraa - Premium Gemstone Jewelry E-commerce

<div align="center">
  <img width="1200" height="475" alt="Silvoraa Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A premium e-commerce platform for gemstone jewelry built with React, Vite, and Appwrite.

## Features

- 🛍️ Full e-commerce functionality (cart, checkout, user accounts)
- 💎 90+ gemstone jewelry products with detailed descriptions
- 🤖 AI Stylist - Personalized jewelry recommendations
- 🔍 Advanced search with filtering by stone, type, price
- 📱 Fully responsive design
- 🌐 SEO optimized with schema markup

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS, Framer Motion |
| Backend | Appwrite (Auth, Database, Storage) |
| AI | Google Gemini API |
| Payments | Razorpay |
| Testing | Vitest |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=silvoraa
VITE_APPWRITE_PRODUCTS_COLLECTION_ID=products
VITE_APPWRITE_ORDERS_COLLECTION_ID=orders
VITE_APPWRITE_USERS_COLLECTION_ID=users
VITE_APPWRITE_BUCKET_ID=images

# Razorpay (Payments)
VITE_RAZORPAY_KEY_ID=your_key_id

# Google Gemini (AI Features)
VITE_GEMINI_API_KEY=your_gemini_key
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm run test        # Run tests once
npm run test:watch  # Watch mode
```

## Project Structure

```
├── components/          # React components
│   ├── Admin/          # Admin dashboard components
│   ├── AI/             # AI Stylist feature
│   ├── Cart/           # Shopping cart
│   ├── Layout/         # Navbar, Footer, etc.
│   ├── Product/        # Product cards, details
│   └── UI/             # Reusable UI components
├── pages/              # Route pages
├── hooks/              # Custom React hooks
├── lib/                # Utilities & config
├── services/           # API services
├── types/              # TypeScript types
├── constants/          # Static data
└── public/             # Static assets
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run sitemap` | Generate XML sitemap |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## SEO Features

- XML sitemap (489 URLs)
- JSON-LD schema markup (Organization, Product, FAQ)
- Open Graph & Twitter meta tags
- Canonical URLs
- Security headers (CSP, X-Frame-Options)

## Security Features

- XSS protection with DOMPurify
- Security headers
- Environment-based secrets
- Input validation
- Error boundaries

## License

Private - All rights reserved
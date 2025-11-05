# DIVA Jewel Cart - E-Commerce Jewelry Platform

A professional, full-featured e-commerce platform for selling jewelry online, built with React, TypeScript, and Supabase.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-blue)

---

## 🚨 **IMPORTANT: Database Setup Required**

**Before using the admin panel or viewing products, you MUST run the database setup scripts!**

### Quick Fix for Common Issues:

1. **"Row-level security policy" error when adding products** ❌
2. **Product images not loading** 🖼️

### ✅ Solution:

**See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for complete instructions.**

**Quick Steps:**
1. Open your Supabase Dashboard → SQL Editor
2. Run the scripts from `DATABASE_SETUP.md`
3. Refresh your site - everything will work! ✨

---

## Features

### Customer Features
- Browse jewelry products by category (Rings, Necklaces, Earrings, Bracelets, Sets)
- Product search and filtering
- Shopping cart with real-time updates
- Wishlist functionality
- User authentication (Sign up / Login)
- Secure checkout process
- Order history and tracking
- Responsive design for mobile and desktop

### Admin Features
- Admin dashboard with analytics
- Complete product management (Add, Edit, Delete)
- Image upload to Supabase Storage
- Stock and inventory management
- Category management
- Featured products control
- Order management

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing
- **Styled Components** - CSS-in-JS styling
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Sonner** - Toast notifications

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Storage for images
  - Row Level Security (RLS)
- **TanStack Query** - Server state management

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- A **Supabase account** (free tier works)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/HarshalJain-cs/divaa-ecommerce.git
cd divaa-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in project details:
   - Name: `diva-jewel-cart`
   - Database Password: Create a strong password and save it
   - Region: Choose closest to your location
5. Wait 2-3 minutes for the project to be created

#### Get Your Credentials

1. In Supabase Dashboard, click Settings (⚙️) → API
2. Copy your credentials:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon/Public Key**: `eyJ...` (long string)

#### Create Environment File

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ Important:** Replace with your actual Supabase credentials!

### 4. Run Database Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open the file `database/schema.sql` from this project
4. Copy all contents and paste into SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for success message

#### Verify Tables Created

Go to **Table Editor** in Supabase. You should see:
- ✅ profiles
- ✅ categories
- ✅ products
- ✅ cart_items
- ✅ orders
- ✅ order_items

### 5. Set Up Storage

1. In Supabase Dashboard, go to **SQL Editor**
2. Open the file `database/storage-setup.sql` from this project
3. Copy contents and paste into a new query
4. Click "Run"

#### Verify Storage Buckets

Go to **Storage** in Supabase. You should see:
- ✅ product-images (Public)
- ✅ category-images (Public)
- ✅ banner-images (Public)

### 6. Start Development Server

```bash
npm run dev
```

The app will open at [http://localhost:5173](http://localhost:5173)

## Usage

### Customer Access

1. Visit `http://localhost:5173`
2. Browse products on the home page
3. Sign up for an account
4. Add products to cart
5. Proceed to checkout

### Admin Access

#### Create Admin User

1. First, sign up for an account through the app
2. Go to Supabase **SQL Editor**
3. Run this query (replace with your email):

```sql
SELECT make_user_admin('your-email@example.com');
```

4. Verify admin role:

```sql
SELECT id, email, role FROM profiles WHERE email = 'your-email@example.com';
```

#### Access Admin Panel

1. Login with your admin account
2. Navigate to `http://localhost:5173/admin`
3. Or click "Admin Dashboard" in the header menu

#### Admin Panel Features

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/admin` | Overview and analytics |
| Manage Products | `/admin/products` | View, edit, delete products |
| Add Product | `/admin/products/new` | Create new product |
| Edit Product | `/admin/products/edit/:id` | Update product details |

For detailed admin instructions, see [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md)

## Project Structure

```
divaa-ecommerce/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── cart/           # Shopping cart components
│   │   ├── product/        # Product display components
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and configurations
│   │   └── supabase.ts     # Supabase client setup
│   ├── pages/              # Route pages
│   │   ├── HomePage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── AdminProductsPage.tsx
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── database/
│   ├── schema.sql          # Database schema
│   └── storage-setup.sql   # Storage bucket setup
├── public/                 # Static assets
├── .env.local              # Environment variables (create this)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm run test
```

## Environment Variables

Create a `.env.local` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Never commit `.env.local` to version control!**

## Security Features

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Authenticated routes for sensitive operations
- ✅ Admin-only access control
- ✅ Secure password hashing (handled by Supabase)
- ✅ JWT-based authentication
- ✅ SQL injection prevention
- ✅ XSS protection

## Troubleshooting

### Common Issues

#### Error: "Missing environment variables"
**Solution:** Ensure `.env.local` exists with correct Supabase credentials and restart dev server.

#### Error: "relation 'profiles' does not exist"
**Solution:** Run the `database/schema.sql` migration in Supabase SQL Editor.

#### Error: "JWT expired" or "Invalid API key"
**Solution:**
1. Go to Supabase Settings → API
2. Copy the Anon key again
3. Update `.env.local`
4. Restart dev server

#### Storage Upload Fails
**Solution:**
1. Verify storage buckets exist in Supabase
2. Run `database/storage-setup.sql` again
3. Check that you're logged in as an authenticated user

For more troubleshooting, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Documentation

- [Admin Panel Guide](./ADMIN_PANEL_GUIDE.md) - Detailed admin instructions
- [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md) - Complete backend setup
- [Troubleshooting Guide](./TROUBLESHOOTING.md) - Common issues and fixes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation files
- Review the troubleshooting guide

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for jewelry lovers**

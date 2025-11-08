/**
 * @component App
 * @description Main application component with routing and providers
 */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';

// Eagerly loaded components
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import BackToTopButton from '@/components/ui/BackToTopButton';
import Loader from '@/components/ui/Loader';

// Lazy loaded pages for better code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'));
const CollectionPage = lazy(() => import('@/pages/CollectionPage'));
const GoldCollectionPage = lazy(() => import('@/pages/GoldCollectionPage'));
const SilverCollectionPage = lazy(() => import('@/pages/SilverCollectionPage'));
const DiamondCollectionPage = lazy(() => import('@/pages/DiamondCollectionPage'));
const OccasionsPage = lazy(() => import('@/pages/OccasionsPage'));
const FestivalsPage = lazy(() => import('@/pages/FestivalsPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const WeddingPage = lazy(() => import('@/pages/WeddingPage'));
const WishlistPage = lazy(() => import('@/pages/WishlistPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const AdminProductsPage = lazy(() => import('@/pages/AdminProductsPage'));
const AdminProductFormPage = lazy(() => import('@/pages/AdminProductFormPage'));

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <Loader />
              </div>
            }>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />

              {/* Collection Routes - Material-Specific */}
              <Route path="/collections/gold" element={<GoldCollectionPage />} />
              <Route path="/collections/silver" element={<SilverCollectionPage />} />
              <Route path="/collections/diamond" element={<DiamondCollectionPage />} />
              <Route path="/collections/:collectionId" element={<CollectionPage />} />

              {/* Occasion & Festival Routes */}
              <Route path="/occasions" element={<OccasionsPage />} />
              <Route path="/festivals" element={<FestivalsPage />} />
              <Route path="/wedding" element={<WeddingPage />} />

              {/* Category Routes - Material & Type Specific */}
              <Route path="/categories/:categorySlug" element={<CategoryPage />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - Temporarily Unprotected */}
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/products"
              element={<AdminProductsPage />}
            />
            <Route
              path="/admin/products/new"
              element={<AdminProductFormPage />}
            />
            <Route
              path="/admin/products/edit/:id"
              element={<AdminProductFormPage />}
            />

            {/* Catch all - 404 */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-8">Page not found</p>
                    <a
                      href="/"
                      className="bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
              </Suspense>

          {/* Back to Top Button */}
          <BackToTopButton />

          {/* Toast Notifications */}
          <Toaster position="top-right" richColors />
            </div>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
  );
}

export default App;

/**
 * @component App
 * @description Main application component with routing and providers
 */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

// Eagerly loaded components
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import BackToTopButton from '@/components/ui/BackToTopButton';
import Loader from '@/components/ui/Loader';
import { PromoBanner } from '@/components/ui/PromoBanner';

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
const PolkiBridePage = lazy(() => import('@/pages/wedding/PolkiBridePage'));
const GoldBridePage = lazy(() => import('@/pages/wedding/GoldBridePage'));
const SangeetCollectionPage = lazy(() => import('@/pages/wedding/SangeetCollectionPage'));
const ReceptionCollectionPage = lazy(() => import('@/pages/wedding/ReceptionCollectionPage'));
const HaldiCollectionPage = lazy(() => import('@/pages/wedding/HaldiCollectionPage'));
const MehandiCollectionPage = lazy(() => import('@/pages/wedding/MehandiCollectionPage'));
// Collections Pages
const TimelessPearlsPage = lazy(() => import('@/pages/collections/TimelessPearlsPage'));
const FreshDropsPage = lazy(() => import('@/pages/collections/FreshDropsPage'));
const StackableCollectionPage = lazy(() => import('@/pages/collections/StackableCollectionPage'));
// Style Collections Pages
const EverydayStylePage = lazy(() => import('@/pages/collections/EverydayStylePage'));
const TraditionalStylePage = lazy(() => import('@/pages/collections/TraditionalStylePage'));
const PartyStylePage = lazy(() => import('@/pages/collections/PartyStylePage'));
const CasualStylePage = lazy(() => import('@/pages/collections/CasualStylePage'));
const OfficeStylePage = lazy(() => import('@/pages/collections/OfficeStylePage'));
const TwinningStylePage = lazy(() => import('@/pages/collections/TwinningStylePage'));
// Gifting Pages
const GiftsForWifePage = lazy(() => import('@/pages/gifting/GiftsForWifePage'));
const GiftsForHusbandPage = lazy(() => import('@/pages/gifting/GiftsForHusbandPage'));
const GiftsForMotherPage = lazy(() => import('@/pages/gifting/GiftsForMotherPage'));
const GiftsForBrotherPage = lazy(() => import('@/pages/gifting/GiftsForBrotherPage'));
const GiftsForSisterPage = lazy(() => import('@/pages/gifting/GiftsForSisterPage'));
const GiftsForFriendsPage = lazy(() => import('@/pages/gifting/GiftsForFriendsPage'));
// Men's Jewelry Pages
const MensRingsPage = lazy(() => import('@/pages/mens/MensRingsPage'));
const MensPendantsPage = lazy(() => import('@/pages/mens/MensPendantsPage'));
const MensEarringsPage = lazy(() => import('@/pages/mens/MensEarringsPage'));
const MensBraceletsPage = lazy(() => import('@/pages/mens/MensBraceletsPage'));
const MensChainsPage = lazy(() => import('@/pages/mens/MensChainsPage'));
const MensSetsPage = lazy(() => import('@/pages/mens/MensSetsPage'));
// Occasions Pages
const AnniversaryGiftsPage = lazy(() => import('@/pages/occasions/AnniversaryGiftsPage'));
const MostGiftedPage = lazy(() => import('@/pages/occasions/MostGiftedPage'));
const BirthdayGiftsPage = lazy(() => import('@/pages/occasions/BirthdayGiftsPage'));
const EngagementPage = lazy(() => import('@/pages/occasions/EngagementPage'));
const BabyShowerPage = lazy(() => import('@/pages/occasions/BabyShowerPage'));
const GrihaPraveshPage = lazy(() => import('@/pages/occasions/GrihaPraveshPage'));
// Moved to src/digital-gold - const DigitalGoldPage = lazy(() => import('@/digital-gold/DigitalGoldPage'));
const WishlistPage = lazy(() => import('@/pages/WishlistPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const ShippingPage = lazy(() => import('@/pages/ShippingPage'));
const ReturnsPage = lazy(() => import('@/pages/ReturnsPage'));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
// Gift Cards Pages
const GiftCardsPage = lazy(() => import('@/pages/GiftCardsPage'));
const GiftCardBulkPage = lazy(() => import('@/pages/GiftCardBulkPage'));
const GiftCardBalancePage = lazy(() => import('@/pages/GiftCardBalancePage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
// Moved to src/admin - const AdminDashboard = lazy(() => import('@/admin/AdminDashboard'));
// Moved to src/admin - const AdminProductsPage = lazy(() => import('@/admin/AdminProductsPage'));
// Moved to src/admin - const AdminProductFormPage = lazy(() => import('@/admin/AdminProductFormPage'));
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage'));

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              {/* Promotional Banner */}
              <PromoBanner />

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

              {/* Silver Collections Routes */}
              <Route path="/collections/timeless-pearls" element={<TimelessPearlsPage />} />
              <Route path="/collections/fresh-drops" element={<FreshDropsPage />} />
              <Route path="/collections/stackable" element={<StackableCollectionPage />} />

              {/* Style Collections Routes */}
              <Route path="/collections/style-everyday" element={<EverydayStylePage />} />
              <Route path="/collections/style-traditional" element={<TraditionalStylePage />} />
              <Route path="/collections/style-party" element={<PartyStylePage />} />
              <Route path="/collections/casual" element={<CasualStylePage />} />
              <Route path="/collections/style-office" element={<OfficeStylePage />} />
              <Route path="/collections/gifts-for-friends" element={<TwinningStylePage />} />

              {/* Gifting Routes */}
              <Route path="/gifting/wife" element={<GiftsForWifePage />} />
              <Route path="/gifting/husband" element={<GiftsForHusbandPage />} />
              <Route path="/gifting/mother" element={<GiftsForMotherPage />} />
              <Route path="/gifting/brother" element={<GiftsForBrotherPage />} />
              <Route path="/gifting/sister" element={<GiftsForSisterPage />} />
              <Route path="/gifting/friends" element={<GiftsForFriendsPage />} />

              {/* Men's Jewelry Routes */}
              <Route path="/mens/rings" element={<MensRingsPage />} />
              <Route path="/mens/pendants" element={<MensPendantsPage />} />
              <Route path="/mens/earrings" element={<MensEarringsPage />} />
              <Route path="/mens/bracelets" element={<MensBraceletsPage />} />
              <Route path="/mens/chains" element={<MensChainsPage />} />
              <Route path="/mens/sets" element={<MensSetsPage />} />

              {/* Occasions Routes */}
              <Route path="/occasions/engagement" element={<EngagementPage />} />
              <Route path="/occasions/birthday" element={<BirthdayGiftsPage />} />
              <Route path="/occasions/baby-shower" element={<BabyShowerPage />} />
              <Route path="/occasions/griha-pravesh" element={<GrihaPraveshPage />} />
              <Route path="/occasions/anniversary" element={<AnniversaryGiftsPage />} />
              <Route path="/occasions/most-gifted" element={<MostGiftedPage />} />

              <Route path="/collections/:collectionId" element={<CollectionPage />} />

              {/* Occasion & Festival Routes */}
              <Route path="/occasions" element={<OccasionsPage />} />
              <Route path="/festivals" element={<FestivalsPage />} />
              <Route path="/wedding" element={<WeddingPage />} />

              {/* Wedding Collection Routes */}
              <Route path="/wedding/polki-bride" element={<PolkiBridePage />} />
              <Route path="/wedding/gold-bride" element={<GoldBridePage />} />
              <Route path="/wedding/sangeet-collection" element={<SangeetCollectionPage />} />
              <Route path="/wedding/sangeet-look" element={<SangeetCollectionPage />} />
              <Route path="/wedding/reception-collection" element={<ReceptionCollectionPage />} />
              <Route path="/wedding/reception-look" element={<ReceptionCollectionPage />} />
              <Route path="/wedding/haldi-collection" element={<HaldiCollectionPage />} />
              <Route path="/wedding/mehandi-collection" element={<MehandiCollectionPage />} />

              {/* Digital Gold Route - REMOVED (files moved to src/digital-gold) */}
              {/* <Route path="/digital-gold" element={<DigitalGoldPage />} /> */}

              {/* Category Routes - Material & Type Specific */}
              <Route path="/categories/:categorySlug" element={<CategoryPage />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Gift Cards Routes */}
              <Route path="/gift-cards" element={<GiftCardsPage />} />
              <Route path="/gift-cards/bulk" element={<GiftCardBulkPage />} />
              <Route path="/gift-cards/balance" element={<GiftCardBalancePage />} />
              <Route path="/admin" element={<AdminPage />} />

              <Route path="/coming-soon" element={<ComingSoonPage />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - COMMENTED OUT (files moved to src/admin) */}
            {/*
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
            */}

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
    </CurrencyProvider>
  );
}

export default App;

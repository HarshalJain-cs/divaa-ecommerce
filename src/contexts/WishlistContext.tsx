/**
 * @component WishlistContext
 * @description Wishlist/favorites context provider with Supabase sync and localStorage fallback
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/database.types';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'diva-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load wishlist on mount and when user changes
  useEffect(() => {
    loadWishlist();
  }, [user]);

  // Load wishlist from Supabase (if logged in) or localStorage (if guest)
  const loadWishlist = async () => {
    try {
      setIsLoading(true);

      if (user) {
        // Load from Supabase for logged-in users
        const { data, error } = await supabase
          .from('wishlist')
          .select(`
            product_id,
            products (*)
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        const products = data
          ?.map((item: any) => item.products)
          .filter(Boolean) as Product[];

        setWishlistItems(products || []);
      } else {
        // Load from localStorage for guests
        const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (saved) {
          const productIds = JSON.parse(saved) as string[];
          // Fetch full product details
          if (productIds.length > 0) {
            const { data, error } = await supabase
              .from('products')
              .select('*')
              .in('id', productIds);

            if (!error && data) {
              setWishlistItems(data as Product[]);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add to wishlist
  const addToWishlist = async (product: Product) => {
    try {
      if (user) {
        // Add to Supabase for logged-in users
        const { error } = await supabase
          .from('wishlist')
          .insert({ user_id: user.id, product_id: product.id });

        if (error) {
          if (error.code === '23505') {
            // Already in wishlist
            toast.info('Already in your wishlist');
            return;
          }
          throw error;
        }
      } else {
        // Save to localStorage for guests
        const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
        const productIds = saved ? JSON.parse(saved) : [];

        if (productIds.includes(product.id)) {
          toast.info('Already in your wishlist');
          return;
        }

        productIds.push(product.id);
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds));
      }

      setWishlistItems((prev) => [...prev, product]);
      toast.success(`${product.name} added to wishlist`);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId: string) => {
    try {
      const product = wishlistItems.find((p) => p.id === productId);

      if (user) {
        // Remove from Supabase
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;
      } else {
        // Remove from localStorage
        const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (saved) {
          const productIds = JSON.parse(saved) as string[];
          const filtered = productIds.filter((id) => id !== productId);
          localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(filtered));
        }
      }

      setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
      if (product) {
        toast.success(`${product.name} removed from wishlist`);
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  // Toggle wishlist (add if not in, remove if in)
  const toggleWishlist = async (product: Product) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some((p) => p.id === productId);
  };

  const wishlistCount = wishlistItems.length;

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount,
    isLoading,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

// Custom hook to use wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

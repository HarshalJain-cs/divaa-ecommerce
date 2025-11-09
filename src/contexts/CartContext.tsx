/**
 * @component CartContext
 * @description Shopping cart context provider with localStorage persistence
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/database.types';
import { toast } from 'sonner';

// Cart item type for local state (not database)
export interface LocalCartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: LocalCartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  cartTotal: number;
  cartCount: number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'diva-jewel-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LocalCartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [items, isInitialized]);

  // Add item to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    // Check stock availability
    if (product.stock_quantity < quantity) {
      toast.error('Insufficient stock available');
      return;
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        // Check if new quantity exceeds stock
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock_quantity) {
          toast.error(`Only ${product.stock_quantity} items available in stock`);
          return prevItems;
        }

        // Update quantity
        toast.success(`Updated ${product.name} quantity in cart`);
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Add new item
        toast.success(`${product.name} added to cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.product.id === productId);
      if (item) {
        toast.success(`${item.product.name} removed from cart`);
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product.id === productId) {
          // Check stock availability
          if (quantity > item.product.stock_quantity) {
            toast.error(`Only ${item.product.stock_quantity} items available`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  // Get quantity of a specific product
  const getItemQuantity = (productId: string): number => {
    const item = items.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Check if product is in cart
  const isInCart = (productId: string): boolean => {
    return items.some((item) => item.product.id === productId);
  };

  // Calculate cart total
  const cartTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate total item count
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    cartTotal,
    cartCount,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

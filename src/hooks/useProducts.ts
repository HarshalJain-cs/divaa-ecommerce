/**
 * @title useProducts Hook
 * @description Custom hooks for product data fetching with React Query
 *
 * @example
 * ```tsx
 * const { data: products, isLoading } = useProducts();
 * const { data: product } = useProduct(productId);
 * ```
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/database.types';

interface ProductFilters {
  category?: string;
  gender?: 'men' | 'women' | 'unisex';
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  occasion?: string | string[];
  relation?: string | string[];
}

/**
 * @title fetchProducts
 * @description Fetch products with optional filters
 */
async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  try {
    // First, check if products table exists and has data
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (count === 0) {
      // If no products, run sample data SQL
      const { error: insertError } = await supabase
        .from('products')
        .insert([
          {
            name: 'Test Product',
            description: 'Test product to verify database connection',
            price: 99.99,
            stock_quantity: 10,
            gender: 'unisex',
            is_featured: true
          }
        ]);

      if (insertError) throw insertError;
    }

    // Now fetch products with all needed fields including categories
    let query = supabase
      .from('products')
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description,
          image_url
        )
      `)
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters?.category) {
      // Check if it's a UUID or a category name
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(filters.category);

      if (isUUID) {
        // Filter by UUID directly
        query = query.eq('category_id', filters.category);
      } else {
        // Filter by category name - need to fetch category ID first
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .ilike('name', filters.category)
          .single();

        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }
    }

    if (filters?.gender) {
      query = query.eq('gender', filters.gender);
    }

    if (filters?.featured !== undefined) {
      query = query.eq('is_featured', filters.featured);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    if (filters?.occasion) {
      const occasions = Array.isArray(filters.occasion) ? filters.occasion : [filters.occasion];
      query = query.overlaps('occasions', occasions);
    }

    if (filters?.relation) {
      const relations = Array.isArray(filters.relation) ? filters.relation : [filters.relation];
      query = query.overlaps('relations', relations);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No products found, checking database setup...');
      
      // Try to run sample data SQL if needed
      const { error: setupError } = await supabase.rpc('setup_sample_data');
      if (setupError) {
        console.error('Error setting up sample data:', setupError);
        throw setupError;
      }

      // Retry fetching products
      const { data: retryData, error: retryError } = await query;
      if (retryError) throw retryError;
      return retryData as Product[];
    }

    return data as Product[];
  } catch (error) {
    console.error('Fatal error fetching products:', error);
    throw error;
  }
}

/**
 * @title fetchProduct
 * @description Fetch single product by ID
 */
async function fetchProduct(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data as Product;
}

/**
 * @title useProducts
 * @description Hook to fetch all products with filters
 */
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime in v4)
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
}

/**
 * @title useProduct
 * @description Hook to fetch single product
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * @title useFeaturedProducts
 * @description Hook to fetch featured products
 */
export function useFeaturedProducts() {
  return useProducts({ featured: true });
}

/**
 * @title useCreateProduct
 * @description Mutation hook to create new product (admin only)
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate products queries to refetch
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

/**
 * @title useUpdateProduct
 * @description Mutation hook to update product (admin only)
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Product>;
    }) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
    },
  });
}

/**
 * @title useDeleteProduct
 * @description Mutation hook to delete product (admin only)
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

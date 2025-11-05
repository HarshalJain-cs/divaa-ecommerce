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
  occasion?: string;
  relation?: string;
}

/**
 * @title fetchProducts
 * @description Fetch products with optional filters
 */
async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

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
    query = query.contains('occasions', [filters.occasion]);
  }

  if (filters?.relation) {
    query = query.contains('relations', [filters.relation]);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data as Product[];
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

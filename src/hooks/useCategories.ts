/**
 * @title useCategories Hook
 * @description Custom hooks for category data fetching with React Query
 *
 * @example
 * ```tsx
 * const { data: categories, isLoading } = useCategories();
 * const { data: category } = useCategory(categoryId);
 * ```
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  display_order?: number;
  metal_type?: string;
  gender?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * @title fetchCategories
 * @description Fetch all categories from database
 */
async function fetchCategories(): Promise<Category[]> {
  console.log('🔍 Fetching categories from Supabase...');

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  console.log('📊 Categories query result:', {
    success: !error,
    count: data?.length || 0,
    error: error?.message
  });

  if (error) {
    console.error('❌ Error fetching categories:', error);
    throw error;
  }

  console.log('✅ Categories fetched successfully:', data?.length || 0, 'items');

  // Log image URLs for debugging
  if (data && data.length > 0) {
    console.log('📸 Category image URLs:');
    data.forEach((cat: Category) => {
      console.log(`  - ${cat.name}: ${cat.image_url || 'NO IMAGE URL'}`);
    });
  }

  return data as Category[];
}

/**
 * @title fetchCategory
 * @description Fetch single category by ID
 */
async function fetchCategory(id: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data as Category;
}

/**
 * @title useCategories
 * @description Hook to fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes (categories don't change often)
  });
}

/**
 * @title useCategory
 * @description Hook to fetch single category
 */
export function useCategory(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategory(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

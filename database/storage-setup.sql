-- =============================================
  -- SUPABASE STORAGE SETUP
  -- Description: Configure storage buckets for images
  -- =============================================

  -- =============================================
  -- Create Storage Buckets
  -- =============================================

  -- Product Images Bucket
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('product-images', 'product-images', true)
  ON CONFLICT (id) DO UPDATE SET public = true;

  -- Category Images Bucket
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('category-images', 'category-images', true)
  ON CONFLICT (id) DO UPDATE SET public = true;

  -- Banner Images Bucket
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('banner-images', 'banner-images', true)
  ON CONFLICT (id) DO UPDATE SET public = true;

  -- =============================================
  -- STORAGE POLICIES FOR PRODUCT IMAGES
  -- =============================================

  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Public Access to Product Images" ON storage.objects;    
  DROP POLICY IF EXISTS "Authenticated users can upload product images" ON       
  storage.objects;
  DROP POLICY IF EXISTS "Users can update product images" ON storage.objects;    
  DROP POLICY IF EXISTS "Only admins can delete product images" ON
  storage.objects;

  -- Policy 1: Allow public read access to product images
  CREATE POLICY "Public Access to Product Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

  -- Policy 2: Allow authenticated users to upload
  CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

  -- Policy 3: Allow authenticated users to update their uploads
  CREATE POLICY "Users can update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images');

  -- Policy 4: Only admins can delete images
  CREATE POLICY "Only admins can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

  -- =============================================
  -- STORAGE POLICIES FOR CATEGORY IMAGES
  -- =============================================

  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Public Access to Category Images" ON
  storage.objects;
  DROP POLICY IF EXISTS "Admins can manage category images" ON
  storage.objects;

  CREATE POLICY "Public Access to Category Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'category-images');

  CREATE POLICY "Admins can manage category images"
  ON storage.objects FOR ALL
  TO authenticated
  USING (
    bucket_id = 'category-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

  -- =============================================
  -- STORAGE POLICIES FOR BANNER IMAGES
  -- =============================================

  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Public Access to Banner Images" ON storage.objects;     
  DROP POLICY IF EXISTS "Admins can manage banner images" ON storage.objects;    

  CREATE POLICY "Public Access to Banner Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'banner-images');

  CREATE POLICY "Admins can manage banner images"
  ON storage.objects FOR ALL
  TO authenticated
  USING (
    bucket_id = 'banner-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );
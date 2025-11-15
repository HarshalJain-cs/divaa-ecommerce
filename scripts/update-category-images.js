/**
 * Script to update category images in Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Category image updates
const categoryUpdates = [
  {
    id: '0aeb9a4d-4705-4860-9d4e-641b66f5ab7e',
    name: 'Necklaces',
    image_url: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/50D2P2NYYAA32_1.jpg'
  },
  // Note: Pendants image URL is not accessible (400 error) - skipping for now
  // {
  //   id: 'ec21bc0f-5f81-4854-9f41-5796b7367515',
  //   name: 'Pendants',
  //   image_url: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/pendants/The%20Perfect%20Pendant%20for%20Every%20Occasion.jpg'
  // },
  {
    id: 'ec21bc0f-5f81-4854-9f41-5796b7367515',
    name: 'Pendants',
    image_url: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/eric-fung-Z0GZrpwcc5Y-unsplash.jpg'
  },
  {
    id: '0fdbb62f-a4bd-4d4c-bd8d-d01e7c0df35c',
    name: 'Rings',
    image_url: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/rings%20/diamond%20ring,%20dazzling%20and%20charming_.jpeg'
  },
  {
    id: '09c47b4c-f87e-4016-bb95-f611291a2990',
    name: 'Sets',
    image_url: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/sets/download%20(1).jpeg'
  }
];

/**
 * Verify if an image URL is accessible
 */
async function verifyImageUrl(url, name) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      console.log(`✅ ${name}: Image URL is accessible`);
      return true;
    } else {
      console.error(`❌ ${name}: Image URL returned status ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ ${name}: Failed to verify image URL - ${error.message}`);
    return false;
  }
}

/**
 * Update category image in database
 */
async function updateCategoryImage(category) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update({ image_url: category.image_url })
      .eq('id', category.id)
      .select();

    if (error) {
      console.error(`❌ ${category.name}: Failed to update - ${error.message}`);
      return false;
    }

    console.log(`✅ ${category.name}: Successfully updated image`);
    return true;
  } catch (error) {
    console.error(`❌ ${category.name}: Update failed - ${error.message}`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting category image update process...\n');

  // Step 1: Verify all image URLs
  console.log('📸 Verifying image URLs...');
  const verificationResults = await Promise.all(
    categoryUpdates.map(cat => verifyImageUrl(cat.image_url, cat.name))
  );

  const allVerified = verificationResults.every(result => result);
  if (!allVerified) {
    console.error('\n❌ Some image URLs are not accessible. Aborting update.');
    process.exit(1);
  }

  console.log('\n✅ All image URLs verified successfully!\n');

  // Step 2: Update categories in database
  console.log('💾 Updating categories in database...');
  const updateResults = await Promise.all(
    categoryUpdates.map(cat => updateCategoryImage(cat))
  );

  const allUpdated = updateResults.every(result => result);

  if (allUpdated) {
    console.log('\n🎉 All category images updated successfully!');
    console.log('\n📝 Updated categories:');
    categoryUpdates.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.id})`);
    });
  } else {
    console.error('\n❌ Some updates failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});

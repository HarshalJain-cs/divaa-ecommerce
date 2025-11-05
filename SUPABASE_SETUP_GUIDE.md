# 🗄️ SUPABASE SETUP GUIDE

Complete step-by-step guide to set up Supabase for DIVA Jewel Cart.

## 📋 Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Your project code ready

---

## STEP 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Sign in or create an account

2. **Click "New Project"**

3. **Fill in Project Details:**
   ```
   Name: diva-jewel-cart
   Database Password: [Create a STRONG password and SAVE IT]
   Region: [Choose closest to your users]
   Pricing Plan: Free (sufficient for development)
   ```

4. **Click "Create New Project"**
   - Wait 2-3 minutes for project to be created

---

## STEP 2: Get Your Credentials

1. **Navigate to Project Settings**
   - Click the ⚙️ gear icon at bottom left
   - Click "API" in the sidebar

2. **Copy Your Credentials:**
   ```
   Project URL: https://xxxxx.supabase.co
   Anon/Public Key: eyJ... (long string)
   ```

3. **Update `.env.local` File:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   ⚠️ **IMPORTANT:** Replace the placeholder values with your actual credentials!

---

## STEP 3: Run Database Migration

1. **Go to SQL Editor**
   - In Supabase Dashboard, click "SQL Editor" in sidebar
   - Click "New Query"

2. **Copy and Paste Schema**
   - Open: `database/schema.sql`
   - Copy ALL contents
   - Paste into SQL Editor

3. **Run the Migration**
   - Click "Run" button (or press Ctrl+Enter)
   - Wait for success message: ✅ "Success. No rows returned"

4. **Verify Tables Created**
   - Click "Table Editor" in sidebar
   - You should see these tables:
     - ✅ profiles
     - ✅ categories
     - ✅ products
     - ✅ cart_items
     - ✅ orders
     - ✅ order_items

---

## STEP 4: Set Up Storage Buckets

1. **Go to Storage**
   - Click "Storage" in sidebar

2. **Run Storage Setup SQL**
   - Go back to SQL Editor
   - Create new query
   - Copy contents of `database/storage-setup.sql`
   - Paste and run

3. **Verify Buckets Created**
   - Go to Storage section
   - You should see:
     - ✅ product-images (Public)
     - ✅ category-images (Public)
     - ✅ banner-images (Public)

---

## STEP 5: Create Your Admin User

1. **Sign Up in Your App**
   - Once we build the signup page, create your account
   - Use your real email

2. **Make Yourself Admin**
   - Go to Supabase SQL Editor
   - Run this query (replace with YOUR email):

   ```sql
   SELECT make_user_admin('your-email@example.com');
   ```

3. **Verify Admin Role**
   ```sql
   SELECT id, email, role FROM profiles WHERE email = 'your-email@example.com';
   ```

   You should see: `role: admin`

---

## STEP 6: Test the Connection

1. **Restart Your Dev Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Check Browser Console**
   - Open http://localhost:5173
   - Open DevTools (F12)
   - Look for any Supabase errors

3. **Test Query (Optional)**
   - We'll add a test component that fetches categories

---

## 🔒 SECURITY CHECKLIST

✅ **Row Level Security (RLS) Enabled**
- All tables have RLS enabled
- Customers can only access their own data
- Admins have full access
- Public can view products and categories

✅ **Storage Policies Configured**
- Public read access for images
- Authenticated users can upload
- Only admins can delete

✅ **Environment Variables**
- `.env.local` added to `.gitignore`
- Never commit `.env.local` to git

---

## 📊 Sample Data

The schema includes sample data:
- 5 categories (Rings, Necklaces, Earrings, Bracelets, Sets)
- 3 sample products

To add more products, use the admin panel (coming in Step 4).

---

## 🐛 Troubleshooting

### Error: "Missing environment variables"
**Solution:** Make sure `.env.local` has both:
```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
Restart dev server after changes.

### Error: "relation 'profiles' does not exist"
**Solution:** Run the schema.sql migration again.

### Error: "JWT expired" or "Invalid API key"
**Solution:**
1. Go to Supabase Settings → API
2. Copy the Anon key again
3. Update `.env.local`
4. Restart dev server

### Error: "Could not connect to Supabase"
**Solution:** Check your internet connection and Supabase project status.

### Storage Upload Fails
**Solution:**
1. Verify buckets are created
2. Run storage-setup.sql again
3. Check RLS policies in Storage settings

---

## ✅ Verification Checklist

Before proceeding, make sure:

- [ ] Supabase project created
- [ ] Credentials copied to `.env.local`
- [ ] Database schema migrated successfully
- [ ] All 6 tables visible in Table Editor
- [ ] Storage buckets created (3 buckets)
- [ ] Storage policies configured
- [ ] Dev server restarts without errors
- [ ] No Supabase errors in browser console

---

## 🎉 SUCCESS!

If all checks pass, your Supabase backend is ready!

**Next Steps:**
- Build authentication system
- Create product management components
- Add image upload functionality

---

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security
- **Storage Guide:** https://supabase.com/docs/guides/storage

---

**Need Help?** Check the troubleshooting section or ask for assistance!

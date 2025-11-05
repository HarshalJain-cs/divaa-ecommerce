# Video Background Setup Guide

## Issue: Video Not Playing in Header

The video might not be loading due to CORS policies or network issues. Here are **3 solutions**:

---

## ✅ Solution 1: Host Video Locally (Recommended - Fastest)

### Step 1: Download the Video
1. Go to: https://www.pexels.com/video/a-woman-s-hands-are-on-a-plate-with-food-4974756/
2. Click **"Free Download"**
3. Choose **"SD 640x360"** or **"HD 1280x720"** (smaller file = faster loading)
4. Save the file as `header-video.mp4`

### Step 2: Add to Your Project
1. Create a folder: `public/videos/` in your project root
2. Move `header-video.mp4` into `public/videos/`
3. Your structure should look like:
   ```
   divaa.final.vs/
   ├── public/
   │   └── videos/
   │       └── header-video.mp4
   ├── src/
   └── ...
   ```

### Step 3: Update the Header Component
Replace the video source in `src/components/ui/Header.tsx`:

```tsx
<source
  src="/videos/header-video.mp4"
  type="video/mp4"
/>
```

---

## ✅ Solution 2: Upload to Supabase Storage

### Step 1: Create Storage Bucket
1. Go to your Supabase Dashboard: https://app.supabase.com
2. Click **"Storage"** in the left sidebar
3. Click **"New Bucket"**
4. Name it: `videos`
5. Make it **Public**
6. Click **"Create Bucket"**

### Step 2: Upload Video
1. Click on the `videos` bucket
2. Click **"Upload File"**
3. Upload your `header-video.mp4`
4. After upload, click on the file
5. Copy the **Public URL**

### Step 3: Update Header Component
Replace the video source with your Supabase URL:

```tsx
<source
  src="https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/videos/header-video.mp4"
  type="video/mp4"
/>
```

Replace `YOUR_PROJECT_ID` with your actual Supabase project ID.

---

## ✅ Solution 3: Use a Different Video Host

Try these alternative CDN video sources:

### Option A: Sample Video (for testing)
```tsx
<source
  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  type="video/mp4"
/>
```

### Option B: Try Pexels Direct Download Link
1. Download from Pexels
2. Upload to a CDN like Cloudinary or Imgur
3. Use that URL

---

## 🔧 Troubleshooting

### Video Still Not Playing?

1. **Check Browser Console**
   - Press F12
   - Look for errors in Console tab
   - Check if video URL is accessible

2. **Test Video URL**
   - Copy the video URL
   - Paste it directly in browser address bar
   - If it doesn't download/play, the URL is wrong

3. **Try a Fallback**
   The header is now coded with a fallback - if video fails, it will show a pink gradient background instead.

---

## 📝 Current Code in Header.tsx

The header now includes:
- ✅ `preload="auto"` - starts loading video immediately
- ✅ `onError` handler - shows gradient if video fails
- ✅ `playsInline` - works on mobile devices
- ✅ Fallback gradient background

---

## 🎯 Recommended Approach

**For best performance, use Solution 1 (Local Hosting)**

Pros:
- ✅ Fastest loading
- ✅ No external dependencies
- ✅ Works offline
- ✅ No CORS issues

Cons:
- ❌ Increases your build size (but only by ~5-10MB)

---

## Need Help?

If none of these work, please:
1. Share the exact error message from browser console (F12)
2. Share which solution you tried
3. I'll help debug further!

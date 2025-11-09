# Supabase Migrations

This directory contains SQL migration files for the Diva E-commerce project.

## Running Migrations

### Option 1: Using Supabase CLI (Recommended)

If you have the Supabase CLI installed:

```bash
# Make sure you're logged in
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

### Option 2: Manual Execution via Supabase Dashboard

1. Go to your Supabase Dashboard (https://app.supabase.com)
2. Navigate to your project
3. Go to the SQL Editor
4. Copy and paste the contents of the migration file (e.g., `001_create_callback_requests.sql`)
5. Click "Run"

### Option 3: Using Supabase JS Client

You can also run migrations programmatically, but this is not recommended for production.

## Migration Files

- `001_create_callback_requests.sql` - Creates the callback_requests table for storing customer callback requests from the Digital Gold page

## Table: callback_requests

Stores phone numbers and timestamps for callback requests.

**Columns:**
- `id` (UUID) - Primary key
- `phone_number` (VARCHAR) - Customer phone number (10-15 digits)
- `created_at` (TIMESTAMP) - When the request was created
- `called_at` (TIMESTAMP) - When the customer was called (nullable)
- `status` (VARCHAR) - Request status: 'pending', 'called', 'failed', 'cancelled'
- `notes` (TEXT) - Admin notes about the callback
- `user_id` (UUID) - Reference to auth.users (nullable, for logged-in users)

**Features:**
- Row Level Security (RLS) enabled
- Indexes for performance optimization
- Policies for user and admin access control
- Phone number validation (10-15 digits only)

## Important Notes

⚠️ **REMEMBER**: The callback feature is currently set up for **Option A** (manual follow-up).
Later, you need to implement **Option B** (automated notifications after 5 minutes).

For Option B, you'll need to:
1. Set up Supabase Edge Functions or a cron job
2. Configure email/SMS service (like SendGrid, Twilio, etc.)
3. Create a scheduled task to check for pending requests >5 minutes old
4. Send notifications to admin/sales team

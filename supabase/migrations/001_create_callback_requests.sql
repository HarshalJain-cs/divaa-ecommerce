-- Create callback_requests table for storing customer callback requests
-- This table stores phone numbers and timestamps for callback requests from the Digital Gold page

CREATE TABLE IF NOT EXISTS public.callback_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(15) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  called_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'called', 'failed', 'cancelled')),
  notes TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Indexes for performance
  CONSTRAINT callback_requests_phone_number_check CHECK (phone_number ~ '^\d{10,15}$')
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_callback_requests_created_at ON public.callback_requests(created_at DESC);

-- Create index on status for filtering pending requests
CREATE INDEX IF NOT EXISTS idx_callback_requests_status ON public.callback_requests(status);

-- Create index on user_id for user-specific queries
CREATE INDEX IF NOT EXISTS idx_callback_requests_user_id ON public.callback_requests(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.callback_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own callback requests
CREATE POLICY "Users can create callback requests" ON public.callback_requests
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR user_id IS NULL
  );

-- Policy: Users can view their own callback requests
CREATE POLICY "Users can view own callback requests" ON public.callback_requests
  FOR SELECT
  USING (
    auth.uid() = user_id OR user_id IS NULL
  );

-- Policy: Admins can view all callback requests
CREATE POLICY "Admins can view all callback requests" ON public.callback_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Admins can update callback requests
CREATE POLICY "Admins can update callback requests" ON public.callback_requests
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Admins can delete callback requests
CREATE POLICY "Admins can delete callback requests" ON public.callback_requests
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Add comment to the table
COMMENT ON TABLE public.callback_requests IS 'Stores customer callback requests from the Digital Gold page with timestamps and status tracking';

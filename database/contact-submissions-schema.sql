-- Contact Submissions Table Schema
-- This table stores contact form submissions from the website

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
ON contact_submissions(created_at DESC);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
ON contact_submissions(email);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (submit contact form)
CREATE POLICY "Anyone can submit contact form"
ON contact_submissions
FOR INSERT
WITH CHECK (true);

-- Create policy to allow authenticated admins to view all submissions
CREATE POLICY "Admins can view all contact submissions"
ON contact_submissions
FOR SELECT
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Add comment to table
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';

-- Add comments to columns
COMMENT ON COLUMN contact_submissions.id IS 'Unique identifier for the submission';
COMMENT ON COLUMN contact_submissions.name IS 'Name of the person submitting';
COMMENT ON COLUMN contact_submissions.email IS 'Email address for response';
COMMENT ON COLUMN contact_submissions.phone IS 'Optional phone number';
COMMENT ON COLUMN contact_submissions.subject IS 'Subject of the inquiry';
COMMENT ON COLUMN contact_submissions.message IS 'Message content';
COMMENT ON COLUMN contact_submissions.created_at IS 'Timestamp when submission was created';

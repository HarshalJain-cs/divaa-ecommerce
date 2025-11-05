/**
 * @title Supabase Client Configuration
 * @description Initialize and export Supabase client
 */

import { createClient } from '@supabase/supabase-js'

// Supabase configuration - using direct values
const supabaseUrl = 'https://ceytiwiuidapmlzghlzo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNleXRpd2l1aWRhcG1semdobHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxOTE2MDMsImV4cCI6MjA3Nzc2NzYwM30.KQ5VE2SWT2veLzD_pRqLi63u4OfMX8Q7Qy-0mKL428g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pfplrhvkaympjrmpjtsh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcGxyaHZrYXltcGpybXBqdHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTU5MzgsImV4cCI6MjA2MjE3MTkzOH0.PTMP_XL2QPj2s_5SKeag-An78JwQ05em9V1w-ceWCUk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
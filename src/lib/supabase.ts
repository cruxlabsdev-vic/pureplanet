import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For client components
export function createClientComponentClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// For server components (API routes)
export function createRouteHandlerClient({ cookies }: { cookies: any }) {
  return createClient(supabaseUrl, supabaseAnonKey);
}

import { Database } from '@/types/supabase'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
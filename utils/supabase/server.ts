import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Returns all cookies as an array of { name, value }
          return cookieStore
            .getAll()
            .map(({ name, value }) => ({ name, value }));
        },
        setAll(cookiesToSet) {
          // Sets all cookies provided in the array
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
}
// This function creates a Supabase client for server-side usage in Next.js.

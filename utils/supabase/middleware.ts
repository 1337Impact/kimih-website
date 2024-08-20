import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // refreshing the auth token
  const { data: userData } = await supabase.auth.getUser();
  if (request.nextUrl.pathname.startsWith("/auth") && userData?.user) {
    const url = request.nextUrl.clone();
    if (userData.user.user_metadata.user_role === 'manager'){
      url.pathname = "/dashboard";
    } else {
      url.pathname = "/profile";
    }
    return NextResponse.redirect(url);
  }
  else if (
    request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    console.log("dashboard: ", userData);
    if (userData && userData.user) {
      if (userData.user.user_metadata.user_role === 'manager') {
        return NextResponse.next();
      } else {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } else {
      const url = request.nextUrl.clone();
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
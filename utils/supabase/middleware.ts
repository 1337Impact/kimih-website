import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Define the routes you want to protect
const protectedRoutes = ["/profile", "/appointments", "/checkout"];

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

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  // Handle user not logged in
  if (!user && protectedRoutes.some(route => pathname.includes(route))) {
    url.pathname = "/auth/customer";
    return NextResponse.redirect(url);
  }

  // Handle user logged in
  if (user) {
    const isProfileComplete = user.user_metadata.isCompleted;
    const userRole = user.user_metadata.user_role;

    if (userRole !== "user") {
      // Log the user out and redirect to /auth
      await supabase.auth.signOut();
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    if (!isProfileComplete) {
      if (protectedRoutes.some(route => pathname.startsWith(route)) || pathname.startsWith("/auth")) {
        url.pathname = "/create-account";
        url.searchParams.set("code", "complete-profile");
        return NextResponse.redirect(url);
      }
    } else {
      if (pathname.startsWith("/create-account")) {
        url.pathname = "/profile";
        return NextResponse.redirect(url);
      } else if (pathname.startsWith("/auth")) {
        url.pathname = user.user_metadata.user_role === "user" ? "/profile" : "/";
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}

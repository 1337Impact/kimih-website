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

  const { data: userData } = await supabase.auth.getUser();

  // handle user not logged in
  if (!userData.user) {
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/profile")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  }
  // handle user logged in
  if (userData.user) {
    // console.log("User data: ", userData.user.user_metadata);
    if (!userData?.user?.user_metadata.isCompleted) {
      // profile not complete and user try to access dashboard or profile
      if (
        request.nextUrl.pathname.startsWith("/dashboard") ||
        request.nextUrl.pathname.startsWith("/profile") ||
        request.nextUrl.pathname.startsWith("/auth") ||
        (request.nextUrl.pathname.startsWith("/create-account") &&
          !request.nextUrl.searchParams.get("code"))
      ) {
        const url = request.nextUrl.clone();
        url.pathname = "/create-account";
        url.searchParams.set("code", "complete-profile");
        return NextResponse.redirect(url);
      }
    } else {
      // profile complete and user try to access create account
      if (request.nextUrl.pathname.startsWith("/create-account")) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      } else if (request.nextUrl.pathname.startsWith("/auth")) {
        // profile complete and user try to access auth page
        const url = request.nextUrl.clone();
        if (userData.user.user_metadata.user_role === "manager") {
          url.pathname = "/dashboard";
        } else {
          url.pathname = "/profile";
        }
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}

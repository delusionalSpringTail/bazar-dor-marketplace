import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

if (!session) {
        // 1. Get the path and search query the user was trying to access
        const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;
        
        // 2. Create the login URL and attach callbackUrl
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", callbackUrl);

        return NextResponse.redirect(loginUrl);
    }
  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile", "/profile/update-profile"], // Specify the routes the middleware applies to
};
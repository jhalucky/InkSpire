// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const isProfileSetupRoute = req.nextUrl.pathname.startsWith("/profile/setup");
    
    // Check if the user is authenticated and has a token
    if (token) {
        // If the user has no username and is not on the setup page, redirect them.
        if (!token.username && !isProfileSetupRoute) {
            return NextResponse.redirect(new URL("/profile/setup", req.url));
        }

        // If the user has a username and is on the setup page, redirect them back to the main profile page.
        if (token.username && isProfileSetupRoute) {
            return NextResponse.redirect(new URL("/profile", req.url));
        }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/profile/:path*"],
};
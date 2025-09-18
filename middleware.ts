// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const isProfileSetupRoute = req.nextUrl.pathname.startsWith("/profile/setup");

    // If the user has a token but no username, redirect to profile setup
    if (token && !token.username && !isProfileSetupRoute) {
      return NextResponse.redirect(new URL("/profile/setup", req.url));
    }

    // If the user has a username and is trying to access the setup page,
    // redirect them to the main profile page
    if (token && token.username && isProfileSetupRoute) {
      return NextResponse.redirect(new URL("/profile", req.url));
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
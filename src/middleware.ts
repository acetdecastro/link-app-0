import { NextResponse } from "next/server";
import { auth } from "./libs/auth";
import { APP_URL } from "./constants/urls";

const publicRoutes = ["/", "/login", "/signup", "/about"];

export default auth((req) => {
  const isAuthenticated = !!req.auth?.user;
  const { pathname } = req.nextUrl;

  // If not authenticated and visiting a route under /app, redirect to login
  if (!isAuthenticated && pathname.startsWith("/app")) {
    return NextResponse.redirect(`${APP_URL}/login`);
  }

  // If authenticated and visiting publicRoutes, redirect to "/app"
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(`${APP_URL}/app`);
  }

  // Continue to the next middleware if none of the conditions are met
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};

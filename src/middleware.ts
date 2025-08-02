import { auth } from "@/auth";
import { env } from "./config/env";
import { NextResponse } from "next/server";
import { type User } from "next-auth";

export default auth((req) => {
  const url = req.nextUrl;
  const auth = req.auth;
  const user: User = auth?.user;

  if (url.pathname.startsWith("/c/chk7964") && user?.role !== "ADMIN") {
    return NextResponse.redirect(
      new URL("/c/sign-in", env.NEXT_PUBLIC_SITE_URL)
    );
  }

  if (url.pathname.startsWith("/api/chk7964") && user?.role !== "ADMIN") {
    return NextResponse.redirect(
      new URL("/c/sign-in", env.NEXT_PUBLIC_SITE_URL)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/c/chk7964/:path*", "/api/chk7964/:path*", "/c/sign-in/:path*"],
};

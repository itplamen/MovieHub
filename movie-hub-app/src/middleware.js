import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/genre")) {
    return NextResponse.redirect(new URL("/genres", request.url));
  }

  if (pathname.startsWith("/movie") || pathname.startsWith("/tv")) {
    return NextResponse.redirect(new URL("/discover", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/genre", "/movie", "/tv"],
};

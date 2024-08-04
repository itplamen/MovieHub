import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/genres") || pathname.startsWith("/genre")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/movie")) {
    return NextResponse.redirect(new URL("/discover", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/genres", "/genre", "/movie"],
};

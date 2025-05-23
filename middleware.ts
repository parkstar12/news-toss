import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  console.log(userAgent);

  const isMobile =
    /iPhone|Android|Mobile|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  console.log(isMobile);

  if (isMobile && request.nextUrl.pathname !== "/only-desktop") {
    const url = request.nextUrl.clone();
    url.pathname = "/only-desktop";
    return NextResponse.redirect(url);
  }

  if (!isMobile && request.nextUrl.pathname === "/only-desktop") {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

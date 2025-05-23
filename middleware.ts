import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile =
    /iPhone|Android|Mobile|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile && pathname !== "/only-desktop") {
    return NextResponse.redirect(new URL("/only-desktop", req.url));
  }

  // if (request.nextUrl.pathname === "/only-desktop") {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

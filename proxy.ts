import { NextResponse, type NextRequest } from "next/server";

/**
 * First line of defence for /admin: bounce anyone without a session cookie
 * straight to the login page. This only checks that a cookie exists — the
 * signature is verified server-side in requireLogin(), which every admin page
 * and action calls. The proxy can't do the HMAC itself because it runs on the
 * edge runtime, without node:crypto.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  if (!request.cookies.get("vistas_session")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };

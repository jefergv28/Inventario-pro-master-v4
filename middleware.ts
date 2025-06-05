import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    // Si no hay token, redirigimos a login con query expired=1
    return NextResponse.redirect(new URL("/auth/login?expired=1", request.url));
  }

  // Si hay token, permitimos continuar
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // proteger rutas bajo /dashboard
};

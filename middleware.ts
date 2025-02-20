// import { NextRequest, NextResponse } from "next/server"

// export const middleware = (req: NextRequest) => {

//   const url = req.nextUrl.clone();

//   if(url.pathname === "/") {
//     url.pathname = "/auth/login";

//     return NextResponse.redirect(url);
//   }
// }

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Convert secret key to Uint8Array for `jose`
const secret = new TextEncoder().encode(SECRET_KEY);

export const middleware = async (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Redirect "/" to "/auth/login"
  if (path === "/") {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // List of public API routes (Not protected)
  const publicRoutes = ["/api/auth/login", ];

  // Allow public routes without authentication
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Protect all other /api/ routes
  if (path.startsWith("/api/")) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const url = req.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.rewrite(new URL('/auth',req.url))
    }

    const token = authHeader.split(" ")[1];

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

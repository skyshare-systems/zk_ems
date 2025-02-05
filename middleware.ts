import { NextRequest, NextResponse } from "next/server"

export const middleware = (req: NextRequest) => {

  const url = req.nextUrl.clone();

  if(url.pathname === "/") {
    url.pathname = "/auth/login";

    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
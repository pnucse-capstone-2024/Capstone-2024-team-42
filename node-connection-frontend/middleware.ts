import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import getSessionToken from "./app/_utils/getSessionToken";

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const sessionToken = await getSessionToken();

  if (
    !sessionToken &&
    !pathname.endsWith("/") &&
    !pathname.endsWith("/join") &&
    !pathname.endsWith("/login")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decodedToken = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (
      decodedToken?.sub?.startsWith("ViewerMSP") &&
      pathname.startsWith("/registration")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      decodedToken?.sub?.startsWith("RegistryMSP") &&
      (pathname.startsWith("/issue") || pathname.startsWith("/history"))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error(error);
    // return NextResponse.redirect(new URL("/", request.url));
  }
};

export default middleware;

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};

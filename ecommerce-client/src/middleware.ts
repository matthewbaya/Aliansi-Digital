import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readPayloadJose, verifyToken } from "./db/helpers/jwt";

export async function middleware(request: NextRequest) {
  const authentication = cookies().get("Authorization");

  if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
    // console.log(authentication);
    if (!authentication) {
      return NextResponse.json(
        {
          message: "Authentication Failed",
        },
        { status: 401 }
      );
    }
    const [type, token] = authentication.value.split(" ");
    if (type !== "Bearer") {
      return NextResponse.json(
        {
          message: "Authentication Failed",
        },
        { status: 401 }
      );
    }

    const decodedToken = await readPayloadJose<{
      id: string;
      email: string;
      username: string;
    }>(token);

    //   console.log(decodedToken);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decodedToken.id);
    requestHeaders.set("x-user-email", decodedToken.email);
    requestHeaders.set("x-user-username", decodedToken.username);

    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });

    return response;
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (!authentication) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (authentication) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/wishlists/:path*", "/wishlist", "/login"],
};

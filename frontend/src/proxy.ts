import { APP_ROUTES } from "@/constants/routes";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { refreshSession } from "./features/auth/actions/refresh-session";

export async function proxy(request: NextRequest) {
  const accessToken =
    request.cookies.get("access_token")?.value;

  const refreshToken =
    request.cookies.get("refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(
      new URL(APP_ROUTES.auth.login, request.url),
    );
  }

  if (!isTokenExpired(accessToken)) {
    return NextResponse.next();
  }

  const result = await refreshSession(refreshToken);

  if (!result.success) {
    return NextResponse.redirect(
      new URL(APP_ROUTES.auth.login, request.url),
    );
  }

  if (!result.meta) {
    throw new Error("Auth metadata is missing");
  }

  const {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  } = result.meta.auth;

  request.cookies.set(
    "access_token",
    newAccessToken,
  );

  request.cookies.set(
    "refresh_token",
    newRefreshToken,
  );

  const response = NextResponse.next({
    request,
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  response.cookies.set(
    "access_token",
    newAccessToken,
    cookieOptions
  );

  response.cookies.set(
    "refresh_token",
    newRefreshToken,
    cookieOptions,
  );

  return response;
}

function isTokenExpired(token: string) {
  try {
    const payload = decodeJwt(token);

    if (!payload.exp) {
      return true;
    }

    return payload.exp <= Math.floor(Date.now() / 1000);
  } catch {
    return true;
  }
}

export const config = {
  matcher: [
    "/",
  ],
};
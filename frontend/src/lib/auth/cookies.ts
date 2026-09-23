import "server-only";

import type { cookies } from "next/headers";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

type SetAuthCookiesParams = {
  cookieStore: CookieStore;
  accessToken: string;
  refreshToken: string;
};


export function setAuthCookies({
  cookieStore,
  accessToken,
  refreshToken,
}: SetAuthCookiesParams) {
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

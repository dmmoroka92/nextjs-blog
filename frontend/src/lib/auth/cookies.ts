import "server-only";

import type { cookies } from "next/headers";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

type SetAuthCookieParams = {
  cookieStore: CookieStore;
  name: string;
  value: string;
};

type SetAuthCookiesParams = {
  cookieStore: CookieStore;
  accessToken: string;
  refreshToken: string;
};

function setAuthCookie({
  cookieStore,
  name,
  value,
}: SetAuthCookieParams) {
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export function setAuthCookies({
  cookieStore,
  accessToken,
  refreshToken,
}: SetAuthCookiesParams) {
  setAuthCookie({
    cookieStore,
    name: "access_token",
    value: accessToken
  });

  setAuthCookie({
    cookieStore,
    name: "refresh_token",
    value: refreshToken
  });
}

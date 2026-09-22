import "server-only";

import type { cookies } from "next/headers";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

type SetAuthCookieParams = {
  cookieStore: CookieStore;
  name: string;
  value: string;
  maxAge: number;
};

export function setAuthCookie({
  cookieStore,
  name,
  value,
  maxAge,
}: SetAuthCookieParams) {
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}
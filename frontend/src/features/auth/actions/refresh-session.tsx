"use server";

import { API_ROUTES, APP_ROUTES } from "@/constants/routes";
import { setAuthCookies } from "@/lib/auth/cookies";
import { camelizeKeys } from "humps";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ApiResponse, AuthMeta } from "../types/api";

export async function refreshSession(): Promise<
  ApiResponse<null, AuthMeta>
> {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token")?.value

  if (!refreshToken) {
    redirect(APP_ROUTES.auth.login);
  }

  const response = await fetch(
    `${process.env.API_HOST}${API_ROUTES.auth.refresh}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  const json = await response.json();

  if (response.status === 401) {
    return {
      success: false,
      data: null,
      errors: camelizeKeys(json.meta.errors),
    };
  }

  if (!response.ok) {
    throw new Error(
      `Refresh request failed with status ${response.status}`,
    );
  }

  const meta = camelizeKeys(json.meta) as AuthMeta;

  console.log("-------------------")
  console.log("META AUTH:", meta)
  console.log("-------------------")

  setAuthCookies({
    cookieStore,
    accessToken: meta.auth.accessToken,
    refreshToken: meta.auth.refreshToken
  })

  return {
    success: true,
    data: null,
    meta,
    errors: null,
  };
}
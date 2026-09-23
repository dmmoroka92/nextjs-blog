"use server";

import { API_ROUTES } from "@/constants/routes";
import { apiFetch } from "@/lib/api/client";
import { cookies } from "next/headers";

import { ApiResponse } from "../types/api";

type LogoutMeta = {
  message: string;
};

export async function logoutUser(): Promise<
  ApiResponse<null, LogoutMeta>
> {
  const cookieStore = await cookies();

  const refreshToken =
    cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return {
      success: false,
      data: null,
      errors: {},
    };
  }

  const result = await apiFetch<null, LogoutMeta>(
    API_ROUTES.auth.logout,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  if (!result.success) {
    return result;
  }

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  return result;
}
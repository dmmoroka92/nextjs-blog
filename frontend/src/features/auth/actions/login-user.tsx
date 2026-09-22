"use server"

import { ACCESS_TOKEN_EXP_MINUTES, REFRESH_TOKEN_EXP_DAYS } from "@/constants/auth";
import { API_ROUTES } from "@/constants/routes";
import { apiFetch } from "@/lib/api/client";
import { setAuthCookie } from "@/lib/auth/cookies";
import { cookies } from "next/headers";
import { LoginFormData } from "../schemas/login.schema";
import { ApiResponse, AuthMeta } from "../types/api";
import { User } from "../types/user";

export async function loginUser(
  formData: LoginFormData
): Promise<ApiResponse<User>> {
  const result = await apiFetch<User, AuthMeta>(
    API_ROUTES.auth.login,
    {
      method: "POST",
      body: {
        user: formData
      }
    }
  )

  if (!result.success) {
    return result
  }

  if (!result.meta) {
    throw new Error("Auth metadata is missing");
  }

  const cookieStore = await cookies();

  setAuthCookie({
    cookieStore,
    name: "access_token",
    value: result.meta.auth.accessToken,
    maxAge: ACCESS_TOKEN_EXP_MINUTES * 60,
  });

  setAuthCookie({
    cookieStore,
    name: "refresh_token",
    value: result.meta.auth.refreshToken,
    maxAge: REFRESH_TOKEN_EXP_DAYS * 24 * 60 * 60,
  });

  return {
    success: true,
    data: result.data,
    errors: null
  };
}

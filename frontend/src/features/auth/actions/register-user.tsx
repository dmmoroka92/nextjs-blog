"use server";

import { API_ROUTES } from "@/constants/routes";
import { apiFetch } from "@/lib/api/client";
import { setAuthCookies } from "@/lib/auth/cookies";
import { cookies } from "next/headers";
import { SignupFormData } from "../schemas/sign-up.schema";
import { ApiResponse, AuthMeta } from "../types/api";
import { User } from "../types/user";

export async function registerUser(
  formData: SignupFormData,
): Promise<ApiResponse<User, AuthMeta>> {
  const result = await apiFetch<User, AuthMeta>(
    API_ROUTES.auth.signup,
    {
      method: "POST",
      body: {
        user: formData,
      },
    },
  );

  if (!result.success) {
    return result;
  }

  if (!result.meta) {
    throw new Error("Auth metadata is missing");
  }  

  const cookieStore = await cookies();

  setAuthCookies({
    cookieStore,
    accessToken: result.meta.auth.accessToken,
    refreshToken: result.meta.auth.refreshToken
  })

  return {
    success: true,
    data: result.data,
    meta: result.meta,
    errors: null
  };
}

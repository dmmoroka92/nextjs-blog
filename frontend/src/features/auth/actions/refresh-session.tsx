import "server-only";

import { API_ROUTES } from "@/constants/routes";
import { camelizeKeys } from "humps";

import { ApiResponse, AuthMeta } from "../types/api";

export async function refreshSession(
  refreshToken: string,
): Promise<ApiResponse<null, AuthMeta>> {
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
      errors: camelizeKeys(
        json.meta?.errors ?? {},
      ),
    };
  }

  if (!response.ok) {
    throw new Error(
      `Refresh request failed with status ${response.status}`,
    );
  }

  const meta = camelizeKeys(json.meta) as AuthMeta;

  return {
    success: true,
    data: null,
    meta,
    errors: null,
  };
}
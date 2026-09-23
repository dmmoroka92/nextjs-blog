import "server-only";

import { API_ERROR_CODES } from "@/constants/auth";
import { APP_ROUTES } from "@/constants/routes";
import { refreshSession } from "@/features/auth/actions/refresh-session";
import { ApiError, ApiResponse } from "@/features/auth/types/api";
import { camelizeKeys, decamelizeKeys } from "humps";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { normalizeJsonApiResource } from "../utils/api/normalize";

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiFetch<T, TMeta = undefined>(
  url: string,
  options: ApiFetchOptions = {},
): Promise<ApiResponse<T, TMeta>> {
  let response = await fetchWithAccessToken(url, options);
  let json = await response.json();

  let apiErrors = camelizeKeys(json.meta?.errors);

  const accessTokenExpired =
    response.status === 401 &&
    apiErrors?.auth?.some(
      (error: ApiError) =>
        error.code === API_ERROR_CODES.EXPIRED_ACCESS_TOKEN,
    );

  if (accessTokenExpired) {
    const result = await refreshSession();

    if (!result.success) {
      redirect(APP_ROUTES.auth.login);
    }

    // refreshSession() replaced the cookies.
    // Make the original request again with the NEW access token.
    response = await fetchWithAccessToken(url, options);
    json = await response.json();

    apiErrors = camelizeKeys(json.meta?.errors);
  }

  if ([401, 422].includes(response.status)) {
    return {
      success: false,
      data: null,
      errors: apiErrors,
    };
  }

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}`,
    );
  }

  return {
    success: true,
    data: camelizeKeys(
      normalizeJsonApiResource(json.data),
    ) as T,
    meta: json.meta
      ? camelizeKeys(json.meta) as TMeta
      : undefined,
    errors: null,
  };
}

async function fetchWithAccessToken(
  url: string,
  options: ApiFetchOptions,
) {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("access_token")?.value;

  return fetch(`${process.env.API_HOST}${url}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",

      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),

      ...options.headers,
    },

    body: options.body
      ? JSON.stringify(decamelizeKeys(options.body))
      : undefined,
  });
}
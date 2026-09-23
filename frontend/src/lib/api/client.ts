import "server-only";

import { ApiError, ApiResponse } from "@/features/auth/types/api";
import { camelizeKeys, decamelizeKeys } from "humps";
import { cookies } from "next/headers";

import { normalizeJsonApiResource } from "../utils/api/normalize";

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiFetch<T, TMeta = undefined>(
  url: string,
  options: ApiFetchOptions = {},
): Promise<ApiResponse<T, TMeta>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(
    `${process.env.API_HOST}${url}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),

        ...options.headers,
      },

      body: options.body !== undefined
        ? JSON.stringify(decamelizeKeys(options.body))
        : undefined,
    },
  );

  const json = await response.json();

  const apiErrors = camelizeKeys(
    json.meta?.errors ?? {},
  ) as Record<string, ApiError[]>;

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
  
    data: json.data != null
      ? camelizeKeys(
          normalizeJsonApiResource(json.data),
        ) as T
      : null as T,
  
    meta: json.meta
      ? camelizeKeys(json.meta) as TMeta
      : undefined,
  
    errors: null,
  };
}

import "server-only";

import { ApiError, ApiResponse } from "@/features/auth/types/api";
import { camelizeKeys, decamelizeKeys } from "humps";
import { cookies } from "next/headers";
import { normalizeJsonApiCollection, normalizeJsonApiResource } from "../utils/api/normalize";

type JsonBody = Record<string, unknown>;

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: JsonBody | FormData;
};

export async function apiFetch<T, TMeta = undefined>(
  url: string,
  options: ApiFetchOptions = {},
): Promise<ApiResponse<T, TMeta>> {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("access_token")?.value;

  const isFormData =
    options.body instanceof FormData;

  let body: BodyInit | undefined;

  if (options.body instanceof FormData) {
    body = options.body;
  } else if (options.body !== undefined) {
    body = JSON.stringify(
      decamelizeKeys(options.body),
    );
  }

  const response = await fetch(
    `${process.env.API_HOST}${url}`,
    {
      ...options,

      headers: {
        Accept: "application/json",

        ...(!isFormData && {
          "Content-Type": "application/json",
        }),

        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),

        ...options.headers,
      },

      body,
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

  const normalizedData =
    json.data == null
      ? null
      : Array.isArray(json.data)
        ? normalizeJsonApiCollection(json.data)
        : normalizeJsonApiResource(json.data);

  return {
    success: true,
  
    data:
      normalizedData != null
        ? (camelizeKeys(normalizedData) as T)
        : (null as T),
  
    meta: json.meta
      ? (camelizeKeys(json.meta) as TMeta)
      : undefined,
  
    errors: null,
  }
}

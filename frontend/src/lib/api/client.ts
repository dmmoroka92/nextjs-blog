import "server-only"

import { ApiResponse } from "@/features/auth/types/api";
import { normalizeJsonApiResource } from "../utils/api/normalize";
import { camelizeKeys, decamelizeKeys } from "humps";

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiFetch<T, TMeta = undefined>(
  url: string,
  options: ApiFetchOptions = {},
): Promise<ApiResponse<T, TMeta>> {
  const response = await fetch(`${process.env.API_HOST}${url}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },

    body: options.body
      ? JSON.stringify(decamelizeKeys(options.body))
      : undefined,
  });

  const json = await response.json();

  if (response.status === 422) {
    return {
      success: false,
      data: null,
      errors: camelizeKeys(json.meta.errors),
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
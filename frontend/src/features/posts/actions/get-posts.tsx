"use server"

import { ApiResponse, PaginationMeta } from "@/features/auth/types/api";
import { Post } from "../types";
import { apiFetch } from "@/lib/api/client";
import { API_ROUTES } from "@/constants/routes";

type PostsMeta = {
  pagination: PaginationMeta
}

export async function getPosts(
  { page = 1 }: { page?: number },
): Promise<ApiResponse<Post[], PostsMeta>> {
  return apiFetch<Post[], PostsMeta> (
    `${API_ROUTES.posts.index}?page=${page}`,
  )
}
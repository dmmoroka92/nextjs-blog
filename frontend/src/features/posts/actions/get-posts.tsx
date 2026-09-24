"use server"

import { ApiResponse, PaginationMeta } from "@/features/auth/types/api";
import { Post } from "../types";
import { apiFetch } from "@/lib/api/client";
import { API_ROUTES } from "@/constants/routes";

type PostsMeta = {
  popularTags: string[]
  pagination: PaginationMeta
}

type Props = {
  page?: number,
  tags?: string[]
}

export async function getPosts({
  page = 1,
  tags = []
}: Props): Promise<ApiResponse<Post[], PostsMeta>> {
  const params = new URLSearchParams()

  params.set("page", String(page))

  tags.forEach(tag => {
    params.append("tags[]", tag)
  })

  return apiFetch<Post[], PostsMeta> (
    `${API_ROUTES.posts.index}?${params.toString()}`,
  )
}

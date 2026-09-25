import { API_ROUTES } from "@/constants/routes"
import { ApiResponse } from "@/features/auth/types/api"
import { apiFetch } from "@/lib/api/client"
import { Post } from "../types"

type GetPostParams = {
  slug: string;
};

export function getPost({
  slug,
}: GetPostParams): Promise<ApiResponse<Post>> {
  return apiFetch<Post>(
    API_ROUTES.posts.show(slug),
  )
}
import { apiFetch } from "@/lib/api/client";
import { Post } from "../types";
import { API_ROUTES } from "@/constants/routes";
import { ApiResponse } from "@/features/auth/types/api";

type GetPostParams = {
  slug: string;
};

export async function getPost({
  slug,
}: GetPostParams): Promise<ApiResponse<Post>> {
  return apiFetch<Post>(
    API_ROUTES.posts.show(slug),
  );
}
"use server";

import { API_ROUTES } from "@/constants/routes";
import { ApiResponse } from "@/features/auth/types/api";
import { apiFetch } from "@/lib/api/client";

import { CommentFormData } from "../schemas/comment.schema";

type CommentMeta = {
  message: string;
};

export async function createComment(
  postSlug: string,
  commentData: CommentFormData,
): Promise<ApiResponse<Comment, CommentMeta>> {
  if (!postSlug) {
    throw new Error("Post slug is required");
  }

  return apiFetch<Comment, CommentMeta>(
    API_ROUTES.posts.comments.create(postSlug),
    {
      method: "POST",
      body: {
        comment: commentData,
      },
    },
  );
}
"use server"

import { API_ROUTES } from "@/constants/routes";
import { ApiResponse } from "@/features/auth/types/api";
import { apiFetch } from "@/lib/api/client";
import { PostFormData } from "../schemas/post.schema";
import { Post } from "../types";

type PostMeta = {
  message: string
}

export async function updatePost(
  slug: string,
  postData: PostFormData,
): Promise<ApiResponse<Post, PostMeta>> {
  if (!slug) {
    throw new Error("Post slug is required");
  }

  const body = new FormData();

  body.append("post[title]", postData.title)
  
  body.append("post[slug]", postData.slug ?? "")
  
  body.append("post[status]", postData.status)
  
  body.append("post[excerpt]", postData.excerpt ?? "")

  postData.tags.forEach((tag) => {
    body.append("post[tag_list][]", tag)
  });

  if (postData.tags.length === 0) {
    body.append("post[tag_list][]", "")
  }

  if (postData.content) {
    body.append(
      "post[content]",
      JSON.stringify(postData.content),
    )
  }

  const coverImage = postData.coverImage?.[0]

  if (coverImage) {
    body.append(
      "post[cover_image]",
      coverImage
    )
  }

  return apiFetch<Post, PostMeta>(
    API_ROUTES.posts.update(slug),
    {
      method: "PATCH",
      body,
    },
  );
}

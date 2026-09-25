"use server"

import { API_ROUTES } from "@/constants/routes"
import { apiFetch } from "@/lib/api/client"

type PostMeta = {
  message: string
}

export async function deletePost(slug: string) {
  return apiFetch<null, PostMeta>(
    API_ROUTES.posts.delete(slug), 
    {
      method: "DELETE"
    }
  )
}

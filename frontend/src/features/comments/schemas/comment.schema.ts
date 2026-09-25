import { z } from "zod"

export const commentSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Body is required")
    .max(2000, "Body should be at least 2000 characters")
})

export type CommentFormData = z.infer<typeof commentSchema>

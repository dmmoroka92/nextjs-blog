import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  slug: z.string().optional(),

  excerpt: z.string().optional(),

  coverImage: z
    .custom<FileList>()
    .refine(
      (files) =>
        !files?.length ||
        files[0].size <= MAX_IMAGE_SIZE,
      "Cover image must be smaller than 5 MB",
    )
    .refine(
      (files) =>
        !files?.length ||
        IMAGE_TYPES.includes(files[0].type),
      "Cover image must be a JPEG, PNG, or WEBP image",
    )
    .optional(),

  content: z
    .record(z.string(), z.unknown())
    .optional(),

  status: z.enum([
    "draft",
    "published"
  ]),

  tags: z
    .array(z.string().trim().min(1))
})
.superRefine((data, ctx) => {
  if (data.status === "published" && !data.content) {
    ctx.addIssue({
      code: "custom",
      path: ["content"],
      message: "Content is required for published posts",
    });
  }
});

export type PostFormData = z.infer<typeof postSchema>

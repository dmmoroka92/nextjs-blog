import { User } from "../auth/types/user";
import type { JSONContent } from "@tiptap/core";
import { Comment } from "../comments/types";

export type PostStatus =
  | "draft"
  | "published"
  | "archived";

export type PostContent = JSONContent

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  status: PostStatus
  content: PostContent | null
  coverImageUrl: string | null
  createdAt: string
  tags: string[]

  user: User
  comments: Comment[]
};

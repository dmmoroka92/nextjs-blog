export type PostStatus =
  | "draft"
  | "published"
  | "archived";

export type PostContent = Record<string, unknown>;

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: PostStatus;
  content: PostContent | null;
  coverImageUrl: string | null;
};
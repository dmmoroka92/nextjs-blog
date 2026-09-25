import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { APP_ROUTES } from "@/constants/routes";
import CommentForm from "@/features/comments/components/comment-form";
import CommentSection from "@/features/comments/components/comment-section";
import { getPost } from "@/features/posts/actions/get-post";
import PostContentRenderer from "@/features/posts/components/post-content-renderer";
import { cn } from "@/lib/utils/general/cn";
import { formatDate } from "@/lib/utils/general/format-date";
import { getInitials } from "@/lib/utils/general/user-initials";

type PostShowProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function PostShow({
  params,
}: PostShowProps) {
  const { slug } = await params;

  const result = await getPost({ slug });

  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data;
  const comments = post.comments
  
  return (
    <article className="mx-auto w-full max-w-4xl">
      <Link
        href={APP_ROUTES.posts.index}
        className="
          inline-flex items-center gap-2
          text-sm font-medium text-emerald-300
          transition-colors hover:text-emerald-200
        "
      >
        <ArrowLeft className="size-4" />
        Back to posts
      </Link>

      <header className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
            {post.excerpt}
          </p>
        )}

        <div className="mt-7 flex items-center gap-3">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center",
              "rounded-full bg-zinc-800",
              "text-sm font-medium text-zinc-200"
            )}
          >
            {getInitials(
              post.user.firstName,
              post.user.lastName,
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-200">
              {post.user.firstName}{" "}
              {post.user.lastName}
            </p>

            <p className="mt-0.5 text-sm text-zinc-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-md border border-zinc-700",
                  "bg-zinc-900 px-2.5 py-1",
                  "text-xs font-medium text-zinc-300"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className={cn(
              "mt-8 max-h-[480px] w-full",
              "rounded-lg border border-zinc-800",
              "object-cover"
            )}
          />
        )}
      </header>

      {post.content && (
        <section
          className={cn(
            "mt-10 max-h-[60vh] overflow-y-auto",
            "border-y border-zinc-800",
            "py-8 pr-4"
          )}
        >
          <PostContentRenderer
            content={post.content}
          />
        </section>
      )}

      <section className="mt-10">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-5 text-zinc-400" />

          <h2 className="text-xl font-semibold text-zinc-100">
            Comments
          </h2>

          <span className="text-sm text-zinc-500">
            2
          </span>
        </div>

        <CommentForm postSlug={slug} />

        <div className="mt-8 divide-y divide-zinc-800">
          {
            comments.map(comment => {
              return (
                <CommentSection key={comment.id} comment={comment}>
                {comment.body}
              </CommentSection>
              )
            })
          }
        </div>
      </section>
    </article>
  );
}

export default PostShow;

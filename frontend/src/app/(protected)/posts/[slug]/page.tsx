import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { APP_ROUTES } from "@/constants/routes";
import { getPost } from "@/features/posts/actions/get-post";
import PostContentRenderer from "@/features/posts/components/post-content-renderer";
import { formatDate } from "@/lib/utils/general/format-date";

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

  console.log("getUser result:", result)

  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data;

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
            className="
              flex size-11 shrink-0 items-center justify-center
              rounded-full bg-zinc-800
              text-sm font-medium text-zinc-200
            "
          >
            {getInitials(
              post.user.firstName,
              post.user.lastName,
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-200">
              {post.user.firstName} {post.user.lastName}
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
                className="
                  rounded-md border border-zinc-700
                  bg-zinc-900 px-2.5 py-1
                  text-xs font-medium text-zinc-300
                "
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
            className="
              mt-8 max-h-[480px] w-full
              rounded-lg border border-zinc-800
              object-cover
            "
          />
        )}
      </header>

      {post.content && (
        <div className="mt-10">
          <PostContentRenderer content={post.content} />
        </div>
      )}
    </article>
  );
}

function getInitials(
  firstName: string,
  lastName: string,
) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

export default PostShow;
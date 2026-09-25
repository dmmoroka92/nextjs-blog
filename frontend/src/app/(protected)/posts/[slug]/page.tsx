import { ArrowLeft, MessageSquare } from "lucide-react";
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
        <section
          className="
            mt-10 max-h-[60vh] overflow-y-auto
            border-y border-zinc-800
            py-8 pr-4
          "
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

        <form className="mt-6">
          <textarea
            rows={3}
            placeholder="Write a comment..."
            className="
              w-full resize-none rounded-lg
              border border-zinc-800 bg-zinc-900/50
              px-4 py-3 text-sm text-zinc-100
              outline-none transition-colors
              placeholder:text-zinc-600
              focus:border-emerald-500
            "
          />

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="
                rounded-md bg-emerald-300
                px-4 py-2
                text-sm font-medium text-zinc-950
                transition-colors
                hover:bg-emerald-200
              "
            >
              Comment
            </button>
          </div>
        </form>

        <div className="mt-8 divide-y divide-zinc-800">
          <Comment
            initials="JD"
            name="Jane Doe"
            date="Sep 25, 2026"
          >
            Great explanation. The transaction example
            made the concept much clearer.
          </Comment>

          <Comment
            initials="AM"
            name="Alex Morgan"
            date="Sep 24, 2026"
          >
            Would be interesting to see an example using
            nested transactions as well.
          </Comment>
        </div>
      </section>
    </article>
  );
}

type CommentProps = {
  initials: string;
  name: string;
  date: string;
  children: React.ReactNode;
};

function Comment({
  initials,
  name,
  date,
  children,
}: CommentProps) {
  return (
    <div className="flex gap-3 py-6">
      <div
        className="
          flex size-9 shrink-0 items-center justify-center
          rounded-full bg-zinc-800
          text-xs font-medium text-zinc-300
        "
      >
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-200">
            {name}
          </span>

          <span className="text-xs text-zinc-600">
            {date}
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {children}
        </p>
      </div>
    </div>
  );
}

function getInitials(
  firstName: string,
  lastName: string,
) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

export default PostShow;
import { cn } from "@/lib/utils/general/cn";
import { FileText } from "lucide-react";
import { Post } from "../types";
import { formatDate } from "@/lib/utils/general/format-date";
import Link from "next/link";
import { APP_ROUTES } from "@/constants/routes";

function PostPreview({
  title,
  slug,
  excerpt,
  createdAt
}: Post) {
  return (
    <article
      className={cn(
        "flex gap-4 py-5",
        "transition-colors",
      )}
    >
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center",
          "rounded-md border border-zinc-800",
          "text-zinc-400",
        )}
      >
        <FileText className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={APP_ROUTES.posts.show(slug)}
          className="underline-offset-4 hover:underline"
        >
          <h2
            className={cn(
              "truncate text-base font-semibold",
              "text-zinc-200",
            )}
          >
            {title}
          </h2>
        </Link>

        <p className="mt-1 truncate text-sm text-zinc-400">
          {excerpt}
        </p>

        {/* <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-md border border-zinc-800",
                "bg-zinc-900 px-2 py-0.5",
                "text-xs text-zinc-400",
              )}
            >
              {tag}
            </span>
          ))}
        </div> */}
      </div>

      <div
        className={cn(
          "hidden shrink-0 text-right",
          "text-sm text-zinc-400 sm:block",
        )}
      >
        <p>{formatDate(createdAt)}</p>
      </div>
    </article>
  );
}

export default PostPreview

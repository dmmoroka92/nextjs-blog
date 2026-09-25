import { APP_ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils/general/cn"
import { formatDate } from "@/lib/utils/general/format-date"
import { ChevronRight, FileText } from "lucide-react"
import Link from "next/link"
import { Post } from "../types"
import PostActionMenu from "./post-action-menu"

export type RecentPost = Pick<Post, "id" | "title" | "slug" | "status" | "createdAt">

type RecentPostsProps = {
  posts: RecentPost[]
}

function RecentPosts({
  posts
}: RecentPostsProps) {
  return (
    <section className="mt-7 border-t border-zinc-800 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">
          Recent posts
        </h2>

        <Link
          href={APP_ROUTES.posts.index}
          className={cn(
            "inline-flex items-center gap-1",
            "text-sm font-medium text-emerald-300",
            "transition-colors hover:text-emerald-200",
          )}
        >
          View all
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="mt-4 divide-y divide-zinc-800">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center gap-4 py-3"
          >
            {/* Post icon */}
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center",
                "rounded-md border border-zinc-700",
                "bg-zinc-900 text-zinc-300",
              )}
            >
              <FileText className="size-5" />
            </div>

            {/* Post info */}
            <div className="min-w-0 flex-1">
            <Link
                href={APP_ROUTES.posts.show(post.slug)}
                className="underline-offset-4 hover:underline"
              >
                <p
                  className={cn(
                    "truncate text-sm font-medium",
                    "text-zinc-200",
                  )}
                >
                  {post.title}
                </p>
              </Link>

              <div className="mt-1 flex items-center gap-3">
                <span
                  className={cn(
                    "rounded border px-2 py-0.5",
                    "text-xs font-medium capitalize",

                    post.status === "published"
                      ? [
                          "border-emerald-700",
                          "bg-emerald-950/50",
                          "text-emerald-300",
                        ]
                      : [
                          "border-amber-700",
                          "bg-amber-950/40",
                          "text-amber-300",
                        ],
                  )}
                >
                  {post.status}
                </span>

                <span className="text-sm text-zinc-500">
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </div>

            <PostActionMenu post={post} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentPosts

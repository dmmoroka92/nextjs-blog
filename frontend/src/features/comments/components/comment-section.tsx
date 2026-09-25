import { cn } from "@/lib/utils/general/cn";
import { Comment } from "../types";
import { getInitials } from "@/lib/utils/general/user-initials";
import { formatDate } from "@/lib/utils/general/format-date";

type CommentProps = {
  comment: Comment
  children: React.ReactNode
};

function CommentSection({
  comment,
  children,
}: CommentProps) {
  return (
    <div className="flex gap-3 py-6">
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center",
          "rounded-full bg-zinc-800",
          "text-xs font-medium text-zinc-300"
        )}
      >
        {getInitials(
          comment.user.firstName,
          comment.user.lastName
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-200">
            {comment.user.firstName} {comment.user.lastName}
          </span>

          <span className="text-xs text-zinc-600">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {children}
        </p>
      </div>
    </div>
  );
}

export default CommentSection

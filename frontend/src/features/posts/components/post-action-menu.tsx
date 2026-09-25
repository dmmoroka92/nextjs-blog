"use client";

import { APP_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/general/cn";
import {
  Ellipsis,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import { RecentPost } from "./recent-posts";
import ConfirmDialog from "@/app/components/ui/forms/confirm-dialog";
import { deletePost } from "../actions/delete-post";

const menuItemClassName = cn(
  "flex w-full items-center gap-2",
  "rounded px-2.5 py-2",
  "text-left text-sm text-zinc-300",
  "transition-colors",
  "hover:bg-zinc-800 hover:text-zinc-100",
);

function PostActionMenu({
  post,
}: {
  post: RecentPost;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [
    deleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);
  const [isDeleting, setIsDeleting] =
    useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  function handleEdit() {
    router.push(
      APP_ROUTES.posts.edit(post.slug),
    );
  }

  function openDeleteDialog() {
    setOpen(false);
    setDeleteDialogOpen(true);
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);

      const result = await deletePost(post.slug);

      if (!result.success) {
        const messages = Object.values(
          result.errors,
        )
          .flat()
          .map((error) => error.message);

        toast.error("Post deletion failed", {
          description: messages.join("\n"),
        });

        return;
      }

      setDeleteDialogOpen(false);

      toast.success(
        result.meta?.message ??
          "Post deleted successfully",
      );

      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div
        ref={menuRef}
        className="relative"
      >
        <button
          type="button"
          aria-label={`Actions for ${post.title}`}
          aria-expanded={open}
          onClick={() =>
            setOpen((current) => !current)
          }
          className={cn(
            "flex size-9 items-center justify-center",
            "rounded-md text-zinc-400",
            "transition-colors",
            "hover:bg-zinc-800 hover:text-zinc-100",
          )}
        >
          <Ellipsis className="size-5" />
        </button>

        {open && (
          <div
            className={cn(
              "absolute right-0 top-10 z-20",
              "w-36 overflow-hidden rounded-md",
              "border border-zinc-800 bg-zinc-950",
              "p-1 shadow-xl",
            )}
          >
            <button
              type="button"
              onClick={handleEdit}
              className={menuItemClassName}
            >
              <Pencil className="size-4" />
              Edit
            </button>

            <div className="my-1 border-t border-zinc-800" />

            <button
              type="button"
              onClick={openDeleteDialog}
              className={cn(
                menuItemClassName,
                "text-red-400 hover:text-red-300",
              )}
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete post?"
        description={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => {
          if (!isDeleting) {
            setDeleteDialogOpen(false);
          }
        }}
      />
    </>
  );
}

export default PostActionMenu;

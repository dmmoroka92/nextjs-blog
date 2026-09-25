
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils/general/cn";
import {
  CommentFormData,
  commentSchema,
} from "../schemas/comment.schema";
import { createComment } from "../actions/create-comment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  postSlug: string;
};

function CommentForm({ postSlug }: CommentFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
    },
  });

  async function onSubmit(
    commentData: CommentFormData,
  ) {
    const result = await createComment(
      postSlug,
      commentData
    );
  
    if (!result.success) {
      const messages = Object.values(
        result.errors,
      )
        .flat()
        .map((error) => error.message);
  
      toast.error("Comment creation failed", {
        description: messages.join("\n"),
      })
  
      return
    }
  
    toast.success(
      result.meta?.message ??
        "Comment created successfully",
    );
  
    reset();
  
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6"
    >
      <textarea
        rows={3}
        placeholder="Write a comment..."
        aria-invalid={Boolean(errors.body)}
        aria-describedby={
          errors.body
            ? "comment-body-error"
            : undefined
        }
        className={cn(
          "w-full resize-none rounded-lg",
          "border border-zinc-800 bg-zinc-900/50",
          "px-4 py-3 text-sm text-zinc-100",
          "outline-none transition-colors",
          "placeholder:text-zinc-600",
          "focus:border-emerald-500",
          errors.body &&
            "border-red-500 focus:border-red-500",
        )}
        {...register("body")}
      />

      {errors.body?.message && (
        <p
          id="comment-body-error"
          className="mt-2 text-sm text-red-400"
        >
          {errors.body.message}
        </p>
      )}

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "rounded-md bg-emerald-300",
            "px-4 py-2",
            "text-sm font-medium text-zinc-950",
            "transition-colors",
            "hover:bg-emerald-200",
            "disabled:cursor-not-allowed",
            "disabled:opacity-50",
          )}
        >
          {
            isSubmitting
              ? "Commenting..."
              : "Comment"
          }
        </button>
      </div>
    </form>
  );
}

export default CommentForm;

"use client"

import InputField from "@/app/components/ui/forms/input-field";
import SelectField from "@/app/components/ui/forms/select-field";
import TagInput from "@/app/components/ui/forms/tag-input";
import { APP_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/general/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPost } from "../actions/create-post";
import { updatePost } from "../actions/update-post";
import { PostFormData, postSchema } from "../schemas/post.schema";
import { Post } from "../types";
import { PostEditor } from "./post-editor/post-editor";

type PostFormProps = {
  post?: Post
}

function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      status: post?.status ?? "draft",
      tags: post?.tags ?? [],
      content: post?.content ?? undefined,
    }
  })

  const coverImage = watch("coverImage");
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const file = coverImage?.[0];

    if (!file) {
      setCoverImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setCoverImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [coverImage]);

  async function onSubmit(postData: PostFormData) {
    const result = post
      ? await updatePost(post.slug, postData)
      : await createPost(postData);
  
    if (!result.success) {
      const messages = Object.values(
        result.errors,
      ).flat();
  
      toast.error(
        post
          ? "Post update failed"
          : "Post creation failed",
        {
          description: messages
            .map((error) => error.message)
            .join("\n"),
        },
      );
  
      return;
    }
  
    toast.success(
      result.meta?.message ??
        (post
          ? "Post updated successfully"
          : "Post created successfully"),
    );
  
    router.push(APP_ROUTES.posts.index);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 space-y-6"
    >
      <InputField
        id="title"
        label="Title"
        placeholder="e.g. Understanding Rails Transactions"
        error={errors.title?.message}
        {...register("title")}
      />

      <InputField
        id="slug"
        label="Slug (optional)"
        placeholder="e.g. understanding-rails-transactions"
        error={errors.slug?.message}
        {...register("slug")}
      />

      <SelectField
        id="status"
        label="Status"
        defaultValue="draft"
        options={[
          {
            label: "Draft",
            value: "draft",
          },
          {
            label: "Published",
            value: "published",
          }
        ]}
        error={errors.status?.message}
        {...register("status")}
      />

      <div
        className="group space-y-2"
        data-invalid={Boolean(errors.coverImage)}
      >
        <label
          htmlFor="cover-image"
          className={cn(
            "block text-sm font-medium text-zinc-200",
            "group-data-[invalid=true]:text-red-400",
          )}
        >
          Cover image
        </label>

        <label
          htmlFor="cover-image"
          className={cn(
            "flex min-h-36 cursor-pointer flex-col items-center justify-center",
            "overflow-hidden rounded-md border border-dashed border-zinc-700",
            "transition-colors hover:border-zinc-500 hover:bg-zinc-900/40",
            "group-data-[invalid=true]:border-red-500",
          )}
        >
          {coverImagePreview ? (
            <img
              src={coverImagePreview}
              alt="Cover image preview"
              className="h-64 w-full object-cover"
            />
          ) : (
            <>
              <ImageIcon className="mb-3 size-8 text-zinc-400" />

              <span className="text-sm text-zinc-300">
                Drop an image here or click to upload
              </span>

              <span className="mt-1 text-xs text-zinc-500">
                PNG, JPG, WebP · max 5 MB
              </span>
            </>
          )}

          <input
            id="cover-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            {...register("coverImage")}
          />
        </label>

        {errors.coverImage?.message && (
          <p
            id="cover-image-error"
            className="text-sm text-red-400"
          >
            {errors.coverImage.message}
          </p>
        )}
      </div>

      <div
        className="group space-y-2"
        data-invalid={Boolean(errors.excerpt)}
      >
        <label
          htmlFor="excerpt"
          className={cn(
            "block text-sm font-medium text-zinc-200",
            "group-data-[invalid=true]:text-red-400",
          )}
        >
          Excerpt
        </label>

        <textarea
          id="excerpt"
          rows={3}
          placeholder="A short summary of your post..."
          aria-invalid={Boolean(errors.excerpt)}
          aria-describedby={
            errors.excerpt ? "excerpt-error" : undefined
          }
          className={cn(
            "w-full rounded-md border border-zinc-800 bg-transparent",
            "px-3 py-2.5 text-sm text-zinc-100 outline-none transition",
            "placeholder:text-zinc-600 focus:border-emerald-400",
            "resize-none",
            "group-data-[invalid=true]:border-red-500",
            "group-data-[invalid=true]:focus:border-red-500",
            "group-data-[invalid=true]:focus:ring-red-500",
          )}
          {...register("excerpt")}
        />

        {errors.excerpt?.message && (
          <p
            id="excerpt-error"
            className="text-sm text-red-400"
          >
            {errors.excerpt.message}
          </p>
        )}
      </div>

      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState }) => (
          <TagInput
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <div
            className="group space-y-2"
            data-invalid={fieldState.invalid}
          >
            <label
              className={cn(
                "block text-sm font-medium text-zinc-200",
                "group-data-[invalid=true]:text-red-400",
              )}
            >
              Content
            </label>

            <PostEditor
              value={field.value}
              onChange={field.onChange}
              invalid={fieldState.invalid}
            />

            {fieldState.error?.message && (
              <p className="text-sm text-red-400">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="flex items-center justify-between pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "rounded-md bg-emerald-300 px-5 py-2.5",
            "text-sm font-medium text-zinc-950",
            "transition-colors hover:bg-emerald-200",
          )}
        >
          {
            isSubmitting
              ? post
                ? "Updating..."
                : "Publishing..."
              : post
                ? "Update"
                : "Publish"
          }
        </button>
      </div>
    </form>
  )
}

export default PostForm

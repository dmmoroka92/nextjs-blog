import { getPost } from "@/features/posts/actions/get-post"
import PostForm from "@/features/posts/components/post-form"
import { notFound } from "next/navigation"

type PostEditProps = {
  params: Promise<{
    slug: string
  }>
}

async function PostEdit({ params }: PostEditProps) {
  const { slug } = await params

  const result = await getPost({ slug })

  if (!result.success || !result.data) {
    notFound()
  }

  const post = result.data

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
        Edit post
      </h1>

      <PostForm post={post} />
    </div>
  );
}

export default PostEdit
import PostForm from "@/features/posts/components/post-form";

function NewPostPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
        Create a new post
      </h1>

      <PostForm />
    </div>
  );
}

export default NewPostPage;

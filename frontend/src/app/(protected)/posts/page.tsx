import Pagination from "@/features/pagination/components/pagination";
import { getPosts } from "@/features/posts/actions/get-posts";
import PostPreview from "@/features/posts/components/post-preview";
import SearchBar from "@/features/posts/components/search-bar";
import TagFilters from "@/features/posts/components/tag-filters";

type PostsIndexProps = {
  searchParams: Promise<{
    page?: string;
    tags?: string | string[],
    search?: string
  }>
};

async function PostsIndex({
  searchParams
}: PostsIndexProps) {
  const {
    page,
    tags: rawTags,
    search
  } = await searchParams;
  
  const currentPage = Number(page) || 1;
  
  const tags = rawTags
    ? Array.isArray(rawTags)
      ? rawTags
      : [rawTags]
    : [];

  const getPostsResult = await getPosts({
    page: currentPage,
    tags,
    search
  })

  if (!getPostsResult.success) {
    return (
      <p className="text-sm text-red-400">
        Failed to load posts.
      </p>
    );
  }

  const posts = getPostsResult.data;
  const pagination = getPostsResult.meta?.pagination;
  const popularTags = getPostsResult?.meta?.popularTags ?? []

  return (
    <div className="w-full">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          My Posts
        </h1>

        <p className="text-sm text-zinc-400">
          Manage your published posts and drafts.
        </p>
      </header>

      <div className="mt-8">
        <div className="flex flex-col gap-4">
          <SearchBar />

          <TagFilters tags={popularTags} />
        </div>

        <div className="mt-6 divide-y divide-zinc-800">
          {posts.map((post) => (
            <PostPreview
              key={post.id}
              {...post}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination pagination={pagination} />
        </div>
      </div>
    </div>
  );
}

export default PostsIndex;

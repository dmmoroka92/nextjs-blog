import { getPostStats } from "@/features/posts/actions/get-post-stats";
import PostStats from "@/features/posts/components/post-stats";
import RecentPosts from "@/features/posts/components/recent-posts";
import { DashboardHeader } from "../components/dashboard/dashboard-header";

async function DashboardPage() {
  const result = await getPostStats();

  if (!result.success) {
    return (
      <p className="text-sm text-red-400">
        Failed to load dashboard.
      </p>
    );
  }

  const {
    stats,
    recentPosts
  } = result.data;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <DashboardHeader />

        <PostStats stats={stats} />

        <RecentPosts posts={recentPosts} />
      </div>
    </div>
  );
}

export default DashboardPage

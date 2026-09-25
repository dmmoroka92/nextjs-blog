import { API_ROUTES } from "@/constants/routes"
import { ApiResponse, PaginationMeta } from "@/features/auth/types/api"
import { apiFetch } from "@/lib/api/client"
import { PostStat } from "../components/post-stats"
import { RecentPost } from "../components/recent-posts"

type DashboardStats = {
  stats: PostStat[];
  recentPosts: RecentPost[];
}

export function getPostStats(): Promise<
  ApiResponse<DashboardStats, PaginationMeta>
> {
  return apiFetch<DashboardStats, PaginationMeta>(
    API_ROUTES.dashboard.show,
  )
}
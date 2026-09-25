module Api
  module V1
    class DashboardsController < ApplicationController
      RECENT_POSTS_NUM = 5

      def show
        dashboard = DashboardStats.new(
          id: current_user.id,
          stats: post_statistics,
          recent_posts: recent_posts
        )

        render json: DashboardSerializer.new(
          dashboard
        ).serializable_hash,
          status: :ok
      end

      private

      def posts
        @posts ||= current_user.posts
      end

      def recent_posts
        @recent_posts ||=
          posts
            .order(created_at: :desc)
            .limit(RECENT_POSTS_NUM)
      end

      def post_statistics
        [
          PostStat.new(
            label: "Total posts",
            value: posts.count
          ),
          
          PostStat.new(
            label: "Published",
            value: posts.published.count
          ),
          
          PostStat.new(
            label: "Drafts",
            value: posts.draft.count
          ),
          
          PostStat.new(
            label: "Total likes",
            value: 0
          )
        ]
      end
    end
  end
end

class DashboardSerializer
  include JSONAPI::Serializer

  set_type :dashboard

  attribute :stats do |dashboard|
    dashboard.stats.map(&:to_h)
  end

  attribute :recent_posts do |dashboard|
    dashboard.recent_posts.map do |post|
      {
        id: post.id,
        title: post.title,
        slug: post.slug,
        status: post.status,
        created_at: post.created_at
      }
    end
  end
end

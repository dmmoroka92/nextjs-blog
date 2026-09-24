module Posts
  class IndexQuery
    POSTS_PER_PAGE = 5

    def self.call(relation:, params:)
      new(relation:, params:).call
    end

    def initialize(relation:, params:)
      @relation = relation
      @params = params
    end

    def call
      posts = relation

      if params[:tags].present?
        posts = filter_by_tags(posts:)
      end

      if params[:search].present?
        posts = filter_by_search(query: params[:search], posts:)
      end

      posts
        .order(created_at: :desc)
        .page(params[:page])
        .per(limited_per_page)
    end

    private

    attr_reader :relation, :params

    def limited_per_page
      per_page = [
        params.fetch(:per, POSTS_PER_PAGE).to_i,
        25
      ].min
    end

    def filter_by_tags(posts:)
      Array(params[:tags]).reduce(posts) do |relation, tag|
        relation.tagged_with(tag)
      end
    end

    def filter_by_search(query:, posts:)
      query = ActiveRecord::Base.sanitize_sql_like(query.strip)
    
      posts.where(
        <<~SQL.squish,
          title LIKE :query
          OR JSON_SEARCH(content, 'all', :query) IS NOT NULL
        SQL
        query: "%#{query}%"
      )
    end
  end
end
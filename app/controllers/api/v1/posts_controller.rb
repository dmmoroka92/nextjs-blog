module Api
  module V1
    class PostsController < ApplicationController
      def index
        posts = Posts::IndexQuery.call(
          relation: current_user.posts,
          params:
        )
      
        render json: PostSerializer.new(
          posts,
          meta: {
            popular_tags: Post.popular_tags.map(&:name),
            pagination: pagination_meta(posts)
          }
        ).serializable_hash,
        status: :ok
      end

      def show

      end

      def create
        post = current_user.posts.new(post_params)
        
        if post.save
          render json: PostSerializer.new(
          post,
            include: [:user],
            meta: { message: "Post created successfully" }
          ).serializable_hash,
          status: :created
        else
          render json: {
            meta: {
              errors: post.errors
            }
          }, status: :unprocessable_entity
        end
      end

      def update

      end

      def destroy

      end

      private

      def post_params
        params.require(:post).permit(
          :title,
          :slug,
          :status,
          :excerpt,
          :cover_image,
          content: {},
          tag_list: []
        )
      end
    end
  end
end

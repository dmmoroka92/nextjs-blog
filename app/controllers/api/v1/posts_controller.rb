module Api
  module V1
    class PostsController < ApplicationController
      def index
        posts = Post.page(params[:page]).per(5)

        serialized_hash =  PostSerializer.new(
          posts,
          meta: {
            pagination: pagination_meta(posts)
          }
        ).serializable_hash
      
        Rails.logger.debug serialized_hash.inspect
        render json: serialized_hash,
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
        )
      end
    end
  end
end

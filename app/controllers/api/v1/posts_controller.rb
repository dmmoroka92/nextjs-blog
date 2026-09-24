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
        post = current_user.posts.find_by!(slug: params[:slug])

        render json: PostSerializer.new(
          post,
          include: [:user]
        ).serializable_hash,
        status: :ok  
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
        permitted = params.require(:post).permit(
          :title,
          :slug,
          :status,
          :excerpt,
          :cover_image,
          :content,
          tag_list: []
        )
        
        permitted[:content] = parse_content(permitted[:content])

        permitted
      end

      def parse_content(content)
        return if content.blank?
      
        JSON.parse(content)
      end
    end
  end
end

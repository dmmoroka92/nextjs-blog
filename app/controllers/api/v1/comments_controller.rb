class Api::V1::CommentsController < ApplicationController
  before_action :set_post
  before_action :set_comment, only: %i[update destroy]

  def index
    render json: CommentSerializer.new(
      @post.comments.order(created_at: :desc),
      include: [:user]
    ).serializable_hash,
    status: :ok
  end

  def create
    comment = @post.comments.new(comment_params)
    comment.user = current_user
    
    if comment.save
      render json: CommentSerializer.new(
        comment,
        include: [:user],
        meta: {
          message: "Comment was created successfully"
        }
      ).serializable_hash,
      status: :created
    else
      render json: {
        meta: {
          errors: comment.errors.to_hash
        }
      }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: CommentSerializer.new(
        @comment,
        include: [:user],
        meta: {
          message: "Comment was updated successfully"
        }
      ).serializable_hash,
      status: :ok
    else
      render json: {
        meta: {
          errors: @comment.errors.to_hash
        }
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @comment.destroy
      render json: {
        data: nil,
        meta: {
          message: "Comment was destroyed successfully"
        }
      }, status: :ok
    else
      render json: {
        meta: {
          errors: @comment.errors.to_hash
        }
      }, status: :unprocessable_entity
    end
  end

  private

  def set_post
    @post = current_user.posts.find_by!(
      slug: params[:post_slug]
    )
  end

  def set_comment
    @comment = @post.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end

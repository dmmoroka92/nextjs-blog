class CommentSerializer
  include JSONAPI::Serializer
  
  attributes :body, :created_at

  belongs_to :user
  belongs_to :post
end

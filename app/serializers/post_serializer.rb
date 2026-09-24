class PostSerializer
  include JSONAPI::Serializer
  
  attributes(
    :slug,
    :title,
    :excerpt,
    :status,
    :content,
    :created_at
  )
    
  attribute :cover_image_url do |post|
    if post.cover_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(
        post.cover_image
      )
    end
  end

  attribute :tags do |post|
    post.tag_list
  end

  belongs_to :user
end

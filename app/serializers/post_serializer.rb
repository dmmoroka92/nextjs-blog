class PostSerializer
  include JSONAPI::Serializer
  
  attributes :title,
             :slug,
             :excerpt,
             :status,
             :content,
             :created_at
    
  attribute :cover_image_url do |post|
    if post.cover_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(
        post.cover_image,
        only_path: true
      )
    end
  end

  belongs_to :user
end

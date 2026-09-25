class Post < ApplicationRecord
  acts_as_taggable_on :tags
  
  IMAGE_SIZE_MEGABYTES = 5
  IMAGE_TYPES = %w[jpeg png webp].freeze

  enum :status, {
    draft: 0,
    published: 1,
    archived: 2
  }

  before_validation :generate_slug, on: :create

  validates :title, :slug, presence: true
  validates :slug, uniqueness: true
  validates :content, presence: true, if: :published?

  validate :cover_image_type
  validate :cover_image_size


  belongs_to :user
  has_many :comments, dependent: :destroy
  has_one_attached :cover_image

  scope :popular_tags, ->(limit = 6) do
    tag_counts
      .order(taggings_count: :desc)
      .limit(limit)
  end

  private

  def generate_slug
    return if slug.present?

    self.slug = I18n.transliterate(
      title,
      locale: I18n.locale
    ).parameterize
  end

  def cover_image_type
    return unless cover_image.attached?

    content_types = IMAGE_TYPES.map { |type| "image/#{type}" }

    return if cover_image.blob.content_type.in?(content_types)

    errors.add(
      :cover_image,
      "must be a #{IMAGE_TYPES.map(&:upcase).join(", ")} image"
    )
  end

  def cover_image_size
    return unless cover_image.attached?
    
    if cover_image.blob.byte_size > IMAGE_SIZE_MEGABYTES.megabytes
      errors.add(:cover_image, "must be smaller than #{IMAGE_SIZE_MEGABYTES} MB")
    end
  end
end

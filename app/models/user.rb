class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :validatable

  before_validation :normalize_username       

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username,
          presence: true,
          uniqueness: { case_sensitive: false },
          length: { in: 3..30 },
          format: {
            with: /\A[a-zA-Z0-9_]+\z/,
            message: "can only contain letters, numbers, and underscores"
          }

  private
  
  def normalize_username
    self.username = username.&strip&.downcase
  end
end

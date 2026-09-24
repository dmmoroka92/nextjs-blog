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
              with: /\A[a-z0-9_]+\z/,
              message: "can only contain lowercase letters, numbers, and underscores"
            }
  validates :password,
            format: {
              with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_).+\z/,
              message: "must contain an uppercase letter, lowercase letter, number, and underscore"
            },
            allow_nil: true      
            
  has_many :posts, dependent: :destroy
  has_many :issued_refresh_tokens, dependent: :delete_all          

  private
  
  def normalize_username
    self.username = username&.strip&.downcase
  end
end

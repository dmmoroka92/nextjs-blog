class UserSerializer
  include JSONAPI::Serializer
  
  attributes :first_name,
             :last_name,
             :username, 
             :email,
             :password,
             :password_confirmation

  has_many :comments           
end

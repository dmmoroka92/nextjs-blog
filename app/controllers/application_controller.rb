class ApplicationController < ActionController::API
  before_action :authenticate_user!

  def authenticate_user!
    token = bearer_token
    payload = Auth::TokenDecoder.call(token:)
    
    return unauthorized unless payload["type"] == "access"
  
    @current_user = User.find(payload["sub"])
  rescue JWT::ExpiredSignature
    unauthorized(api_error: Errors::Auth::EXPIRES_ACCESS_TOKEN)
  rescue JWT::DecodeError,
         ActiveRecord::RecordNotFound
    unauthorized(api_error: Errors::Auth::INVALID_ACCESS_TOKEN)
  end

  def bearer_token
    request.headers["Authorization"]&.split&.last
  end

  def unauthorized(api_error:)
    render json: {
      meta: {
        errors: {
          auth: [api_error]
        }
      }
    }, status: :unauthorized
  end

  private

  attr_reader :currnet_user
end


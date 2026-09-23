module Errors
  module Auth
    INVALID_CREDENTIALS = Errors::ApiError.new(
      code: "invalid_credentials",
      message: "Invalid email or password"
    )

    INVALID_REFRESH_TOKEN = Errors::ApiError.new(
      code: "invalid_refresh_token",
      message: "Invalid refresh token"
    )

    EXPIRED_REFRESH_TOKEN = Errors::ApiError.new(
      code: "expired_refresh_token",
      message: "Expired refresh token"
    )

    EXPIRES_ACCESS_TOKEN = Errors::ApiError.new(
      code: "expired_access_token",
      message: "Access token expired"
    )

    INVALID_ACCESS_TOKEN = Errors::ApiError.new(
      code: "invalid_access_token",
      message: "Invalid access token"
    )
  end
end
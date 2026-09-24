module Auth
  class RefreshToken
    Result = Data.define(:payload, :errors) do
      def success?
        errors.empty?
      end
    end

    def self.call(token:)
      new(token:).call
    end

    def initialize(token:)
      @token = token
    end

    def call
      payload = Auth::TokenDecoder.call(token:)
      
      unless payload["type"] == "refresh"
        return failure_result(api_error: Errors::Auth::INVALID_REFRESH_TOKEN)
      end

      rotate_token(payload)
    rescue JWT::ExpiredSignature
      failure_result(api_error: Errors::Auth::EXPIRED_REFRESH_TOKEN)
    rescue JWT::DecodeError
      failure_result(api_error: Errors::Auth::INVALID_REFRESH_TOKEN)
    end

    private

    attr_reader :token

    def rotate_token(payload)
      IssuedRefreshToken.transaction do
        issued_token = token_by_payload(payload)

        unless issued_token&.active?
          return failure_result(
            api_error: Errors::Auth::INVALID_REFRESH_TOKEN
          )
        end

        issued_token.revoke!

        tokens = TokenIssuer.call(user: issued_token.user)

        success_result(tokens:)
      end
    end

    def token_by_payload(payload)
      IssuedRefreshToken.lock.find_by(
        jti: payload["jti"],
        user_id: payload["sub"]
      )
    end

    def failure_result(api_error:)
      Result.new(
        payload: nil,
        errors: {
          auth: [api_error]
        }
      )
    end

    def success_result(tokens:)
      Result.new(
        payload: {
          auth: {
            access_token: tokens.access,
            refresh_token: tokens.refresh
          }
        },
        errors: {}
      )
    end
  end
end

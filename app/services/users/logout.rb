module Users
  class Logout
    def self.call(token:)
      new(token:).call
    end

    def initialize(token:)
      @token = token
    end

    def call
      payload = Auth::TokenDecoder.call(token:)

      issued_token = IssuedRefreshToken.find_by(
        jti: payload["jti"],
        user_id: payload["sub"]
      )

      issued_token&.revoke!
    end

    private

    attr_reader :token
  end
end

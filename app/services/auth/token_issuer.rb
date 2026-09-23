module Auth
  class TokenIssuer
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXP_TIME = 1.minute
    REFRESH_TOKEN_EXP_TIME = 30.days

    Tokens = Data.define(
      :access,
      :refresh
    )

    def self.call(user:)
      new(user:).call
    end

    def initialize(user:)
      @user = user
    end

    def call
      Tokens.new(
        access: issue_access_token,
        refresh: issue_refresh_token
      )
    end

    private

    attr_reader :user

    def payload_for(type:, exp:)
      {
        sub: user.id,
        jti: SecureRandom.uuid,
        iat: Time.current.to_i,
        exp: exp.from_now.to_i,
        type:
      }
    end

    def issue_access_token
      JWT.encode(
        payload_for(
          type: "access",
          exp: ACCESS_TOKEN_EXP_TIME
        ),
        secret,
        ALGORITHM
      )
    end

    def issue_refresh_token
      payload = payload_for(
        type: "refresh",
        exp: REFRESH_TOKEN_EXP_TIME
      )

      token = JWT.encode(
        payload,
        secret,
        ALGORITHM
      )

      IssuedRefreshToken.create!(
        jti: payload[:jti],
        expires_at: Time.at(payload[:exp]),
        user_id: user.id
      )

      token
    end

    def secret
      ENV.fetch("HMAC_SECRET")
    end
  end
end
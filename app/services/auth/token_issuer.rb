module Auth
  class TokenIssuer
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXP_TIME = 15.minutes
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
      JWT.encode(
        payload_for(
          type: "refresh",
          exp: REFRESH_TOKEN_EXP_TIME
        ),
        secret,
        ALGORITHM
      )
    end

    def secret
      ENV.fetch("HMAC_SECRET")
    end
  end
end
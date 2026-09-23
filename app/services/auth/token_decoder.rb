module Auth
  class TokenDecoder
    ALGORITHM = "HS256"

    def self.call(token:)
      new(token:).call
    end

    def initialize(token:)
      @token = token
    end

    def call
      payload, _header = JWT.decode(
        token,
        ENV.fetch("HMAC_SECRET"),
        true,
        algorithm:  ALGORITHM
      )

      payload
    end

    private

    attr_reader :token
  end
end

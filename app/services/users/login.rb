module Users
  class Login
    Result = Data.define(:payload, :errors) do
      def success?
        errors.empty?
      end
    end

    def self.call(params:)
      new(params:).call
    end

    def initialize(params:)
      @params = params
    end

    def call
      user = User.find_by(email: params[:email])

      unless user&.valid_password?(params[:password])
        return failure_result
      end

      tokens = Auth::TokenIssuer.call(user:)

      Result.new(
        payload: {
          user:,
          auth: {
            access_token: tokens.access,
            refresh_token: tokens.refresh
          }
        },
        errors: {}
      )
    end

    private

    attr_reader :params

    def failure_result
      Result.new(
        payload: nil,
        errors: {
          base: ["Invalid email or password"]
        }
      )
    end
  end
end

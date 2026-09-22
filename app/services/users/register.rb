module Users
  class Register
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
      user = User.create!(params)
      
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
    rescue ActiveRecord::RecordInvalid => e
      failure_result(errors: e.record.errors.to_hash)
    end

    private

    attr_reader :params

    def failure_result(errors:)
      Result.new(
        payload: nil,
        errors:
      )
    end
  end
end
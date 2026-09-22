module Api
  module V1
    class SessionsController < ApplicationController
      def create
        result = Users::Login.call(params: login_params)

        if result.success?
          render json: UserSerializer.new(
            result.payload[:user],
            meta: {
              auth: result.payload[:auth]
            }
          ).serializable_hash,
          status: :ok
        else
          render json: {
            meta: {
              errors: result.errors
            }
          },
          status: :unauthorized
        end
      end

      private
      
      def login_params
        params.expect(user: %i[email password])
      end
    end
  end
end

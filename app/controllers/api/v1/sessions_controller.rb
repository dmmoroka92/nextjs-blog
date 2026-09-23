module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user!, except: %i[me]

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

      def refresh
        result = Auth::RefreshToken.call(token: bearer_token)

        if result.success?
          render json: {
            meta: {
              auth: result.payload[:auth]
            }
          }, status: :ok
        else
          render json: {
            meta: {
              errors: result.errors
            }
          }, status: :unauthorized 
        end
      end

      def me
        render json: UserSerializer.new(current_user).serializable_hash
      end

      private
      
      def login_params
        params.expect(user: %i[email password])
      end
    end
  end
end

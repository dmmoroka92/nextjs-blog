module Api
  module V1
    class RegistrationsController < ApplicationController
      def create
        result = Users::Register.call(params: registration_params)

        if result.success?
          render json: UserSerializer.new(
            result.payload[:user],
            meta: {
              auth: result.payload[:auth]
            }
          ).serializable_hash,
           status: :created
        else
          render json: {
            meta: {
              errors: result.errors.to_hash
            }
          },
          status: :unprocessable_entity
        end
      end

      private

      def registration_params
        params.expect(
          user: [
            :first_name,
            :last_name,
            :username,
            :email,
            :password,
            :password_confirmation
          ]
        )
      end
    end
  end
end

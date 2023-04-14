# frozen_string_literal: true

module Users
  class ConfirmationsController < Devise::ConfirmationsController
    protect_from_forgery with: :null_session

    respond_to :json

    def show
      self.resource = resource_class.confirm_by_token(params[:confirmation_token])
      yield resource if block_given?

      if resource.errors.empty?
        redirect_to "/login?confirmed=true"
      else
        render json: { message: resource.errors.full_messages.first }, status: :unprocessable_entity
      end
    end
  end
end

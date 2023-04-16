# frozen_string_literal: true

module Users
  class ConfirmationsController < Devise::ConfirmationsController

    respond_to :json

    def show
      self.resource = resource_class.confirm_by_token(params[:confirmation_token])
      yield resource if block_given?

      if resource.errors.empty?
        redirect_to "/sign_in?confirmed=true"
      else
        redirect_to "/sign_in?confirmed=#{resource.errors.full_messages.first}"
      end
    end
  end
end

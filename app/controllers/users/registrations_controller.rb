# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    before_action :authenticate_user!, only: [:update, :destroy]

    respond_to :json

    def create
      build_resource(sign_up_params)

      resource.save
      yield resource if block_given?
      if resource.persisted?
        if resource.active_for_authentication?
          sign_up(resource_name, resource)
          respond_with resource, location: after_sign_up_path_for(resource)
        else
          expire_data_after_sign_in!
          respond_with resource, location: after_inactive_sign_up_path_for(resource)
        end
      else
        clean_up_passwords resource
        set_minimum_password_length
        respond_with resource
      end
    end

    def update
      current_user.unconfirmed_email = nil if user_params[:email] == current_user.email
      if current_user.update_with_password(user_params)
        respond_with current_user
      else
        set_minimum_password_length
        render json: { message: resource.errors.full_messages.first }, status: :unprocessable_entity
      end
    end

    def destroy
      current_user.destroy!
      head :no_content
    end

    private

    def respond_with(resource, _opts = {})
      register_success && return if resource.persisted?

      register_failed
    end

    def register_success
      render json: resource, status: :created
    end

    def register_failed
      render json: { message: resource.errors.full_messages.first }, status: :unprocessable_entity
    end

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :current_password)
    end
  end
end

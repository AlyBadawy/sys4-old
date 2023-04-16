# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    respond_to :json

    # GET /resource/password/edit?reset_password_token=abcdef
    def edit
      self.resource = resource_class.new
      set_minimum_password_length
      resource.reset_password_token = params[:reset_password_token]
      redirect_to "/reset_password?reset_password_token=#{params[:reset_password_token]}"
    end

    # POST /resource/password
    def create
      self.resource = resource_class.send_reset_password_instructions(resource_params)
      yield resource if block_given?

      if successfully_sent?(resource)
        render json: { message: "Password Instruction sent to your email" }, status: :created
      else
        render json: { message: "Something went wrong!" }, status: :unprocessable_entity
      end
    end
    
    # PUT /resource/password
    def update
      self.resource = resource_class.reset_password_by_token(resource_params)
      yield resource if block_given?

      if resource.errors.empty?
        resource.unlock_access! if unlockable?(resource)
        render json: { message: "Password changed!" }, status: :created
      else
        set_minimum_password_length
        render json: { message: resource.errors.full_messages.first }, status: :unprocessable_entity
      end
    end

  end
end
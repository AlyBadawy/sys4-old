# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    private

    def respond_with(resource, _opts = {})
      resource.allowlisted_jwts.last&.update(agent: user_agent, ip: request.ip, location: location, device_type: request.device_variant)
      render json: current_user, status: :ok
    end

    def respond_to_on_destroy
      log_out_success && return if current_user

      log_out_failure
    end

    def log_out_success
      render json: { message: "You are logged out." }, status: :ok
    end

    def log_out_failure
      render json: { message: "Hmm nothing happened." }, status: :unauthorized
    end

    def user_agent
      if request.os == "UNKNOWN"
        "Unknwon client! Probably a toaster."
      end
      "#{request.os} #{request.os_version} • #{request.browser} #{request.browser_version}"
    end

    def location
      loc = Geocoder.search(request.ip).first
      return unless loc.city && loc.country && loc.region

      "#{loc.city}, #{loc.region}, #{loc.country}"
    end
  end
end

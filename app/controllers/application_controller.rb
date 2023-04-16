# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, if: :json_request?
  
  before_action :set_paper_trail_whodunnit

  def user_for_paper_trail
    return current_admin_user.id if try(:current_admin_user)
    return current_user.id if try(:current_user)

    "Unknown user"
  end

  protected

  def json_request?
    request.format.json?
  end
end

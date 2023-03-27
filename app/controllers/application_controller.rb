# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_paper_trail_whodunnit

  def user_for_paper_trail
    return current_admin_user.id if try(:current_admin_user)
    return current_user.id if try(:current_user)

    "Unknown user"
  end
end

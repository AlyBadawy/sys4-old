# frozen_string_literal: true

class Request < ApplicationRecord
  belongs_to :user, class_name: "Account"
  belongs_to :request_end_point

  validate :can_make_request?

  private

  def can_make_request?(time_frame: 15.minutes)
    return if user&.can_make_request?(time_frame: time_frame)

    errors.add(:base, "You have reached your request limit")
    throw(:abort)
  end
end

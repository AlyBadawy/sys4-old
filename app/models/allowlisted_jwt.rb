# frozen_string_literal: true

class AllowlistedJwt < ApplicationRecord
  belongs_to :user, class_name: "Account"

  scope :active, -> { where("exp > ?", Time.zone.now) }
  scope :expired, -> { where("exp <= ?", Time.zone.now) }
  scope :old, -> { where("exp <= ?", 1.month.ago) }
end

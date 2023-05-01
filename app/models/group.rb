# frozen_string_literal: true

class Group < ApplicationRecord
  has_paper_trail

  # rubocop:disable Rails/HasAndBelongsToMany
  has_and_belongs_to_many :accounts
  # rubocop:enable Rails/HasAndBelongsToMany

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :max_requests, presence: true

  def users
    accounts.where(type: "User")
  end

  def admin_users
    accounts.where(type: "AdminUser")
  end
end

# frozen_string_literal: true

class Account < ApplicationRecord
  has_paper_trail ignore: [:reset_password_token,
                           :reset_password_sent_at,
                           :remember_created_at,
                           :sign_in_count,
                           :current_sign_in_at,
                           :last_sign_in_at,
                           :current_sign_in_ip,
                           :last_sign_in_ip,
                           :confirmation_token,
                           :confirmed_at,
                           :confirmation_sent_at,
                           :unconfirmed_email,
                           :failed_attempts,
                           :unlock_token,
                           :locked_at,
                           :created_at,
                           :updated_at]

  # rubocop:disable Rails/HasAndBelongsToMany
  has_and_belongs_to_many :groups
  # rubocop:enable Rails/HasAndBelongsToMany

  validates :email, presence: true,
                    format: /\A\S+@\S+\z/,
                    uniqueness: { case_sensitive: false }
end

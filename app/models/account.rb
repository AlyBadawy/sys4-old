# frozen_string_literal: true

class Account < ApplicationRecord
  has_paper_trail

  # rubocop:disable Rails/HasAndBelongsToMany
  has_and_belongs_to_many :groups
  # rubocop:enable Rails/HasAndBelongsToMany

  validates :email, presence: true,
                    format: /\A\S+@\S+\z/,
                    uniqueness: { case_sensitive: false }
end

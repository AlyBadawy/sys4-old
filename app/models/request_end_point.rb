# frozen_string_literal: true

class RequestEndPoint < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :max_requests, presence: true

  has_many :requests, dependent: :destroy, inverse_of: :request_end_point
end

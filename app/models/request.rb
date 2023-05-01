# frozen_string_literal: true

class Request < ApplicationRecord
  belongs_to :user, class_name: "Account"
  belongs_to :request_end_point
end

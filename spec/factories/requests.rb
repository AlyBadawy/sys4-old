# frozen_string_literal: true

FactoryBot.define do
  factory :request do
    user { create(:user) }
    request_end_point { create(:request_end_point) }
    data { "" }
  end
end

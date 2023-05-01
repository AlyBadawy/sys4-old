# frozen_string_literal: true

FactoryBot.define do
  factory :request_end_point do
    name { "MyString" }
    description { "MyString" }
    max_requests { 10 }
  end
end

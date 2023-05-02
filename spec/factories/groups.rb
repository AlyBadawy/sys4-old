# frozen_string_literal: true

FactoryBot.define do
  factory :group do
    name { Faker::Alphanumeric.alpha(number: 10) }
    max_requests { 10 }
  end
end

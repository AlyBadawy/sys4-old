# frozen_string_literal: true

FactoryBot.define do
  factory :group do
    name { Faker::Lorem.word }
    max_requests { 10 }
  end
end

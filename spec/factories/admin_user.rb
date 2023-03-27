# frozen_string_literal: true

FactoryBot.define do
  factory :admin_user do
    email { Faker::Internet.email }
    password { "passW0rd" }
  end
end

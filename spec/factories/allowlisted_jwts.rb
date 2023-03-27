# frozen_string_literal: true

FactoryBot.define do
  factory :allowlisted_jwt do
    jti { "MyString" }
    aud { "MyString" }
    exp { "2030-03-18 16:07:12" }
    user { create(:user) }
  end
end

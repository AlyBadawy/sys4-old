FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { "passW0rd" }
  end
end

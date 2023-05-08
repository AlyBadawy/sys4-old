# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"

gem "rails", "~> 7.0.4", ">= 7.0.4.3"

gem "activeadmin"
gem "amazing_print"
gem "bootsnap", require: false
gem "devise"
gem "devise-jwt"
gem "flipper"
gem "flipper-active_record"
gem "flipper-ui"
gem "geocoder"
gem "hashdiff"
gem "jbuilder"
gem "newrelic_rpm"
gem "paper_trail"
gem "pg", "~> 1.1"
gem "puma", "~> 5.0"
gem "rack-cors"
gem "rack-user_agent"
gem "rails_semantic_logger"
gem "sassc"
gem "sprockets-rails"
gem "stimulus-rails"
gem "tailwindcss-rails", "~> 2.0"
gem "turbo-rails"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

gem "capistrano", "~> 3.11"
gem "capistrano-passenger", "~> 0.2.0"
gem "capistrano-rails", "~> 1.4"
gem "capistrano-rbenv", "~> 2.1", ">= 2.1.4"

gem "bcrypt_pbkdf"
gem "ed25519"

group :development, :test do
  gem "capybara"
  gem "database_cleaner"
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "faker"
  gem "pry-byebug"
  gem "pry-rails"
  gem "rspec-rails"
  gem "shoulda-matchers"
end

group :development do
  gem "bullet"
  gem "fasterer"
  gem "overcommit"
  gem "rubocop"
  gem "rubocop-config-prettier"
  gem "rubocop-performance"
  gem "rubocop-rails"
  gem "rubocop-rspec"
end

group :test do
  gem "brakeman"
  gem "bundle-audit"
  gem "selenium-webdriver"
  gem "simplecov"
  gem "webdrivers"
end


# Use Redisadapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

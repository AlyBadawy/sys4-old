# frozen_string_literal: true

class AdminUser < Account
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable
end

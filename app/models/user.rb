# frozen_string_literal: true

class User < Account
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end

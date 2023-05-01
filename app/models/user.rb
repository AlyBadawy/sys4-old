# frozen_string_literal: true

class User < Account
  include Devise::JWT::RevocationStrategies::Allowlist
  include Flipper::Identifier

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable, :timeoutable, :confirmable,
         :lockable,
         :jwt_authenticatable, jwt_revocation_strategy: AllowlistedJwt

  self.skip_session_storage = [:http_auth, :params_auth]

  has_many :requests, dependent: :destroy, inverse_of: :user

  def jwt_payload
    { "Provider" => "SYS4" }
  end

  def flipper_id
    id
  end

  def to_json(*args)
    { id: id, email: email, firstName: first_name, lastName: last_name, createdAt: created_at, updatedAt: updated_at, unconfirmedEmail: unconfirmed_email }.to_json(*args)
  end
end

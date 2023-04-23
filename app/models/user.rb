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

  def jwt_payload
    { "Provider" => "SYS4" }
  end

  def flipper_id
    id
  end
end

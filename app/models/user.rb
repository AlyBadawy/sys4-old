# frozen_string_literal: true

class User < Account
  include Devise::JWT::RevocationStrategies::Allowlist
  include Flipper::Identifier

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable, :timeoutable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  self.skip_session_storage = [:http_auth, :params_auth]

  has_many :allowlisted_jwt, dependent: :destroy

  validates :email, presence: true,
                    format: /\A\S+@\S+\z/,
                    uniqueness: { case_sensitive: false }

  def jwt_payload
    { "Provider" => "SYS4" }
  end

  def flipper_id
    id
  end
end

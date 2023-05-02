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

  def max_requests
    return 0 unless confirmed_at

    groups.map(&:max_requests).max || 0
  end

  def used_requests(time_frame: 15.minutes)
    requests.where("created_at > ?", Time.current - time_frame).count
  end

  def can_make_request?(time_frame: 15.minutes)
    used_requests(time_frame: time_frame) < max_requests
  end
end

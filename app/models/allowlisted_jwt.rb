# frozen_string_literal: true

class AllowlistedJwt < ApplicationRecord
  belongs_to :user, class_name: "Account"

  scope :active, -> { where("exp > ?", Time.zone.now) }
  scope :expired, -> { where("exp <= ?", Time.zone.now) }
  scope :old, -> { where("exp <= ?", 1.month.ago) }

  def self.jwt_revoked?(jwt_payload, user)
    jwt = user.allowlisted_jwts.find_by(jti: jwt_payload["jti"])
    return true unless jwt

    !jwt.valid
  end

  def self.revoke_jwt(payload, user)
    jwt = user.allowlisted_jwts.find_by(payload.slice("jti", "aud"))
    jwt&.update(exp: Time.zone.now)
  end

  def valid
    exp > Time.zone.now
  end
end

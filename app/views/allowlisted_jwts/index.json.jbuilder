# frozen_string_literal: true

json.array! @allowlisted_jwts, partial: "allowlisted_jwts/allowlisted_jwt", as: :allowlisted_jwt, current_jti: @current_jti

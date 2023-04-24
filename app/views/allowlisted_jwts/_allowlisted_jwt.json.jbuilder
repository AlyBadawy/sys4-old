# frozen_string_literal: true

json.extract! allowlisted_jwt, :id, :exp, :agent, :ip, :location, :valid, :jti
json.deviceType allowlisted_jwt.device_type
json.createdAt allowlisted_jwt.created_at
json.url allowlisted_jwt_url(allowlisted_jwt, format: :json)
json.current current_jti == allowlisted_jwt.jti

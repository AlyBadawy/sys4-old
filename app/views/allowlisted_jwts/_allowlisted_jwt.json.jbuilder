# frozen_string_literal: true

json.extract! allowlisted_jwt, :id, :created_at, :exp, :agent, :ip, :location
json.url allowlisted_jwt_url(allowlisted_jwt, format: :json)

# frozen_string_literal: true

require "rails_helper"

RSpec.describe AllowlistedJwtsController do
  describe "routing" do
    it "routes to #index" do
      expect(get: "api/account/allowlisted_jwts").to route_to("allowlisted_jwts#index", format: :json)
    end

    it "routes to #show" do
      expect(get: "api/account/allowlisted_jwts/1").to route_to("allowlisted_jwts#show", id: "1", format: :json)
    end

    it "routes to #create" do
      expect(post: "api/account/allowlisted_jwts").not_to route_to("allowlisted_jwts#create", format: :json)
    end

    it "routes to #update via PUT" do
      expect(put: "api/account/allowlisted_jwts/1").to route_to("allowlisted_jwts#update", id: "1", format: :json)
    end

    it "routes to #update via PATCH" do
      expect(patch: "api/account/allowlisted_jwts/1").to route_to("allowlisted_jwts#update", id: "1", format: :json)
    end

    it "routes to #destroy" do
      expect(delete: "api/account/allowlisted_jwts/1").to route_to("allowlisted_jwts#destroy", id: "1", format: :json)
    end
  end
end

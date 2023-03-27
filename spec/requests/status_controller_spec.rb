# frozen_string_literal: true

require "rails_helper"

RSpec.describe StatusController do
  describe "GET /ok" do
    it "returns http success" do
      get "/api/status/ok"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /user" do
    it "returns http success when user is signed in" do
      user = create(:user)
      sign_in user
      get "/api/status/user"
      expect(response).to have_http_status(:success)
    end

    it "returns http success when JWT header is present" do
      user = create(:user)
      headers = { "Accept" => "application/json",
                  "Content-Type" => "application/json",
                  "JWT-AUD" => "test" }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
      get "/api/status/user", headers: auth_headers

      expect(response).to have_http_status(:success)
    end

    it "returns http unauthorized when user is not signed in" do
      get "/api/status/user"
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "GET /me" do
    it "returns http success when user is signed in" do
      user = create(:user)
      sign_in user
      get "/api/account/me"
      expect(response).to have_http_status(:success)
      expect(response.body).to eq(user.to_json)
    end

    it "returns http success when JWT header is present" do
      user = create(:user)
      headers = { "Accept" => "application/json",
                  "Content-Type" => "application/json",
                  "JWT-AUD" => "test" }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
      get "/api/account/me", headers: auth_headers
      expect(response).to have_http_status(:success)
    end

    it "returns http unauthorized when user is not signed in" do
      get "/api/account/me"
      expect(response).to have_http_status(:unauthorized)
    end
  end
end

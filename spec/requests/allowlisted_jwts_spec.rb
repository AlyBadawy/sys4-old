# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/allowlisted_jwts" do
  let(:user) {
    create(:user)
  }

  let(:valid_attributes) {
    { jti: "jti",
      aud: "test",
      exp: 3.days.from_now,
      user: user,
      agent: "some agent",
      ip: "127.0.0.1",
      location: "unknown" }
  }

  describe "GET /index" do
    it "renders a successful response" do
      AllowlistedJwt.create! valid_attributes
      user.confirm
      sign_in user
      headers = { "Accept" => "application/json",
                  "Content-Type" => "application/json",
                  "JWT-AUD" => "test" }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
      get allowlisted_jwts_url, headers: auth_headers
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      allowlisted_jwt = AllowlistedJwt.create! valid_attributes
      user.confirm
      sign_in user
      headers = { "Accept" => "application/json",
                  "Content-Type" => "application/json",
                  "JWT-AUD" => "test" }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)

      get allowlisted_jwt_url(allowlisted_jwt), headers: auth_headers
      expect(response).to be_successful
    end
  end

  describe "PATCH /update" do
    it "updates the requested allowlisted_jwt" do
      allowlisted_jwt = AllowlistedJwt.create! valid_attributes
      user.confirm
      sign_in user
      headers = { "Accept" => "application/json",
                  "Content-Type" => "application/json",
                  "JWT-AUD" => "test" }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)

      patch allowlisted_jwt_url(allowlisted_jwt), headers: auth_headers, as: :json
      allowlisted_jwt.reload
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to match(a_string_including("application/json"))

      res = JSON.parse(response.body)
      expect(res["exp"] <= Time.zone.now).to be_truthy
    end
  end

  describe "DELETE /destroy" do
    it "returns a successful status with no content" do
      allowlisted_jwt = AllowlistedJwt.create! valid_attributes
      user.confirm
      sign_in user
      headers = { "Accept" => "application/json",
                  "Content-Type" => "application/json",
                  "JWT-AUD" => "test" }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
      delete allowlisted_jwt_url(allowlisted_jwt), headers: auth_headers, as: :json
      expect(response).to have_http_status(:no_content)
    end

    it "destroys the requested allowlisted_jwt" do
      allowlisted_jwt = AllowlistedJwt.create! valid_attributes
      user.confirm
      sign_in user
      headers = { "Accept" => "application/json",
                  "Content-Type" => "application/json",
                  "JWT-AUD" => "test" }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
      expect {
        delete allowlisted_jwt_url(allowlisted_jwt), headers: auth_headers, as: :json
      }.to change(AllowlistedJwt, :count).by(-1)
    end
  end
end

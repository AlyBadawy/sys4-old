# frozen_string_literal: true

require "rails_helper"

RSpec.describe AllowlistedJwt do
  describe "associations" do
    subject(:allowlisted_jwt) { build(:allowlisted_jwt) }

    it "has many associations" do
      expect(allowlisted_jwt).to belong_to(:user)
    end
  end
end

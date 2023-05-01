# frozen_string_literal: true

require "rails_helper"

RSpec.describe Request do
  describe "associations" do
    subject(:request) { build(:request) }

    it "belongs to a user" do
      expect(request).to belong_to(:user)
    end

    it "belongs to a request_end_point" do
      expect(request).to belong_to(:request_end_point)
    end
  end
end

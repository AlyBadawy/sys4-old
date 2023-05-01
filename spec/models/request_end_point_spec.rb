# frozen_string_literal: true

require "rails_helper"

RSpec.describe RequestEndPoint do
  it "is valid with valid attributes" do
    req = create(:request_end_point)
    expect(req).to be_valid
  end

  describe "validations" do
    subject(:request_end_point) { build(:request_end_point) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:max_requests) }
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
  end

  describe "associations" do
    subject(:request_end_point) { build(:request_end_point) }

    it "has many associations" do
      expect(request_end_point).to have_many(:requests)
    end
  end
end

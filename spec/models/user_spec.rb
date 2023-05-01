# frozen_string_literal: true

require "rails_helper"

RSpec.describe User do
  it "is valid with valid attributes" do
    user1 = create(:user)
    expect(user1).to be_valid
  end

  it "is not valid without a password" do
    user2 = build(:user, password: nil)
    expect(user2).not_to be_valid
  end

  describe "validations" do
    subject(:user) { build(:user) }

    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  end

  describe "associations" do
    subject(:user) { build(:user) }

    it "has many associations" do
      expect(user).to have_many(:allowlisted_jwts)
    end

    it "has and belongs to many associations" do
      expect(user).to have_and_belong_to_many(:groups)
    end

    it "has many requests" do
      expect(user).to have_many(:requests)
    end
  end

  describe "secure password" do
    before do
      @user = build(:user)
    end

    describe "when password doesn't match confirmation" do
      before { @user.password_confirmation = "mismatch" }

      it { is_expected.not_to be_valid }
    end

    describe "with a password that's too short" do
      before { @user.password = @user.password_confirmation = "a" * 5 }

      it { is_expected.to be_invalid }
    end
  end

  describe "#valid_password" do
    before do
      @user = build(:user)
      @user.save
    end

    let(:found_user) { described_class.find_by(email: @user.email) }

    it "returns true for valid passwords" do
      expect(found_user.valid_password?(@user.password)).to be(true)
    end

    it "returns false for invalid passwords" do
      expect(found_user.valid_password?("invalid")).to be(false)
    end
  end

  describe "#max_requests" do
    before(:each) do
      group1 = create(:group, max_requests: 10)
      group2 = create(:group, max_requests: 20)
      @user = create(:user, groups: [group1, group2])
    end

    it "returns the max requests of the user's groups" do
      @user.confirm
      expect(@user.max_requests).to eq(20)
    end

    it "returns zero if user is not confirmed" do
      expect(@user.max_requests).to eq(0)
    end
  end

  describe "#used_requests(3.minutes)" do
    before(:each) do
      group1 = create(:group, max_requests: 10)
      group2 = create(:group, max_requests: 20)
      @user = create(:user, groups: [group1, group2])
      @user.confirm
      @rep = create(:request_end_point, max_requests: 50)
      create_list(:request, 5, user: @user, request_end_point: @rep)
    end

    it "returns the used requests of the user" do
      expect(@user.used_requests).to eq(5)
    end

    it "returns the used requests of the user in the last 3 minutes" do
      expect(@user.used_requests(time_frame: 3.minutes)).to eq(5)
      travel 2.minutes
      create_list(:request, 3, user: @user, request_end_point: @rep)
      expect(@user.used_requests(time_frame: 3.minutes)).to eq(8)
      travel 2.minutes
      expect(@user.used_requests(time_frame: 3.minutes)).to eq(3)
      travel 2.minutes
      expect(@user.used_requests(time_frame: 3.minutes)).to eq(0)
    end
  end

  describe "#can_make_request?(3.minutes)" do
    before(:each) do
      group1 = create(:group, max_requests: 10)
      group2 = create(:group, max_requests: 20)
      @user = create(:user, groups: [group1, group2])
      @user.confirm
      @rep = create(:request_end_point, max_requests: 50)
      create_list(:request, 5, user: @user, request_end_point: @rep)
    end

    it "returns a boolean of user's ability to make requests" do
      expect(@user.can_make_request?).to be(true)
      create_list(:request, 15, user: @user, request_end_point: @rep)
      expect(@user.can_make_request?).to be(false)
    end

    it "returns a boolean of user's ability to make requests based on timeframe" do
      expect(@user.can_make_request?(time_frame: 3.minutes)).to be(true)
      travel 2.minutes
      create_list(:request, 15, user: @user, request_end_point: @rep)
      expect(@user.can_make_request?(time_frame: 3.minutes)).to be(false)
      travel 2.minutes
      expect(@user.can_make_request?(time_frame: 3.minutes)).to be(true)
    end
  end
end

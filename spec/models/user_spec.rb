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
end

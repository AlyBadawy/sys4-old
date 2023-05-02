# frozen_string_literal: true

require "rails_helper"

RSpec.describe Group do
  it "is valid with valid attributes" do
    group1 = create(:group)
    expect(group1).to be_valid
  end

  describe "validations" do
    subject(:group) { build(:group) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:max_requests) }
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
  end

  describe "associations" do
    subject(:group) { build(:group) }

    it "has and belongs to many associations" do
      expect(group).to have_and_belong_to_many(:accounts)
    end
  end

  describe "#users" do
    it "returns all users in the group" do
      group = create(:group)

      user1 = create(:user)
      user2 = create(:user)
      admin_user1 = create(:admin_user)
      admin_user2 = create(:admin_user)

      user1.groups << group
      user2.groups << group
      admin_user1.groups << group
      admin_user2.groups << group
      expect(group.users).to eq([user1, user2])
    end
  end

  describe "#admin_users" do
    it "returns all admin_users in the group" do
      group = create(:group)

      user1 = create(:user)
      user2 = create(:user)
      admin_user1 = create(:admin_user)
      admin_user2 = create(:admin_user)

      user1.groups << group
      user2.groups << group
      admin_user1.groups << group
      admin_user2.groups << group
      expect(group.admin_users).to eq([admin_user1, admin_user2])
    end
  end
end

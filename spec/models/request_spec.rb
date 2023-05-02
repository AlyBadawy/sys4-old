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

  describe "callbacks" do
    describe "can_make_request is called before create" do
      before do
        group1 = create(:group, max_requests: 10)
        group2 = create(:group, max_requests: 20)
        @user = create(:user, groups: [group1, group2])
        @user.confirm
        @rep = create(:request_end_point, max_requests: 50)
        create_list(:request, 20, user: @user, request_end_point: @rep)
      end

      it "sets can_make_request to false if user has reached max requests" do
        expect(@user.can_make_request?).to be(false)
        req = build(:request, user: @user)

        expect(req.save).to be(false)
      end

      it "sets can_make_request to false if user has reached max requests within time limit" do
        req = build(:request, user: @user)
        expect(req.save).to be(false)
        travel 20.minutes
        expect(req.save).to be(true)
      end
    end
  end
end

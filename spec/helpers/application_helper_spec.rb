# frozen_string_literal: true

require "rails_helper"

describe ApplicationHelper do
  let(:current_user) { create(:user) }

  it "generates user json" do
    json = helper.user_json(current_user)
    parsed = nil

    expect { parsed = JSON.parse(json) }.not_to raise_error
    expect(parsed["id"]).to eq(current_user.id)
    expect(parsed["email"]).to eq(current_user.email)
  end

  it "generates Flipper json" do
    Flipper.enable(:test_feature)
    Flipper.enable(:second_test_feature, current_user)
    Flipper.enable(:third_test_feature, create(:user))

    json = helper.flippers_json(current_user)
    parsed = nil

    expect { parsed = JSON.parse(json) }.not_to raise_error
    expect(parsed["test_feature"]).to be true
    expect(parsed["second_test_feature"]).to be true
    expect(parsed["third_test_feature"]).to be false
    expect(parsed["fake_test_feature"]).to be_nil
  end

  it "generates Flipper json when user is not defined" do
    Flipper.enable(:test_feature)
    Flipper.enable(:second_test_feature, current_user)

    json = helper.flippers_json(nil)
    parsed = nil

    expect { parsed = JSON.parse(json) }.not_to raise_error
    expect(parsed["test_feature"]).to be true
    expect(parsed["second_test_feature"]).to be false
    expect(parsed["fake_test_feature"]).to be_nil
  end
end

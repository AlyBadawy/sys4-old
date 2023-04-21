# frozen_string_literal: true

require "rails_helper"

RSpec.describe "react/index.html.erb" do
  it "renders the page" do
    render
    expect(rendered).to match('<div id="root" />')
  end
end

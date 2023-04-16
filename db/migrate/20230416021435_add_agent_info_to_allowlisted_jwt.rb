# frozen_string_literal: true

class AddAgentInfoToAllowlistedJwt < ActiveRecord::Migration[7.0]
  def change
    change_table :allowlisted_jwts, bulk: true do |t|
      t.column :agent, :string
      t.column :ip, :string
      t.column :location, :string
    end
  end
end

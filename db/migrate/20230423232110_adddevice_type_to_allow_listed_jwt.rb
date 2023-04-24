# frozen_string_literal: true

class AdddeviceTypeToAllowListedJwt < ActiveRecord::Migration[7.0]
  def change
    change_table :allowlisted_jwts, bulk: true do |t|
      t.column :device_type, :string
    end
  end
end

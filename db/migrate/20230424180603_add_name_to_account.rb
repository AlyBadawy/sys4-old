# frozen_string_literal: true

class AddNameToAccount < ActiveRecord::Migration[7.0]
  def change
    change_table :accounts, bulk: true do |t|
      t.column :first_name, :string
      t.column :last_name, :string
    end
  end
end

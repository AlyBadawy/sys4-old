# frozen_string_literal: true

class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups, id: :uuid do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :groups, :name, unique: true
  end
end

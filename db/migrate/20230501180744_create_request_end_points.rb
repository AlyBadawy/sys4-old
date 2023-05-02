# frozen_string_literal: true

class CreateRequestEndPoints < ActiveRecord::Migration[7.0]
  def change
    create_table :request_end_points, id: :uuid do |t|
      t.string :name, null: false
      t.string :description
      t.integer :max_requests, default: 0

      t.timestamps
    end
    add_index :request_end_points, :name, unique: true
  end
end

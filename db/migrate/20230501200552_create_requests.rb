# frozen_string_literal: true

class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests, id: :uuid do |t|
      t.references :user, null: false, foreign_key: { to_table: :accounts }, type: :uuid
      t.references :request_end_point, null: false, foreign_key: true, type: :uuid
      t.jsonb :data

      t.timestamps
    end
  end
end

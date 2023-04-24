# frozen_string_literal: true

class CreateAccountGroup < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts_groups, id: false do |t|
      t.belongs_to :account, null: false, foreign_key: true, type: :uuid
      t.belongs_to :group, null: false, foreign_key: true, type: :uuid
    end
    add_index :accounts_groups, [:account_id, :group_id]
  end
end

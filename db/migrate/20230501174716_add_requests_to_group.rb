# frozen_string_literal: true

class AddRequestsToGroup < ActiveRecord::Migration[7.0]
  def change
    add_column :groups, :max_requests, :integer, default: 0
  end
end

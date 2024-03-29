# frozen_string_literal: true

# This migration adds the optional `object_changes` column, in which PaperTrail
# will store the `changes` diff for each update event. See the readme for
# details.
class AddObjectChangesToVersions < ActiveRecord::Migration[7.0]
  def change
    add_column :versions, :object_changes, :jsonb
  end
end

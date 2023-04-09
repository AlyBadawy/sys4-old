# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength
ActiveAdmin.register Group do
  menu priority: 3, parent: "Account"

  permit_params :name, :description

  action_item :new, only: :show do
    link_to("New Group", new_resource_path)
  end

  index do
    selectable_column
    column :id
    column :name
    column :description
    column :users do |group|
      group.users.count
    end
    column :admins do |group|
      group.admin_users.count
    end
    actions
  end

  filter :name

  form do |f|
    f.inputs "Group Details" do
      f.input :name
      f.input :description
    end
    f.actions
  end

  show do
    tabs do
      tab "Group Details" do
        attributes_table do
          row :id
          row :name
          row :description
          row :users do |group|
            group.users.count
          end
          row :admins do |group|
            group.admin_users.count
          end
          row :created_at
          row :updated_at
        end
      end
      tab "Group Versions" do
        panel "Group Versions" do
          table_for group.versions do
            column :id
            column :whodunnit
            column :created_at
            column :object_changes
          end
        end
      end
      tab "Users" do
        panel "Users" do
          table_for group.users do
            column :id
            column :email
            column :user_link do |user|
              link_to "View", admin_user_path(user)
            end
          end
        end
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength

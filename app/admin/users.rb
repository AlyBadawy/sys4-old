# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength
ActiveAdmin.register User do
  menu priority: 2, parent: "Account"

  permit_params :email, :password, :password_confirmation, group_ids: []

  controller do
    def update
      permitted_params[:user][:group_ids] = permitted_params[:user][:group_ids]&.delete("")
      super
    end
  end

  config.filters = false

  action_item :new, only: :show do
    link_to("New Admin", new_resource_path)
  end

  sidebar "New User" do
    div { "To add a new user, click on 'New Admin' button above, fill in the user email, passowrd and password confirmation when prompeted to do so. Then, click on 'Create user'." }
    div { "Note, Always consider using a strong password." }
  end
  sidebar "View a User details" do
    div { "From the menu above, click on 'Users', you will get a list of all current users, next to each user, you will find links to view, edit or delete a user. use the 'view' link next to the user you wish to view; This will bring that editor information." }
  end
  sidebar "Delete a User" do
    div { "From the menu above, click on 'Users', you will get a list of all current users, next to each user, you will find links to view, edit or delete a user. use the 'delete' link next to the user you wish to delete, to delete that user." }
  end

  index do
    selectable_column
    column :id
    column :email
    column :current_sign_in_at
    column :current_sign_in_ip do |user|
      if user.current_sign_in_ip
        link_to user.current_sign_in_ip, "http://who.is/whois-ip/ip-address/#{user.current_sign_in_ip}", target: "_blank", rel: "noopener"
      else
        status_tag "no", label: "Never signed in before"
      end
    end
    column :sign_in_count
    actions
  end

  form do |f|
    f.inputs "User Details" do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :groups, as: :check_boxes
    end
    f.actions
  end

  show do
    attributes_table do
      row :id
      row :email
      row :current_sign_in_at
      row :current_sign_in_ip do |user|
        if user.current_sign_in_ip
          link_to user.current_sign_in_ip, "http://who.is/whois-ip/ip-address/#{user.current_sign_in_ip}", target: "_blank", rel: "noopener"
        else
          status_tag "no", label: "Never signed in before"
        end
      end
      row :last_sign_in_at
      row :last_sign_in_ip do |user|
        if user.last_sign_in_ip
          link_to user.last_sign_in_ip, "http://who.is/whois-ip/ip-address/#{user.last_sign_in_ip}", target: "_blank", rel: "noopener"
        else
          status_tag "no", label: "Never signed in before"
        end
      end
      row :failed_attempts
      row :created_at
      row :updated_at
    end
    panel "Grpups" do
      table_for user.groups do
        column :id
        column :name
        column :description
        column "Group Link" do |group|
          link_to "View", admin_group_path(group)
        end
      end
    end
    panel "User Versions" do
      table_for user.versions do
        column :id
        column :whodunnit
        column :created_at
        column :object_changes
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength

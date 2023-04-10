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
    column :groups
    actions
  end

  form do |f|
    f.inputs "User Details" do
      f.input :email
      f.input :password if f.object.new_record?
      f.input :password_confirmation if f.object.new_record?
      f.input :groups, as: :check_boxes
    end
    f.actions
  end

  show do
    tabs do
      tab "User Details" do
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
          row :sessions do |_user|
            link_to "Sessions", admin_user_allowlisted_jwts_path(resource)
          end
          row :created_at
          row :updated_at
        end
      end
      tab "User Groups" do
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
      end
      tab "User Versions" do
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
  end
end
# rubocop:enable Metrics/BlockLength

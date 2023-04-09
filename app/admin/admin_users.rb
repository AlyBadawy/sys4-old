# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength
ActiveAdmin.register AdminUser do
  menu priority: 1, parent: "Account"

  permit_params :email, :password, :password_confirmation

  config.filters = false

  index do
    selectable_column
    column :id
    column :email
    column :current_sign_in_at
    column :current_sign_in_ip do |au|
      if au.current_sign_in_ip
        link_to au.current_sign_in_ip, "http://who.is/whois-ip/ip-address/#{au.current_sign_in_ip}", target: "_blank", rel: "noopener"
      else
        status_tag "no", label: "Never signed in before"
      end
    end
    column :sign_in_count
    actions
  end

  form do |f|
    f.inputs "Admin Details" do
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

  show do
    tabs do
      tab "Admin Details" do
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
      end
      tab "Groups" do
        panel "Grpups" do
          table_for admin_user.groups do
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
          table_for admin_user.versions do
            column :id
            column :whodunnit_email do |v|
              if v.whodunnit
                Account.find(v.whodunnit).email
              else
                status_tag "no", label: "Unknown"
              end
            end
            column :whodunnit_type do |v|
              if v.whodunnit
                Account.find(v.whodunnit).type == "AdminUser" ? "Admin" : "User"
              else
                status_tag "no", label: "Unknown"
              end
            end
            column :created_at
            column :object_changes
          end
        end
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength

# frozen_string_literal: true

ActiveAdmin.register User do
  menu priority: 2, parent: "Account"

  permit_params :email, :password, :password_confirmation

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
    column :last_sign_in_at
    column :last_sign_in_ip do |au|
      if au.last_sign_in_ip
        link_to au.last_sign_in_ip, "http://who.is/whois-ip/ip-address/#{au.last_sign_in_ip}", target: "_blank", rel: "noopener"
      else
        status_tag("Never signed in before", class: "no")
      end
    end
    actions
  end

  form do |f|
    f.inputs "User Details" do
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
end

# frozen_string_literal: true

ActiveAdmin.setup do |config|
  config.site_title = "SYS4.dev"
  config.site_title_link = "/"
  config.default_namespace = :admin
  config.authentication_method = :authenticate_admin_user!
  config.current_user_method = :current_admin_user
  config.logout_link_path = :destroy_admin_user_session_path
  config.comments = false
  config.batch_actions = true
  config.filter_attributes = [:encrypted_password, :password, :password_confirmation]
  config.localize_format = :long

  config.namespace :admin do |admin|
    admin.build_menu do |menu|
      menu.add label: "Settings", priority: 900 do |settings|
        settings.add label: "Flipper",
                     url: "/admin/flipper",
                     html_options: { target: :blank }
      end
      menu.add label: "External", priority: 1000 do |sites|
        sites.add label: "Github Project",
                  url: "https://github.com/orgs/sys4-dev/projects/2/views/1",
                  html_options: { target: :blank },
                  priority: 1001
        sites.add label: "Github Repository",
                  url: "https://github.com/sys4-dev/sys4",
                  html_options: { target: :blank },
                  priority: 1002
        sites.add label: "Github Wiki",
                  url: "https://github.com/sys4-dev/sys4/wiki",
                  html_options: { target: :blank },
                  priority: 1003
        sites.add label: "<hr disabled>".html_safe,
                  url: "javascript:void(0)",
                  priority: 1004
        sites.add label: "Aly Badawy",
                  url: "https://alybadawy.com",
                  html_options: { target: :blank },
                  priority: 1005
      end
    end
  end
end

module NamespaceWithoutComments
  def register(resource_class, options = {}, &)
    super unless resource_class == ActiveAdmin::Comment
  end
end

module ActiveAdmin
  class Namespace
    prepend NamespaceWithoutComments
  end
end

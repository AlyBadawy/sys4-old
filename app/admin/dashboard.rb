# frozen_string_literal: true

ActiveAdmin.register_page "Dashboard" do
  menu priority: 0, label: proc { I18n.t("active_admin.dashboard") }

  sidebar "Dashboard" do
    h4 { "What is the dashboard?" }
    div { "The dashboard is your friend. Use the dashboard to find any errors in your website's content; or to have a quick overall look into the different aspects of both the Website and the CMS." }
    div { "Also, you may use the dashboard to quickly navigate to other area in the CMS." }
  end
  sidebar "More help?" do
    div { "If you have any questions about using this software, please feel free to contact:" }
    div { b { "Aly Badawy" } }
    div { link_to "https://alybadawy.com", "alybadawy.com" }
  end

  content title: proc { I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Latest Admin Users" do
          if User.all.count.zero?
            div { "No Users found!" }
          else
            table_for AdminUser.last(5) do
              column :id
              column :email
            end
          end
        end
      end
      column do
        panel "Latest users" do
          if User.all.count.zero?
            div { "No Users found!" }
          else
            table_for User.last(5) do
              column :id
              column :email
            end
          end
        end
      end
    end
  end
end

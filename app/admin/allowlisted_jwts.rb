# frozen_string_literal: true

ActiveAdmin.register AllowlistedJwt do
  belongs_to :user

  actions :index, :show, :destroy

  config.filters = false

  index do
    selectable_column
    id_column
    column :agent
    column :location
    column :ip do |resource|
      if resource.ip
        link_to resource.ip, "http://who.is/whois-ip/ip-address/#{resource.ip}", target: "_blank", rel: "noopener"
      else
        status_tag "no", label: "No IP address"
      end
    end
    column :created_at
    column "Valid" do |resource|
      resource.exp < Time.zone.now ? (status_tag "no", labebl: "Expired") : (status_tag "yes", labebl: "Valid")
    end
    actions
  end
end

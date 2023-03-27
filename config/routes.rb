# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope :api, defaults: { format: :json } do
    devise_for :users,
               controllers: {
                 sessions: "users/sessions",
                 registrations: "users/registrations",
               }

    get "/status/ok", to: "status#ok"
    get "/status/user", to: "status#user"

    get "/account/me", to: "status#me"
  end

  root "react#index"
  get "*path", to: "react#index"
end

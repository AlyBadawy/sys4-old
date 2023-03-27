# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users

  scope :api, defaults: { format: :json } do
    devise_for :users,
               controllers: {
                 sessions: "users/sessions",
                 registrations: "users/registrations",
               }
  end

  root "react#index"
  get "*path", to: "react#index"
end

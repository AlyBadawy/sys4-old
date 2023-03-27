# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users
  root "react#index"
  get "*path", to: "react#index"
end

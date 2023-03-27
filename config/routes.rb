# frozen_string_literal: true

Rails.application.routes.draw do
  root "react#index"
  get "*path", to: "react#index"
end

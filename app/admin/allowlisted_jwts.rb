# frozen_string_literal: true

ActiveAdmin.register AllowlistedJwt do
  belongs_to :user

  actions :index, :show, :destroy

  config.filters = false
end

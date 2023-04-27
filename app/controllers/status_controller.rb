# frozen_string_literal: true

class StatusController < ApplicationController
  before_action :authenticate_user!, only: [:user, :me]

  def ok
    render json: { status: "ok" }
  end

  def user
    render json: current_user
  end

  def me
    render json: current_user
  end
end

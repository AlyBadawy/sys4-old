# frozen_string_literal: true

class AllowlistedJwtsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_allowlisted_jwt, only: %i[ show update destroy ]

  # GET /allowlisted_jwts
  # GET /allowlisted_jwts.json
  def index
    @allowlisted_jwts = current_user.allowlisted_jwts.order(created_at: :desc)
    @current_jti = current_jti
  end

  # GET /allowlisted_jwts/1
  # GET /allowlisted_jwts/1.json
  def show
    @current_jti = current_jti
  end

  # PATCH/PUT /allowlisted_jwts/1
  # PATCH/PUT /allowlisted_jwts/1.json
  def update
    @allowlisted_jwt.update(exp: Time.zone.now)
    render :show, status: :ok, location: @allowlisted_jwt
  end

  # DELETE /allowlisted_jwts/1
  # DELETE /allowlisted_jwts/1.json
  def destroy
    @allowlisted_jwt.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_allowlisted_jwt
    @allowlisted_jwt = current_user.allowlisted_jwts.find(params[:id])
  end
end

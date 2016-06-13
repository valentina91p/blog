class SessionsController < ApplicationController

  skip_before_action :ensure_login, only: [:new, :create]
  def new
  end

  def create
    user = User.find_by(username: params[:user][:username])
    if !user.nil? && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "¡Bienvenido!"
    else
      redirect_to login_path, alert: "Tu contraseña o usuario es incorrecto"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path, notice: "Logged out successfully!"
  end
end

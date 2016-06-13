Rails.application.routes.draw do
	root to: "posts#index"
	resources :posts
	resources :users, only: [:new, :create]
	resources :sessions, only: [:new, :create, :destroy]
	get "/login" => "sessions#new", as: "login"
  	delete "/logout" => "sessions#destroy", as: "logout"
  	post "/crear_comentario/:post_id" => "comments#create", as: "create_comment"
end

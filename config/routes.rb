Rails.application.routes.draw do
	scope '/api' do
    	mount_devise_token_auth_for 'User', at: 'auth'
		resources :posts, only: [:create, :index, :show] do
			resources :comments, only: [:index,:create]
		end
		resources :users, only: [:create]
		resources :sessions, only: [:create, :destroy]
	end
	root to: "application#index"
end

Rails.application.routes.draw do
	scope '/api' do
    	mount_devise_token_auth_for 'User', at: 'auth'
		resources :posts, only: [:create, :index, :show] do
			resources :comments, only: [:index,:create]
		end
		resources :users, only: [:create]
	end
	root to: "application#index"
end

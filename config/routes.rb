Rails.application.routes.draw do
	mount_devise_token_auth_for 'User', at: '/api/auth', controllers: {
	  omniauth_callbacks: 'overrides/omniauth_callbacks'
	}
	scope '/api' do
		resources :posts, only: [:create, :index, :show] do
			resources :comments, only: [:index,:create]
		end
		resources :users, only: [:create]
	end
	root to: "application#index"
end

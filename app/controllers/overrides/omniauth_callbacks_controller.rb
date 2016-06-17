module Overrides
	class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
		def assign_provider_attrs(user, auth_hash)
			user.assign_attributes({
				name:     auth_hash['info']['name'],
				email:    auth_hash['info']['email']
			})
	    end
	end
end
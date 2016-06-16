class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable, :omniauthable
  include DeviseTokenAuth::Concerns::User
	has_many :posts
	has_many :comments
	validates :username, presence: true, length: { maximum: 30 }
	#validates :password, presence: true
end

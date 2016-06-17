class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable, :omniauthable
  include DeviseTokenAuth::Concerns::User
	has_many :posts
	has_many :comments
	validates :name, presence: true, length: { maximum: 150 }
	#validates :password, presence: true
end

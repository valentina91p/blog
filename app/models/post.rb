class Post < ActiveRecord::Base
  belongs_to :author, class_name: "User"
  has_many :comments
  validates :title, presence: true, length: { maximum: 300 }
  validates :content, presence: true
end

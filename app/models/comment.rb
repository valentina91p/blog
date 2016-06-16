class Comment < ActiveRecord::Base
  belongs_to :author, class_name: "User"
  belongs_to :post
  validates :content, presence: true, length: { maximum: 500 }
  validates :anonymous, presence: true, length: { maximum: 20 }
end

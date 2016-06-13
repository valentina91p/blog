class Comment < ActiveRecord::Base
  belongs_to :autor, class_name: "User"
  belongs_to :post
  validates :contenido, presence: true
end

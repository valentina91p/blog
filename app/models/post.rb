class Post < ActiveRecord::Base
  belongs_to :autor, class_name: "User"
  has_many :comments
  validates :titulo, :contenido, presence: true
end

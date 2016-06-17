class Comment < ActiveRecord::Base
  belongs_to :author, class_name: 'User'
  belongs_to :post
  validates :content, presence: true, length: { maximum: 500 }
  validates :anonymous, length: { maximum: 25 }
  validates_presence_of :anonymous, if: 'author.blank?'
end

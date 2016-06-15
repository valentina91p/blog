class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.references :author, index: true, foreign_key: true
      t.references :post, index: true, foreign_key: true
      t.string :anonymous

      t.timestamps null: false
    end
  end
end

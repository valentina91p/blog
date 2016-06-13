class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :titulo
      t.text :contenido
      t.date :fecha
      t.references :autor, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end

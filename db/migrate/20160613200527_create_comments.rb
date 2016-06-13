class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :contenido
      t.date :fecha
      t.references :autor, index: true, foreign_key: true
      t.references :post, index: true, foreign_key: true
      t.string :anonimo

      t.timestamps null: false
    end
  end
end

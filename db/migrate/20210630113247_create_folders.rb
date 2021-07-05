class CreateFolders < ActiveRecord::Migration[5.2]
  def change
    create_table :folders do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :started, null: false
      t.integer :parent_folder

      t.timestamps
    end
  end
end

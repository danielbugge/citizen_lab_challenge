class CreateProjectTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :project_topics do |t|
      t.references :topic
      t.references :project
      t.timestamps
    end
  end
end

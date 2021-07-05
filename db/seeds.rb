# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json'

sample_data_file = File.read('db/sample_data.json')
sample_data_hash = JSON.parse(sample_data_file)

sample_data_hash['topics'].each do |topic|
  Topic.create!(title: topic['title'])
end

sample_data_hash['folders'].each do |folder|
  print folder
  Folder.create!(
    title: folder['title'],
    description: folder['description'],
    started: folder['started'],
    parent_folder: folder['folder']
  )
end

sample_data_hash['projects'].each do |project|
  project_object = Project.create!(
    title: project['title'],
    description: project['description'],
    started: project['started'],
    cost: project['cost'],
    folder_id: project['folder']
  )

  project['topics'].each do |topic|
    ProjectTopic.create!(
      topic: Topic.find_by_id(topic),
      project: project_object
    )
  end
end

class ProjectTopic < ApplicationRecord
  belongs_to :project
  belongs_to :topic
end

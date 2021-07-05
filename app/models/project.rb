class Project < ApplicationRecord
  belongs_to :folder
  has_many :project_topics
  has_many :topics, through: :project_topics
end

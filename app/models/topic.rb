class Topic < ApplicationRecord
  validates :title, presence: true
  has_many :project_topics
  has_many :projects, through: :project_topics
end

class Folder < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :started, presence: true

  has_many :projects
  belongs_to :parent, class_name: "Folder", foreign_key: "parent_folder"
  has_many :children, class_name: "Folder", foreign_key: "parent_folder"
end

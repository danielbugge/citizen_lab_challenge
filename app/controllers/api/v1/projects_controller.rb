class Api::V1::ProjectsController < ApplicationController
  def index
    @projects = Project.where(folder: params['parent_folder'])
    if params['topic_id']
      @projects = @projects.joins(:topics).where(topics: {id: params['topic_id']})
    end
    render json: @projects, include: :topics
  end
end

class Api::V1::TopicsController < ApplicationController
  def index
    @topics = Topic.all
    render json: @topics
  end
end

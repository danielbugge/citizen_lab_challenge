class Api::V1::FoldersController < ApplicationController
  def index
    @folders = Folder.where(parent: params['parent_folder'])
    render json: @folders
  end
end

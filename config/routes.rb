Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'folders/index'
      get 'projects/index'
      get 'topics/index'
    end
  end
  root 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

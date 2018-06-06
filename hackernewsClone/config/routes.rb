Rails.application.routes.draw do
  get 'articles/index'

  get 'articles/api', to: 'articles#api', as: 'internal_api'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

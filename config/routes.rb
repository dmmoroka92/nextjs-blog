Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        scope :auth do
          post "sign_up",  to: "registrations#create"
          post "login",    to: "sessions#create"
          post "refresh",  to: "sessions#refresh"
          delete "logout", to: "sessions#destroy"
          get "me",        to: "sessions#me"
        end
      end

      resources :posts,
                param: :slug,
                only: %i[index show create update destroy] do
        resources :comments, only: %i[index create update destroy]
      end

      resource :dashboard, only: %i[show]          
    end
  end
end

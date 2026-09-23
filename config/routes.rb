Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        scope :auth do
          post "sign_up", to: "registrations#create"
          post "login", to: "sessions#create"
          post "refresh", to: "sessions#refresh"
          get "me", to: "sessions#me"
        end
      end
    end
  end
end

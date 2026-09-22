Rails.application.routes.draw do
  devise_for :users
  
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post "auth/sign_up", to: "registrations#create"
      end
    end
  end
end

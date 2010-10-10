ActionController::Routing::Routes.draw do |map|
  map.root :controller => :products

  map.resources :products
  map.resources :orders, :new => { :express => :get }

  # consider removing or commenting them out if you're using named routes and resources.
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end

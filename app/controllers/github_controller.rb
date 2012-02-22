class GithubController < ApplicationController

  before_filter :authenticate

  #/github/post_recieve_hook_target
  def post_recieve_hook_target

    # do something with githubs response?
    #github_respose = JSON params[:payload]


    git_output = `git pull`
    # later we could check if git was successfull...
    puts git_output
    
    # we use guard-passenger to monitor several dirs and let it restart passenger if files are changed
    # see Guardfile
    
    # for now...
    success = :true
    render :json => {:status => :ok, :success => success}, :status => 200

  end
  
  protected  
  
  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == "dude" && password == "08we7trb087tbp9qew"
    end
  end
end

class ContentController < ApplicationController
  def box
    if params[:tab]
      render :action => "box_#{params[:tab]}", :layout => nil
    end
  end
  
  def protonet
    if params[:tab]
      render :action => "protonet_#{params[:tab]}", :layout => nil
    end
  end
end

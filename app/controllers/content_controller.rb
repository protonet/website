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
  
  def team
    @team = [
      {
        :name     => "Ali Jelveh",
        :picture  => "uploads/pics/dude_1.jpg",
        :position => "GF",
        :description => "Lorem ipsum dolor sit amet lorem ipsum dolor sit. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, takimata sanctus est."
      },
      {
        :name => "Christopher Blum",
        :picture => "uploads/pics/dude_2.jpg",
        :position => "GF",
        :description => "Lorem ipsum dolor sit amet lorem ipsum dolor sit. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, takimata sanctus est."
      },
      {
        :name => "Martin Huegli",
        :picture => "uploads/pics/dude_5.jpg",
        :position => "GF",
        :description => "Lorem ipsum dolor sit amet lorem ipsum dolor sit. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, takimata sanctus est."
      },
      {
        :name => "David Burkhardt",
        :picture => "uploads/pics/dude_5_01.jpg",
        :position => "GF",
        :description => "Lorem ipsum dolor sit amet lorem ipsum dolor sit. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, takimata sanctus est."
      },
      {
        :name => "NA",
        :picture => "uploads/pics/dude_5_02.jpg",
        :position => "GF",
        :description => "Lorem ipsum dolor sit amet lorem ipsum dolor sit. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, takimata sanctus est."
      },
      {
        :name => "Johannes v. Bargen",
        :picture => "uploads/pics/dude_2.jpg",
        :position => "GF",
        :description => "Lorem ipsum dolor sit amet lorem ipsum dolor sit. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, takimata sanctus est."
      },
      {
        :name => "NA",
        :picture => "uploads/pics/dude_2.jpg",
        :position => "GF",
        :description => "Lorem ipsum dolor sit amet lorem ipsum dolor sit. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, takimata sanctus est."
      }
    ]
  end
end

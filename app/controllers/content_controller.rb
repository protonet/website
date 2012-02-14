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
        :position => "Founder/ CEO",
        :description => "Ali joined the XING AG as a RoR developer where he decided to start working on the idea protonet. When not working, Ali spends his time thinking, planning and simulating."
      },
      {
        :name => "Christopher Blum",
        :picture => "uploads/pics/dude_2.jpg",
        :position => "Founder/ CEO",
        :description => "Christopher founded his first company during school, studied communication design and got to know Ali and protonet at XING. In his free time he enjoys football or beers with friends."
      },
      {
        :name => "Henning Thies",
        :picture => "uploads/pics/dude_3.jpg",
        :position => "Developer",
        :description => "Henning established several web projects, worked for programming agencies and studied IT and Design. He met Christopher and Ali at the betahaus Hamburg."
      },
      {
        :name => "Wolfgang Peters",
        :picture => "uploads/pics/dude_4.jpg",
        :position => "Business",
        :description => "Wolfgang studied business administration, contributed to several startup projects and worked for the incubator Hanse Ventures. He met protonet at the betahaus."
      },
      {
        :name => "Johannes von Bargen",
        :picture => "uploads/pics/dude_5.jpg",
        :position => "Scientist",
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

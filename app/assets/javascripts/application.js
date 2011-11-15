// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//

//= require_tree ./application
//= require_self

jQuery(document).ready(function() {
  jQuery("select, input:checkbox, input:radio, input:file").uniform();

  // buy
  jQuery(".order-top-navi-item").click(function(i,j){
    var $this = jQuery(this);
    jQuery(".order-top-navi-item").removeClass("clicked");
    $this.addClass("clicked");
    jQuery(".csc-bulletlist-2").hide();
    jQuery("#details-list-" + $this.data("node")).show();
  });
  
  jQuery(".order-top-navi-item:nth-child(2)").click();

});


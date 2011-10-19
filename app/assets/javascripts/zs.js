    jQuery.fn.exists = function(){return jQuery(this).length>0;}

    jQuery(document).ready(function($) {
    
    	/* DUDES IN SLIDER */
    if($('.tx-ttaddress-pi1')) {
      $('.tx-ttaddress-pi1').eq(0).codaSlider({
        dynamicTabs: 0,
        dynamicArrowLeftText: "&#171; Back",
        dynamicArrowRightText: "More dudes &#187;"
      });
      $('.vcard').css('margin-right','15px');
    }

    	/* DISPLAY 6 DISTRIBUTORS ONLY IN RANDOM ORDER */
	
	var num = 6;		// number of items to display
	var numLines = 2;	// number of lines to display
	var itmsRow = num / numLines;
	
	// init
	var height = 0;
	var res = new Array();

	// shuffle items and remove clearbreak
	var divs = jQuery('.vcard_small').get().sort(function(){
		return Math.round(Math.random())-0.5; //so we get the right +/- combo
	   }).slice(0,num);
   	if (jQuery('.vcard_small').exists()) {
		jQuery(divs).appendTo(divs[0].parentNode).show();
	}
	jQuery('.tx-ttaddress-pi1 .cb').remove();
	
	// add clearbreak for every line
	for(i = -1; i<num; i=i+itmsRow) { jQuery('.vcard_small:eq(i)').append('<div class="cb"></div>'); }
	jQuery('.vcard_small').width(270);
	
	// determine height for parent container
	for(i=0;i<numLines;i++) {
		var h = 0;
		ju = itmsRow * (i + 1);
		jl = itmsRow * (i);
		jQuery('.vcard_small:visible').each(function() { h = Math.max(jQuery(this).height(),h); });
		res[i] = h;
	}
	for(var r in res) {	if(!isNaN(parseInt(res[r]))) height = height + res[r]; }
	jQuery('.vcard_small').parent().height(height);
	
	// add clearbreak at last
	jQuery('.vcard_small').parent().append('<div class="cb"></div>');
      });
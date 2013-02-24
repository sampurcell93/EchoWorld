$(document).ready(function(){	
	var w = $("#login").width;
	$('#close').css('top', '-300px');
	$('#login').animate({
    	opacity: 1,
    	top: '+=400',
  }, 1000, function() {
    // Animation complete.
  });
});
// $(window).scroll(function(){
// 	if($(window).scrollTop() >= $('.header-container').outerHeight()) {
// 		$('.logo img').addClass('smallLogo');
// 	}
// });


// Resize the logo on page scroll

	function init() {
	    window.addEventListener('scroll', function(e){
	        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
	            shrinkOn = 50,
	            logo = document.querySelector("#logo");
	        if (distanceY > shrinkOn) {
	            classie.add(logo,"smaller");
	        } else {
	            if (classie.has(logo,"smaller")) {
	                classie.remove(logo,"smaller");
	            }
	        }
	    });
	}
	window.onload = init();



// Smooth scrolling when clicking nav links

	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});





// Script to make easy animations based on scroll position


	/*
	    Version 1.8.2
	    The MIT License (MIT)
	    Copyright (c) 2014 Dirk Groenen
	    Permission is hereby granted, free of charge, to any person obtaining a copy of
	    this software and associated documentation files (the "Software"), to deal in
	    the Software without restriction, including without limitation the rights to
	    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	    the Software, and to permit persons to whom the Software is furnished to do so,
	    subject to the following conditions:
	    The above copyright notice and this permission notice shall be included in all
	    copies or substantial portions of the Software.
	*/

	(function($){
	    $.fn.viewportChecker = function(useroptions){
	        // Define options and extend with user
	        var options = {
	            classToAdd: 'visible',
	            classToRemove : 'invisible',
	            offset: 100,
	            repeat: false,
	            invertBottomOffset: true,
	            callbackFunction: function(elem, action){},
	            scrollHorizontal: false
	        };
	        $.extend(options, useroptions);

	        // Cache the given element and height of the browser
	        var $elem = this,
	            windowSize = {height: $(window).height(), width: $(window).width()},
	            scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1 || navigator.userAgent.toLowerCase().indexOf('windows phone') != -1) ? 'body' : 'html');

	        /*
	         * Main method that checks the elements and adds or removes the class(es)
	         */
	        this.checkElements = function(){
	            var viewportStart, viewportEnd;

	            // Set some vars to check with
	            if(!options.scrollHorizontal){
	                viewportStart = $(scrollElem).scrollTop();
	                viewportEnd = (viewportStart + windowSize.height);
	            }
	            else{
	                viewportStart = $(scrollElem).scrollLeft();
	                viewportEnd = (viewportStart + windowSize.width);
	            }

	            // Loop through all given dom elements
	            $elem.each(function(){
	                var $obj = $(this),
	                    objOptions = {},
	                    attrOptions = {};

	                //  Get any individual attribution data
	                if ($obj.data('vp-add-class'))
	                    attrOptions.classToAdd = $obj.data('vp-add-class');
	                if ($obj.data('vp-remove-class'))
	                    attrOptions.classToRemove = $obj.data('vp-remove-class');
	                if ($obj.data('vp-offset'))
	                    attrOptions.offset = $obj.data('vp-offset');
	                if ($obj.data('vp-repeat'))
	                    attrOptions.repeat = $obj.data('vp-repeat');
	                if ($obj.data('vp-scrollHorizontal'))
	                    attrOptions.scrollHorizontal = $obj.data('vp-scrollHorizontal');
	                if ($obj.data('vp-invertBottomOffset'))
	                    attrOptions.scrollHorizontal = $obj.data('vp-invertBottomOffset');

	                // Extend objOptions with data attributes and default options
	                $.extend(objOptions, options);
	                $.extend(objOptions, attrOptions);

	                // If class already exists; quit
	                if ($obj.hasClass(objOptions.classToAdd) && !objOptions.repeat){
	                    return;
	                }

	                // Check if the offset is percentage based
	                if(String(objOptions.offset).indexOf("%") > 0)
	                    objOptions.offset = (parseInt(objOptions.offset) / 100) * windowSize.height;

	                // define the top position of the element and include the offset which makes is appear earlier or later
	                var elemStart = (!objOptions.scrollHorizontal) ? Math.round( $obj.offset().top ) + objOptions.offset : Math.round( $obj.offset().left ) + objOptions.offset,
	                    elemEnd = (!objOptions.scrollHorizontal) ? elemStart + $obj.height() : elemStart + $obj.width();

	                if(objOptions.invertBottomOffset)
	                	elemEnd -= (objOptions.offset * 2);

	                // Add class if in viewport
	                if ((elemStart < viewportEnd) && (elemEnd > viewportStart)){

	                    // remove class
	                    $obj.removeClass(objOptions.classToRemove);

	                    $obj.addClass(objOptions.classToAdd);

	                    // Do the callback function. Callback wil send the jQuery object as parameter
	                    objOptions.callbackFunction($obj, "add");

	                // Remove class if not in viewport and repeat is true
	                } else if ($obj.hasClass(objOptions.classToAdd) && (objOptions.repeat)){
	                    $obj.removeClass(objOptions.classToAdd);

	                    // Do the callback function.
	                    objOptions.callbackFunction($obj, "remove");
	                }
	            });

	        };

	        // Select the correct events
	        if( !!('ontouchstart' in window) ){
	            // Touchscreen
	            $(document).bind("touchmove MSPointerMove pointermove", this.checkElements);
	        }
	        else{
	            // No touchscreen
	            $(window).bind("scroll", this.checkElements);
	        }

	        // Always load on window load
	        $(window).bind("load", this.checkElements);

	        // On resize change the height var
	        $(window).resize(function(e){
	            windowSize = {height: $(window).height(), width: $(window).width()};
	            $elem.checkElements();
	        });

	        // trigger inital check if elements already visible
	        this.checkElements();

	        // Default jquery plugin behaviour
	        return this;
	    };
	})(jQuery);



// Individual functions for animations based on scroll position

	jQuery(document).ready(function() {
	    jQuery('.title').viewportChecker({
	        classToAdd: 'title-move visible',
	        offset: 100
	       });
	});

	jQuery(document).ready(function() {
	    jQuery('img').viewportChecker({
	        classToAdd: 'img-move visible',
	        offset: 100
	       });
	});

	jQuery(document).ready(function() {
	    jQuery('.text').viewportChecker({
	        classToAdd: 'text-move visible',
	        offset: 100
	       });
	});



paw = document.getElementById("paw");

var myScrollFunc = function() {
  var y = window.scrollY;
  if (y >= 100) {
    paw.className = "flip-container visible"
  } else {
    paw.className = "flip-container hidden"
  }
};

window.addEventListener("scroll", myScrollFunc);



$(function() {                       //run when the DOM is ready
  $(".puppy-image").click(function() {  //use a class, since your ID gets mangled
    $(this).addClass("woof");      //add the class to the clicked element
  });
});


$(function() {
	$(".puppy-image").click(function(){
		var audio = new Audio ('../js/bark.mp3');
		audio.play();
	});
});



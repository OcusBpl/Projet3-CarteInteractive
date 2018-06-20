var Slide = {

	sliderImages: $(".slide"),
	arrowLeft: $("#arrow-left"),
	arrowRight: $("#arrow-right"),
	current: 0,

	// Clear all images
	reset: function() {
	  for (let i = 0; i < Slide.sliderImages.length; i++) {
	    Slide.sliderImages[i].style.display = "none";
	  }
	},

	// Init slider
	startSlide: function() {
	  Slide.reset();
	  Slide.action();
	  Slide.touch();
	  Slide.sliderImages[0].style.display = "block";
	},

	// Show prev
	slideLeft: function() {
	  Slide.reset();
	  Slide.sliderImages[Slide.current - 1].style.display = "block";
	  Slide.current--;
	},

	// Show next
	slideRight: function() {
	  Slide.reset();
	  Slide.sliderImages[Slide.current + 1].style.display = "block";
	  Slide.current++;
	},

	action: function(){
		// Left arrow click
		Slide.arrowLeft.click(function() {
		  if (Slide.current === 0) {
		    Slide.current = Slide.sliderImages.length;
		  }
		  Slide.slideLeft();
		});

		// Right arrow click
		Slide.arrowRight.click(function() {
		  if (Slide.current === Slide.sliderImages.length - 1) {
		    Slide.current = -1;
		  }
		  Slide.slideRight();
		});
	},

	touch: function(){
		document.addEventListener("keydown", function(e){
		    if(e.keyCode === 37){
		        if (Slide.current === 0) {
			    Slide.current = Slide.sliderImages.length;
			  }
			  Slide.slideLeft();
		    }
		    else if(e.keyCode === 39){
		        if (Slide.current === Slide.sliderImages.length - 1) {
			    Slide.current = -1;
			  }
			  Slide.slideRight();
		    }
		});
	}

	

}

Slide.startSlide();


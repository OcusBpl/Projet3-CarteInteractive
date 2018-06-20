var Canvas = {
	canvas: document.getElementById("sig-canvas"),
	clearBtn: document.getElementById("sig-clearBtn"),
	drawing: false,
	signature: false,
	mousePos: { x:0, y:0 },
	lastPos: "",
	ctx: "",
	rect: "",



	initCanvas: function(){
	
		// Get a regular interval for drawing to the screen
		window.requestAnimFrame = (function (callback) {
			return window.requestAnimationFrame || 
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimaitonFrame ||
						function (callback) {
						 	window.setTimeout(callback, 1000/60);
						};
		})();
		Canvas.setUp();
		Canvas.setUpMobile();

		function getMousePos(canvasDom, mouseEvent) {
			Canvas.rect = canvasDom.getBoundingClientRect();
			return {
				x: mouseEvent.clientX - Canvas.rect.left,
				y: mouseEvent.clientY - Canvas.rect.top
			};
		};

		// Get the position of a touch relative to the canvas
		 function getTouchPos(canvasDom, touchEvent) {
			Canvas.rect = canvasDom.getBoundingClientRect();
			return {
				x: touchEvent.touches[0].clientX - Canvas.rect.left,
				y: touchEvent.touches[0].clientY - Canvas.rect.top
			};
		};
		// Set up mouse events for drawing
		
		Canvas.lastPos = Canvas.canvas.mousePos;
		Canvas.canvas.addEventListener("mousedown", function (e) {
			Canvas.drawing = true;
			Canvas.lastPos = getMousePos(Canvas.canvas, e);
		}, false);
		Canvas.canvas.addEventListener("mouseup", function (e) {
			Canvas.drawing = false;
		}, false);
		Canvas.canvas.addEventListener("mousemove", function (e) {
			Canvas.mousePos = getMousePos(Canvas.canvas, e);
		}, false);
		
		Canvas.renderCanvas();
		Canvas.clearCanvas();

		// Allow for animation
		(function drawLoop () {
			requestAnimFrame(drawLoop);
			Canvas.renderCanvas();
		})();
		// Set up touch events for mobile, etc
		Canvas.canvas.addEventListener("touchstart", function (e) {
			Canvas.mousePos = getTouchPos(Canvas.canvas, e);
			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousedown", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			Canvas.canvas.dispatchEvent(mouseEvent);
		}, false);
		Canvas.canvas.addEventListener("touchend", function (e) {
			var mouseEvent = new MouseEvent("mouseup", {});
			Canvas.canvas.dispatchEvent(mouseEvent);
		}, false);
		Canvas.canvas.addEventListener("touchmove", function (e) {
			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			Canvas.canvas.dispatchEvent(mouseEvent);
		}, false);

		
	},

	

	setUp: function(){
		// Set up the canvas
		Canvas.ctx = Canvas.canvas.getContext("2d");
		Canvas.ctx.strokeStyle = "#222222";
		Canvas.ctx.lineWidth = 2;

		// Set up the UI
		
		Canvas.clearBtn.addEventListener("click", function (e) {
			Canvas.clearCanvas();
		}, false);

		
	},
		
	setUpMobile: function(){
		

		// Prevent scrolling when touching the canvas
		document.body.addEventListener("touchstart", function (e) {
			if (e.target == Canvas.canvas) {
				e.preventDefault();
			}
		}, false);
		document.body.addEventListener("touchend", function (e) {
			if (e.target == Canvas.canvas) {
				e.preventDefault();
			}
		}, false);
		document.body.addEventListener("touchmove", function (e) {
			if (e.target == Canvas.canvas) {
				e.preventDefault();
			}
		}, false);
	},
	
	 

	// Draw to the canvas
	renderCanvas: function() {
		if (Canvas.drawing) {
			Canvas.signature = true;
			Canvas.ctx.moveTo(Canvas.lastPos.x, Canvas.lastPos.y);
			Canvas.ctx.lineTo(Canvas.mousePos.x, Canvas.mousePos.y);
			Canvas.ctx.stroke();
			Canvas.lastPos = Canvas.mousePos;
		}
	},

	clearCanvas: function() {
		Canvas.canvas.width = Canvas.canvas.width;
		Canvas.signature = false;
	},

}


Canvas.initCanvas();
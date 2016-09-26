window.onload = function(){
	
	//init canvas
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	width = ctx.canvas.width  = window.innerWidth;
    height = ctx.canvas.height = window.innerHeight;
	canvas.style="border:1px solid #000000";
		
	
	//init game objects
	rope = new Rope(new Vec2(400,10),20,20)
	square = new Square(rope.getRopeEnd().position,100);
	
	//attach square to rope
	rope.attach(square.points[0]);
	
	//update logic
	function update()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		rope.updatePoints();
		square.updatePoints();
		for(var i=0;i<5;i++) //more loops = more precision, but worse performance
		{
			square.updateConstraints();
			rope.updateConstraints();
		}
		square.updateFriction();
		square.render(ctx);
		rope.render(ctx);
		setTimeout(update,1000/60);
	}
	update();
	
	//Mousemove functions.
	canvas.addEventListener('mousemove', function(evt) {
		mousePos = getMousePos(canvas, evt);
		rope.position = new Vec2(mousePos.x,mousePos.y);
	}, false);

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}
}
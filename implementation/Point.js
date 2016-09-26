class Point{
	constructor(position,velocity = new Vec2(0,0))
	{
		this.max_velocity = 40;
		this.pinned = false;
		this.friction = 0.6;
		this.gravity = new Vec2(0,0.5);
		this.position = position.copy();
		this.setVelocity(velocity);
	}
	get x(){ return this.position.x; }
	get y(){ return this.position.y; }
	set x(value){ this.position.x = value; }
	set y(value){ this.position.y = value; }
	
	setVelocity(velocity)
	{
		this.prev_position = this.position.sub(velocity);
	}
	getVelocity()
	{
		return this.prev_position.vecTo(this.position);
	}
	setPinned(value)
	{
		this.pinned = value;
		return this;
	}
	
	updateFriction()
	{
		if(this.y == height)
		{
			var vel = this.getVelocity();
			vel.x *= this.friction;
			this.setVelocity(vel);
		}
	}
	updateBoundings()
	{
		var vel = this.getVelocity();
		
		if(this.x > width)
		{
			this.x = width;
			this.prev_position.x = this.x + vel.x;
		}
		if(this.x < 0)
		{
			this.x = 0;
			this.prev_position.x = this.x + vel.x;
		}
		if(this.y < 0)
		{
			this.y = 0;
			this.prev_position.y = this.y + vel.y;
		}

		if(this.y > height)
		{
			this.y = height;
			this.prev_position.y = this.y + vel.y;
		}
	}
	update()
	{
		if(this.pinned)
			return;
		var vel = this.getVelocity();
		this.prev_position = this.position.copy();
		this.position = this.position.add(vel).add(this.gravity);
		
		vel = this.getVelocity();
		
		if(vel.len() > this.max_velocity)
			this.setVelocity(vel.resize(this.max_velocity));
		
	}
}

class PointConstraint
{
	
	constructor(P1,P2)
	{
		this.hidden = false;
		this.length = P1.position.vecTo(P2.position).len();
		this.P1 = P1;
		this.P2 = P2;
	}
	setLength(value)
	{
		this.length = value;
		return this;
	}
	setHidden(value)
	{
		this.hidden = value;
		return this;
	}
	
	
	applyConstraint(len)
	{
		var radius = this.length/2;
		
		var mid_point = this.P1.position.vecTo(this.P2.position).scale(0.5);
		
		mid_point = this.P1.position.add(mid_point);
		
		if(!this.P1.pinned)
			this.P1.position = mid_point.add(mid_point.vecTo(this.P1.position).resize(radius));
		if(!this.P2.pinned)
			this.P2.position = mid_point.add(mid_point.vecTo(this.P2.position).resize(radius));
		
	}
	
	update()
	{
		var current_len = this.P1.position.vecTo(this.P2.position).len();
		if(this.length != current_len)
		{
			this.applyConstraint(current_len);
		}
		this.P1.updateBoundings();
		this.P2.updateBoundings();
	}
	
	render(ctx)
	{
		if(!this.hidden)
		{
			ctx.beginPath();
			ctx.moveTo(...this.P1.position);
			ctx.lineTo(...this.P2.position);
			ctx.stroke();
		}
	}
}
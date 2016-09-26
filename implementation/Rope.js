class Rope
{
	constructor(position,rope_points,line_segment_length)
	{
		this.points = [];
		this.constraints = [];
		this.position = position;
		this.rope_points = rope_points;
		this.line_segment_length = line_segment_length;
		
		for(var i=0;i<rope_points;i++)
		{
			this.points.push(new Point(
				new Vec2(position.x,position.y+i*line_segment_length)
			));
		}
		
		for(var i=0;i<rope_points-1;i++)
		{
			this.constraints.push(
				new PointConstraint(this.points[i],this.points[i+1])
			);
		}
		this.setPinned(true);
	}
	setPinned(value)
	{
		this.pinned = value;
		this.points[0].pinned = value;
	}
	getRopeEnd()
	{
		return this.points[this.points.length-1];
	}
	attach(point)
	{
		this.constraints.push(new PointConstraint(this.getRopeEnd(),point).setLength(this.line_segment_length));
	}
	
	updatePoints()
	{
		this.points[0].position = this.position;
		for(var point of this.points)
		{
			point.update();
		}
	}
	updateFriction()
	{
		for(var point of this.points)
		{
			point.updateFriction();
		}
	}
	updateConstraints()
	{
		for(var constraint of this.constraints)
		{
			constraint.update();
		}
	}
	render(ctx)
	{
		for(var constraint of this.constraints)
		{
			constraint.render(ctx);
		}
	}
	
}
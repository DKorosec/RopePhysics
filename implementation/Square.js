class Square
{
	constructor(position,width)
	{
		this.points = [
			new Point(new Vec2(...position)),
			new Point(new Vec2(...position.add(new Vec2(width,0)))),
			new Point(new Vec2(...position.add(new Vec2(width,width)))),
			new Point((new Vec2(...position.add(new Vec2(0,width)))))
		];
		this.constraints = [
			new PointConstraint(this.points[0],this.points[1]),
			new PointConstraint(this.points[1],this.points[2]),
			new PointConstraint(this.points[2],this.points[3]),
			new PointConstraint(this.points[3],this.points[0]),
			new PointConstraint(this.points[0],this.points[2]).setHidden(true),
		];
	}
	updatePoints()
	{
		for(var point of this.points)
		{
			point.update();
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
	
	updateFriction()
	{
		for(var point of this.points)
		{
			point.updateFriction();
		}
	}

}
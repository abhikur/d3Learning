var data = [
	{shape:'polyline',points:'0,100 100,0', cx:0,cy:0,r:0,x:0,y:0,width:0,height:0,stroke:'grey',rx:5},
	{shape:'circle',points:'0,150 100,0', cx:200,cy:50,r:50,x:0,y:0,width:0,height:0,stroke:'red',rx:5},
	{shape:'rect',points:'0,100 100,0', cx:0,cy:0,r:0,x:300,y:0,width:100,height:100,stroke:'steelblue',rx:5},
	{shape:'polygon',points:'500,0 450,100 550,100', cx:0,cy:0,r:0,x:0,y:0,width:0,height:0,stroke:'green',rx:5}
]

function createShapes(data) {
	var svg = d3.select('body').append('svg')
		.attr('width', '100%')
		.attr('height', '300px')

	var shapesGroup = svg.append('g')
		.attr('transform', 'translate(100,100)')

	data.forEach(function(shapeData) {
		shapesGroup.selectAll(shapeData.shape)
			.data(data).enter()
			.append(shapeData.shape)
			.attr('points', shapeData.points)
			.attr('cx', shapeData.cx)
			.attr('cy', shapeData.cy)
			.attr('r', shapeData.r)
			.attr('x',shapeData.x)
			.attr('y',shapeData.y)
			.attr('width',shapeData.width)
			.attr('height',shapeData.height)
			.attr('stroke',shapeData.stroke)
			.attr('rx', shapeData.rx)
			.attr('class', 'shape')
	})


// 	// var polylineG = shapesGroup.append('g')
// 	// 	.attr('transform', 'translate(0, 0)')

// 	// var circleG = shapesGroup.append('g')
// 	// 	.attr('transform', 'translate(150, 0)')

// 	// var rectG = shapesGroup.append('g')
// 	// 	.attr('transform', 'translate(300, 0)')

// 	// var triangleG = shapesGroup.append('g')
// 	// 	.attr('transform', 'translate(450,0)')

// 	// polylineG.append('polyline')
// 	// 	.attr('points', '0,100 100,0')
// 	// 	.attr('cx', 0)
// 	// 	.attr('cy', 10)
// 	// 	.attr('r', 200)
// 	// 	.attr('width', 100)
// 	// 	.attr('height', 100)
// 	// 	.attr('stroke', 'grey')
// 	// 	.attr('class', 'shape')

// 	// circleG.append('circle')
// 	// 	.attr('points', '0,100 100,0')
// 	// 	.attr('cx', 50)
// 	// 	.attr('cy', 50)
// 	// 	.attr('r', 50)
// 	// 	.attr('stroke', 'red')
// 	// 	.attr('class', 'shape')

// 	// rectG.append('rect')
// 	// 	.attr('x', 0)
// 	// 	.attr('y', 0)
// 	// 	.attr('width', 100)
// 	// 	.attr('height', 100)
// 	// 	.attr('stroke', 'steelblue')
// 	// 	.attr('class', 'shape')

// 	// triangleG.append('polygon')
// 	// 	.attr('points', '50,0 0,100 100,100')
// 	// 	.attr('stroke', 'green')
// 	// 	.attr('class', 'shape')


}

window.onload = function() {
	createShapes(data);
}
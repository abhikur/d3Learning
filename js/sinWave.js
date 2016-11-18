var data = [{x:0,y:5}, {x:1,y:9}, {x:2,y:7}, {x:3,y:5}, {x:4,y:3}, {x:6,y:4}, {x:7,y:2}, {x:8,y:3}, {x:9,y:2}],
	WIDTH = 500,
	HEIGHT = 500,
	MARGIN = 30,
	GAP = 10,
	xScale,
	yScale;

var curveArray = [
	    {"d3Curve":d3.curveLinear},
	    {"d3Curve":d3.curveLinearClosed},
	    {"d3Curve":d3.curveStepAfter},
	    {"d3Curve":d3.curveBasis},
	    {"d3Curve":d3.curveBundle},
	    {"d3Curve":d3.curveCardinalClosed},
	    {"d3Curve":d3.curveCardinal},
	    {"d3Curve":d3.curveMonotoneX}
];

function translate(x, y) {
	return 'translate(' + x + ',' + y + ')';
}

function createAxes(id) {
	var svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	var graphGroup = svg.append('g')
		.attr('transform', translate(MARGIN,MARGIN))

	xScale = d3.scaleLinear()
		.domain([0,10])
		.range([0, WIDTH - (2*MARGIN)])

	yScale = d3.scaleLinear()
		.domain([0,10])
		.range([HEIGHT - (2*MARGIN), 0])

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(10)

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(10)

	var xAxisGroup = graphGroup.append('g')
		.attr('transform', translate(MARGIN-GAP, (HEIGHT - 2*MARGIN)))
		.call(xAxis)
		.attr('class', 'xAxis' + id)

	var yAxisGroup = graphGroup.append('g')
		.attr('transform', translate(MARGIN-GAP, 0))
		.call(yAxis)
		.attr('class', 'yAxis' + id)
}

function createSineGraph(d3Curve, id) {
	var line = d3.line()
		.curve(d3.curveLinear)
		.x(function(d) {return xScale(d.x)})
		.y(function(d) {return yScale(d.y) - (HEIGHT - 2*MARGIN)})

	var sineLine = d3.line()
		.x(function(d) {return xScale(d.x)})
		.y(function(d,i) {return yScale(Math.sin(d.x) + 5) - (HEIGHT - 2*MARGIN)})

	d3.select('.xAxis'+id).append('path')
		.datum(data)
		.attr('class', 'line')
		.attr('d',d3.line()
						.curve(d3Curve)
						.x(function(d) {return xScale(d.x)})
						.y(function(d) {return yScale(d.y) - (HEIGHT - 2*MARGIN)})
			 )

	

	d3.select('.xAxis'+id).append('path')
		.datum([0,1,2,3,4,5,6,7,8,9])
		.attr('class', 'sineLine')
		.attr('d', d3.line()
						.curve(d3Curve)
						.x(function(d) {return xScale(d)})
						.y(function(d,i) {return yScale(Math.sin(d) + 5) - (HEIGHT - 2*MARGIN)})						
			 )

	d3.select('.xAxis'+id).selectAll('dot')
		.data(data).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d.x)})
		.attr('cy', function(d){return yScale(d.y) - (HEIGHT - 2*MARGIN)})

	d3.select('.xAxis'+id).selectAll('dot')
		.data([0,1,2,3,4,5,6,7,8,9]).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d)})
		.attr('cy', function(d){return yScale(Math.sin(d) + 5) - (HEIGHT - 2*MARGIN)})
}

window.onload = function() {
	curveArray.forEach(function(curve, i) {
		var curveName = Object.keys(curve) + i;
		createAxes(curveName);
		createSineGraph(curve.d3Curve, curveName);	
	})
}
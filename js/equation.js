var	WIDTH = 500,
	HEIGHT = 500,
	MARGIN = 30,
	GAP = 10,
	xScale,
	yScale;

function translate(x, y) {
	return 'translate(' + x + ',' + y + ')';
}

function createAxes() {
	var svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	var graphGroup = svg.append('g')
		.attr('transform', translate(MARGIN,MARGIN))

	xScale = d3.scaleLinear()
		.domain([0,10])
		.range([0, WIDTH - (2*MARGIN)])

	yScale = d3.scaleLinear()
		.domain([0,1])
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
		.attr('class', 'xAxis')

	var yAxisGroup = graphGroup.append('g')
		.attr('transform', translate(MARGIN-GAP, 0))
		.call(yAxis)
		.attr('class', 'yAxis')
}

function createGraph(data) {
	createAxes();
	var line = d3.line()
		.x(function(x) {return xScale(x)})
		.y(function(x) {return yScale((Math.sin(3*x)+1)/2) - (HEIGHT - 2*MARGIN)})

	d3.select('.xAxis').append('path')
		.datum(data)
		.attr('class', 'equationLine')
		.attr('d', line)

	d3.select('.xAxis').selectAll('dot')
		.data(data).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d)})
		.attr('cy', function(x){return yScale((Math.sin(3*x)+1)/2) - (HEIGHT - 2*MARGIN)})
}

window.onload = function() {
	var data = [0,1,2,3,4,5,6,7,8,9];
	createGraph(data);
}
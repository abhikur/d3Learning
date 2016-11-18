var HEIGHT = 500,
	WIDTH = 800,
	MARGIN = 20;

var chart, line, xScale, yScale;

var generateAxes = function() {
	xScale = d3.scaleLinear()
		.domain([0, 10])
		.range([0, WIDTH - (3*MARGIN)]);

	yScale = d3.scaleLinear()
		.domain([0, 100])
		.range([HEIGHT - (2*MARGIN), 0]);

	var xAxis = d3.axisBottom()
		.scale(xScale)
		

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(20)

	var xAxisGroup = d3.select("svg").append("g")
		.attr("transform", "translate(" + (2*MARGIN)+ "," + (HEIGHT - MARGIN) + ")")
		.call(xAxis)
		.attr("class", "xAxis");

	var yAxisGroup = d3.select("svg").append("g")
		.attr("transform", "translate(" + (2*MARGIN)+ "," + MARGIN + ")")
		.call(yAxis)
		.attr("class", "yAxis");
}

var generateRandomNums = function() {
	var nums = [];
	for (var i = 0; i < 20; i++) {
		nums.push((Math.random() * 100));
	}
	return nums;
}

var generateChart = function(nums) {
	var chartCanvas = d3.select(".chart").append("svg")
		.attr("width", WIDTH)
		.attr("height", HEIGHT);

	generateAxes();

	var clipPath = chartCanvas.append("clipPath")
		.append("rect")
		.attr("x", 0 + (2*MARGIN))
		.attr("y", 0 + MARGIN)
		.attr("width", WIDTH - (3*MARGIN))
		.attr("height", HEIGHT - (2*MARGIN))
		.attr("id", "clip")

	chart = chartCanvas.append("g")
		.attr("transform", "translate(" + (2*MARGIN)+ "," + MARGIN + ")");

	line = d3.line()
		.curve(d3.curveBasis)
		.x(function(d) { return xScale(nums.indexOf(d))})
		.y(function(d){ return yScale(d)})

	chart.append("path")
		.data(nums)
		.attr("class", "line")
		.attr("d", line(nums))
		.attr("clip-path", "url(#clip)")
		.style("visibility", "hidden")

	// chart.selectAll("rect")
	// 	.data(nums)
	// 	.enter()
	// 	.append("rect")
	// 	.attr("x", function(d, i) { return xScale(i + 1) - 10})
	// 	.attr("y", function(d) {return yScale(d)})
	// 	.attr("width", 20)
	// 	.attr("height", function(d) {return HEIGHT - yScale(d) - (2*MARGIN)})
	// 	.attr("fill", "steelblue")
	// 	.style("visibility", "hidden")
	
}

var appendNewNumbers = function(nums) {
	nums.shift();
	nums.push(Math.random() * 100);
	return nums;
}

var updateGraph = function(data) {
	chart.selectAll("path")
		.attr("transform", null)
		.attr("d", line(data))
		.transition()
		.duration(950)
		.ease(d3.easeLinear)
		.attr("transform", "translate(" + xScale(-1) + ")")



	// chart.selectAll("rect")
	// 	.data(data)
	// 	.attr("y", function(d) { return yScale(d)})
	// 	.attr("height", function(d) {return HEIGHT - yScale(d) - (2*MARGIN)})

}

var showBarChart = function() {
	chart.selectAll("path")
		.style("visibility", "hidden")	
	chart.selectAll("rect")
		.style("visibility", "visible")
}

var showLineChart = function() {
	chart.selectAll("rect")
		.style("visibility", "hidden")
	chart.selectAll("path")
		.style("visibility", "visible")	
}

var showCombineChart = function() {
	chart.selectAll("rect")
		.style("visibility", "visible")
	chart.selectAll("path")
		.style("visibility", "visible")		
}

window.onload = function() {
	var nums = generateRandomNums();
	generateChart(nums);
	d3.interval(function() {
		updateGraph(appendNewNumbers(nums) );
	}, 1000)
}
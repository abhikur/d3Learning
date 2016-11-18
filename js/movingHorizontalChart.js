var Width = 800, Height = 500,
	Margin = 30, barHeight = 20

var xScale = d3.scaleLinear()
	.domain([0, 10])
	.range([0, Width - (2*Margin)]);

var shades = ['#1a1aff','#1a75ff','#4d94ff','#80b3ff','#b3d1ff','#e6f0ff','#e6f2ff','#003380','#0047b3','#80b3ff'];
var oldBars;
var newBars;
function createChart(data) {

	var bars = d3.select('.chart').selectAll('div')
		.data(data, function(d) { return d.id})

	bars	
		.enter()
		.append('div')
		.style('width', function(d){return xScale(d.num) + 'px'})
		.style('height', barHeight + 'px')
		.attr('class', 'bars')
		.style('background', function(d,i){return shades[d.num]})
		.text(function(t){return 'new'})

	bars
		.style('width', function(d){return xScale(d.num) + 'px'})
		.style('background', function(d,i){return shades[d.num]})
		.text(function(t){return 'updating'})

	bars.exit().remove();
}

function randomNumberBetween(num1, num2) {
	return Math.floor(Math.random() * num2) + num1;
}

function generateRandomNumbersSeries(init) {
	var nums = []
	for (var i = 0; i < 10; i++) {
		nums.push({num:randomNumberBetween(1, 10),id:init++});
	}
	return nums;
}

function next(lastId) {
	return {num:randomNumberBetween(1, 10),id:++lastId}
}

window.onload = function() {
	var series = generateRandomNumbersSeries(0);
	createChart(series);
	var i=0
	setInterval(function(){
		var lastId = series[series.length - 1].id;
		series.shift();
		series.push(next(lastId));
		createChart(series);
	}, 1000)
}
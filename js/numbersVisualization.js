var Height = 500,
	Width = 800,
	Margin = 30;

function createChart(data) {
	var xScale = d3.scaleLinear()
		.domain([0,10])
		.range([12, 120])

	var yScale = d3.scaleLinear()
		.domain([0,10])
		.range([30, 180])

	var group = d3.select('body').append('g')
		.attr('height', Height)
		.attr('width', Width)

	var divs = group.selectAll('div').data(data)

	divs.enter()
		.append('div')
		.style('width', function(d){return xScale(d)+'px'})
		.attr('class', 'numbers')
		.text(function(d){return d})
		.style('font-size', function(d){return xScale(d) + 'px'})
		.style('line-height', function(d) {return yScale(d)+'px'})

}

window.onload = function() {
	var data = [0,1,2,3,4,5,6,7,8,9,10];
	createChart(data);
}
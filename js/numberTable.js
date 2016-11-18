function prepareData(titles, data, scales) {
	return titles.map(function(title, i) {
		var preparedData = {title: title};
		var valueForTitle = data.map(function(num){ return scales[i](num);})
		preparedData.values = valueForTitle;
		return preparedData;
	})
}

function createTable(titles, data) {

	var pow = d3.scalePow()
		.exponent(2);

	var log = d3.scaleLog();

	var scales = [pow, log];

	var preparedData = prepareData(titles, data, scales);
	console.log(preparedData)

	var container = d3.select('body').append('div')
		.attr('class', 'tableContainer');

	var table = container.append('table');
	
	table.append('thead')
		.append('tr')
			.selectAll('th')
			.data(['Title','1','2','3','4','5','6','7','8','9','10'])
			.enter().append('th')
			.text(function(d){return d});

	var tr = table.append('tbody')
		.selectAll('tr')
		.data(preparedData)
		.enter().append('tr')
		
	tr.append('th')
		.text(function(d){return d.title})


	tr.selectAll('td')
		.data(function(d){return d.values})
		.enter().append('td')
		.text(function(d){console.log(d);return d})

}

window.onload = function() {
	var titles = ["n square","log(n)"];
	var nums = [2,3,2,8,6,7,4,3,9,3];
	createTable(titles, nums)
}
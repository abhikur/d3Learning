var nums = [12,23,45,21,76,11,90,19,100,21,34,45,67];

function createChart() {
	var chartArea = document.querySelector('.chart');
	nums.forEach(function(num) {
		var rect = document.createElement('div');
		rect.className = 'rect';
		rect.innerText = ''+num;
		rect.setAttribute('style', 'width:'+ num*4 + 'px');
		chartArea.appendChild(rect);	
	})
}

function updateChart() {
	var num = Math.ceil(Math.random() * 100)
	var chart = document.querySelector('.chart');
	chart.removeChild(chart.children[0]);
	var rect = document.createElement('div');
	rect.className = 'rect';
	rect.innerText = ''+num;
	rect.setAttribute('style', 'width:'+ num*4 + 'px');
	chart.appendChild(rect);
}

window.onload = function() {
	createChart();
	nums.shift();
	var num = Math.random() * 100;
	setInterval(updateChart, 1000)
	
}
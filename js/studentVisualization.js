var studentData = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
]

var colors = {'maths':'#1F77B4','english':'#FF7F0E','kannada':'#2CA02C','science':'#D62728','social studies':'#9467BD','bengali':'#8C564B','tamil':'#E276C1','sports':'#7E7E7E'};

function createChart(data) {
	var chartArea = d3.select('.chart');
	var bars = chartArea.selectAll('div').data(data, function(d){d.name})

	bars
		.enter()
		.append('div')
		.style('width', function(d){return (d.score*4)+'px'})
		.style('height', '20px')
		.attr('class', 'bars')
		.text(function(d){return d.name + " " + d.score})
		.style('text-align','center')
		.style('background', function(d){return colors[d.subject]})
		.style('border-radius','25px')

}

function getUniqueSubjects() {
	var subjects = [];
	studentData.forEach(function(student){
		if (subjects.indexOf(student.subject) == -1)
			subjects.push(student.subject);
	})
	return subjects
}

function showSubjectsOnBottomBar() {
	var bottomBar = d3.select('.bottomBar');
	var subjects = bottomBar.selectAll('.div').data(getUniqueSubjects()).enter()

	subjects
		.append('div')
		.style('width', '60px')
		.style('height', 'auto')
		.attr('class', 'subject')
		.text(function(d){return d})
		.style('background', function(d){return colors[d]})

}

function sortByName() {
	var divs = d3.selectAll('.bars')
	divs.sort(function(a,b) {
		return d3.ascending(a.name, b.name);
	})
}

function sortByScore() {
	d3.selectAll('.bars').sort(function(a, b){
		return +a.score - (+b.score);
	})
}

function sortBySubject() {
	d3.selectAll('.bars').sort(function(a, b){
		return d3.ascending(a.subject, b.subject);
	})	
}

window.onload = function() {
	createChart(studentData);
	showSubjectsOnBottomBar()
}
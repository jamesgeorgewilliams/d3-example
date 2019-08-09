'use strict';

// Select canvas and append SVG
var svg = d3.select('.canvas').append('svg').attr('width', 600).attr('height', 600);

// Create margins for group element
var margin = { top: 20, right: 20, left: 100, bottom: 100 };
var graphWidth = 600 - margin.left - margin.right;
var graphHeight = 600 - margin.top - margin.bottom;

// Create group
var graph = svg.append('g').attr('width', graphWidth).attr('height', graphHeight).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')'); // Allows space for axis

// Create Axes groups
var xAxisGroup = graph.append('g').attr('transform', 'translate(' + 0 + ', ' + graphHeight + ')');
var yAxisGroup = graph.append('g');

// Request JSON from external file and return promise
d3.json('./scripts/stats.json').then(function (data) {

  var rects = graph.selectAll('rect').data(data);

  // Create max value to pass to Linear scale - adapts if new data with higher range added
  var y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
    return d.minutes;
  })]).range([graphHeight, 0]); // Pass graph height to y range to make rectangles fit

  var x = d3.scaleBand().domain(data.map(function (year) {
    return year.season;
  })).range([0, 500]).paddingInner(0.2).paddingOuter(0.2);

  // console.log(x('2013/2014'))
  // console.log(x.bandwidth())

  rects.attr('width', x.bandwidth).attr('height', function (d) {
    return graphHeight - y(d.minutes);
  }).attr('fill', 'green').attr('x', function (d) {
    return x(d.season);
  });

  rects.enter().append('rect').attr('width', x.bandwidth).attr('height', function (d) {
    return graphHeight - y(d.minutes);
  }).attr('fill', 'green').attr('x', function (d) {
    return x(d.season);
  });

  // Create the axes with scales
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  // Call the axes for the groups
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
});

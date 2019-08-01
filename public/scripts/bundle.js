'use strict';

var svg = d3.select('svg');

d3.json('./scripts/stats.json').then(function (data) {

  var rects = svg.selectAll('rect').data(data);

  console.log(rects);

  var y = d3.scaleLinear().domain([0, 3000]).range([0, 500]);

  var x = d3.scaleBand().domain(data.map(function (year) {
    return year.season;
  })).range([0, 500]).paddingInner(0.2);

  console.log(x('2013/2014'));
  console.log(x.bandwidth());

  rects.attr('width', x.bandwidth).attr('height', function (d) {
    return y(d.minutes);
  }).attr('fill', 'green').attr('x', function (d) {
    return x(d.season);
  });

  rects.enter().append('rect').attr('width', x.bandwidth).attr('height', function (d) {
    return y(d.minutes);
  }).attr('fill', 'green').attr('x', function (d) {
    return x(d.season);
  });
});

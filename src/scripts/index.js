
const svg = d3.select('svg')

d3.json('./scripts/stats.json').then((data) => {

  const rects = svg.selectAll('rect')
    .data(data)

  console.log(rects)

  const y = d3.scaleLinear()
    .domain([0, 3000])
    .range([0, 500])
  
  const x = d3.scaleBand()
    .domain(data.map((year) => year.season))
    .range([0, 500])
    .paddingInner(0.2)
  
  console.log(x('2013/2014'))
  console.log(x.bandwidth())

  rects.attr('width', x.bandwidth)
    .attr('height', (d) => y(d.minutes))
    .attr('fill', 'green')
    .attr('x', (d) => x(d.season))
    

  rects.enter()
    .append('rect')
      .attr('width', x.bandwidth)
      .attr('height', (d) => y(d.minutes))
      .attr('fill', 'green')
      .attr('x', (d) => x(d.season))
})




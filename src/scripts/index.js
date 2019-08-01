// Select canvas and append SVG
const svg = d3.select('.canvas')
  .append('svg')
    .attr('width', 600)
    .attr('height', 600)

// Create margins for group element
const margin = {top: 20, right: 20, left: 100, bottom: 100}
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

// Create group
const group = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)

// Request JSON from external file and return promise
d3.json('./scripts/stats.json').then((data) => {

  const rects = group.selectAll('rect')
    .data(data)
  
  // Create max value to pass to Linear scale - adapts if new data with higher range added
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.minutes)])
    .range([0, 500])
  
  const x = d3.scaleBand()
    .domain(data.map((year) => year.season))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2)
  
  // console.log(x('2013/2014'))
  // console.log(x.bandwidth())

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




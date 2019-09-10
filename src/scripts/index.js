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
const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`)  // Allows space for axis

// Create Axes groups
const xAxisGroup = graph.append('g')
  .attr('transform', `translate(${0}, ${graphHeight})`)
const yAxisGroup = graph.append('g')

// Request JSON from external file and return promise
d3.json('./scripts/stats.json').then((data) => {

  const rects = graph.selectAll('rect')
    .data(data)
  
  // Create max value to pass to Linear scale - adapts if new data with higher range added
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.minutes)])
    .range([graphHeight, 0]) // Pass graph height to y range to make rectangles fit
  
  const x = d3.scaleBand()
    .domain(data.map((year) => year.season))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2)
  
  // console.log(x('2013/2014'))
  // console.log(x.bandwidth())

  rects.attr('width', x.bandwidth)
    .attr('height', (d) => graphHeight - y(d.minutes))
    .attr('fill', 'DarkSeaGreen')
    .attr('x', (d) => x(d.season))
    .attr('y', (d) => y(d.minutes))
    

  rects.enter()
    .append('rect')
      .attr('width', x.bandwidth)
      .attr('height', 0)
      .attr('fill', 'DarkSeaGreen')
      .attr('x', (d) => x(d.season))
      .attr('y', graphHeight)
      .transition().duration(1000)
        .attr('y', (d) => y(d.minutes))
        .attr('height', (d) => graphHeight - y(d.minutes))


  // Create the axes with scales
  const xAxis = d3.axisBottom(x)
    
  const yAxis = d3.axisLeft(y)
    .ticks(5)                   // Format amount of ticks & text
    .tickFormat((d) => d + ' mins ')

  // Call the axes for the groups
  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)
})




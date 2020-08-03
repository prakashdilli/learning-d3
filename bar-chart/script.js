
const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {

    const xValue = d => d.population
    const yValue = d => d.country
    const margin = {top:20,right:20,bottom:20,left:70}
    const innerWidth = width-margin.right-margin.left
    const innerHeight = height-margin.top-margin.bottom
    const xScale = d3.scaleLinear()
        .domain([0,d3.max(data, xValue)])
        .range([0,innerWidth])

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0,innerHeight])
        .padding(0.1)

    const g = svg.append('g')
                .attr('transform',`translate(${margin.left},${margin.top})`)

    g.append('g').call(d3.axisLeft(yScale))
    g.append('g').call(d3.axisBottom(xScale))
                    .attr('transform',`translate(0,${innerHeight})`)
    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y',d => yScale(yValue(d)))
            .attr('width',d => xScale(xValue(d)))
            .attr('height',d => yScale.bandwidth())
}

d3.csv('data.csv').then((data)=>{
    data.forEach(d => {
        d.population = +d.population
    });
    render(data)
})
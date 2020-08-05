
const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {

    const xValue = d => d.population
    const yValue = d => d.country
    const margin = {top:50,right:20,bottom:50,left:80}
    const innerWidth = width-margin.right-margin.left
    const innerHeight = height-margin.top-margin.bottom
    
    const xScale = d3.scaleLinear()
        .domain([0,d3.max(data, xValue)])
        .range([0,innerWidth])
        .nice()

    const yScale = d3.scalePoint()
        .domain(data.map(yValue))
        .range([0,innerHeight])
        .padding(0.7)

    const g = svg.append('g')
                .attr('transform',`translate(${margin.left},${margin.top})`)

    const xAxisTickFormat = number =>
         d3.format('.3s')(number)
         .replace('G','B')

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight)
    
    const yAxis = d3.axisLeft(yScale)
            .tickSize(-innerWidth)

    g.append('g')
        .call(yAxis)
        .attr('class','yAxisLabel')
        .selectAll('.domain')
            .remove()

    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('class','yAxisLabel')
        .attr('transform',`translate(0,${innerHeight})`)

    xAxisG
        .selectAll('.domain')
            .remove()
    
    xAxisG.append('text')
            .attr('fill','black')
            .text('Population')
            .attr('class','xAxisTitle')
            .attr('x',innerWidth/2)
            .attr('y',40)

    g.append('text')
        .attr('class','title')
        .attr('x',innerWidth/2)
        .attr('y',-20)
        .text('10 Most Populous Country')

    g.selectAll('circle').data(data)
        .enter().append('circle')
            .attr('cy',d => yScale(yValue(d)))
            .attr('cx',d => xScale(xValue(d)))
            .attr('r',10)
}

d3.csv('data.csv').then((data)=>{
    data.forEach(d => {
        d.population = +d.population
    });
    render(data)
})
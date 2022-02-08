class LineChart{
    constructor(_config, _data) {
        this.config = {
          parentElement: _config.parentElement,
          containerWidth: _config.containerWidth || 500,
          containerHeight: _config.containerHeight || 140,
          margin: { top: 10, bottom: 30, right: 50, left: 50 }
        }
    
        this.data = _data;
        console.log(this.data);
        // Call a class function
        this.initVis();
    }
    initVis() {
        console.log("inside line");
        
        let vis = this; 
        console.log(vis.data);
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xValue = d => d.year; 
        vis.yValue = d => d.medianAQI;
      

        vis.xScale = d3.scaleLinear()
        .domain(d3.extent(vis.data, vis.xValue)) //d3.min(vis.data, d => d.year), d3.max(vis.data, d => d.year) );
        .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
        .domain([0, d3.max(vis.data, d => d.medianAQI)*1.5])
       // .domain(d3.extent(vis.data, vis.yValue))
        .range([vis.height, 0])
        .nice();
        console.log('made scales');

        vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);

        console.log('made axis');
        vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`)
        .call(vis.xAxis);

        vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis')
        .call(vis.yAxis); 

        console.log('made axis group');
        vis.area = d3.area()
    	.x(d => vis.xScale(vis.xValue(d)))
	.y1(d => vis.yScale(vis.yValue(d)))
	.y0(vis.height)
    
    vis.chart.append('path')
	.data([vis.data])
	.attr('fill', '#e9eff5')
	.attr('d', vis.area);

    console.log('made path');

    vis.line = d3.line()
	.x(d => vis.xScale(vis.xValue(d)))
	.y(d => vis.yScale(vis.yValue(d)))

    console.log('made line');

    vis.chart.append('path')
	.data([vis.data]) 
	.attr('stroke', '#8693a0')
	.attr('fill', 'none')
	.attr('stroke-width', 2)
	.attr('d', vis.line);

    console.log('made chart');
    }
}
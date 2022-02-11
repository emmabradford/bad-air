class PieChart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 10, bottom: 30, right: 50, left: 50 }
        }

        this.data = _data;
        // this.data2= _data2
        //console.log(this.data);
        //console.log(this.data2);
        // Call a class function
        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
        vis.marin = vis.config.margin.left;

        vis.radius = Math.min(vis.width, vis.height) / 2 - vis.marin;

        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.width / 2},${vis.height / 2})`);

        vis.colorPalette = d3.scaleOrdinal(d3.schemeTableau10);
        vis.colorPalette.domain('good', 'hazard', 'unhealthy', 'moderete', 'unhealthyfor', 'very');
        this.updateVis()
    }

    updateVis() {
        let vis = this;
        console.log('data')
        vis.pie = d3.pie()
            .value(function (d) {
                console.log(d);
                return d.value
            })
        //vis.data_ready = vis.pie(Object.entries(vis.data));
        vis.data_ready = vis.pie(vis.data);
        //console.log('data ready');

        vis.chart.selectAll('whatever')
            .data(vis.data_ready)
            .enter()
            .append('path')
            //.join('path')
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(vis.radius)
            )
            .attr('fill', (d) =>
                vis.colorPalette(d.data.key)
            )
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
    }

}
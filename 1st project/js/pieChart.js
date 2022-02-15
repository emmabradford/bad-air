class PieChart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 10, bottom: 30, right: 50, left: 50 }
        }

        this.data = _data;
        this.initVis();
    }

    initVis() {
        let vis = this;
        vis.tp;

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
        vis.chart.selectAll('path')
            .data([])
            .exit().remove();
       // console.log('data')
        
        vis.pie = d3.pie()
            .value(function (d) {
               // console.log(d);
                return d.value
            })

        vis.data_ready = vis.pie(vis.data);
        //console.log('data ready');

        vis.chart.selectAll('whatever')
            .data(vis.data_ready)
            .enter()
            .append('path')
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
            .on('mouseover', (event,d) => {
                console.log("mouse over! ");
                console.log(event);
                console.log(d);
  
              d3.select(vis.tp)
                .style('display', 'block')
                .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
                .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                .html(`
                  <div class="tooltip-title">Key: ${d.data.key}</div>
                  <ul>
                    <li> Value: ${d.value}</li>

                  </ul>
                `);
            })
            .on('mouseleave', () => {
              d3.select(vis.tp).style('display', 'none');
            }); 
    }
}
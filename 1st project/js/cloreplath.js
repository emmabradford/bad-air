class ChoroplethMap {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 1000,
            containerHeight: _config.containerHeight || 500,
            margin: _config.margin || { top: 10, right: 10, bottom: 10, left: 10 },
            tooltipPadding: 10,
            legendBottom: 50,
            legendLeft: 50,
            legendRectHeight: 12,
            legendRectWidth: 150
        }
        this.data = _data;
        this.us = _data;
        //console.log(this.data);
        this.active = d3.select(null);
        this.initVis();
    }

    initVis() {
        let vis = this;
        vis.tp;
        // Calculate inner chart size. Margin specifies the space around the actual chart.
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement).append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        vis.updateVis()
    }

    updateVis() {
        let vis = this;
        //console.log(vis.data);

        vis.projection = d3.geoAlbersUsa()
            .translate([vis.width / 2, vis.height / 2])
            .scale(vis.width);

        vis.colorScale = d3.scaleLinear()
            .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.value))
            .range(['#cfe2f2', '#0d306b'])
            .interpolate(d3.interpolateHcl);

        vis.path = d3.geoPath()
            .projection(vis.projection);

        vis.linearGradient = vis.svg.append('defs').append('linearGradient')
            .attr("id", "legend-gradient");

        vis.legend = vis.chart.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.config.legendLeft},${vis.height - vis.config.legendBottom})`);

        const popDensityExtent = d3.extent(vis.data.objects.counties.geometries, d => d.properties.value);

        vis.colorScale.domain(popDensityExtent);

        vis.legendStops = [
            { color: "#cfe2f2", value: popDensityExtent[0], offset: 0 },
            { color: "#0d306b", value: popDensityExtent[1], offset: 100 }
        ];

        vis.renderVis();
    }

    renderVis() {
        let vis = this;
        const countiess = topojson.feature(vis.data, vis.data.objects.counties);
        //console.log(countiess);
        //console.log(vis.width);
        //console.log(vis.height);
        vis.projection.fitSize([vis.width, vis.height], countiess);

        vis.g = vis.svg.append("g")
            .attr('transform', 'translate(' + vis.config.margin.left + ',' + vis.config.margin.top + ')')
            .attr('width', vis.width + vis.config.margin.left + vis.config.margin.right)
            .attr('height', vis.height + vis.config.margin.top + vis.config.margin.bottom)

        vis.counties = vis.g.append("g")
            .selectAll("path")
            .data(topojson.feature(vis.us, vis.us.objects.counties).features)
            .enter().append("path")
            .attr("d", vis.path)
            .attr('fill', d => {
                if (d.properties.county == "Cook") {
                    console.log(d.properties.value);
                }
                if (d.properties.value) {
                    //console.log(d.properties.value);
                    return vis.colorScale(d.properties.value);
                } else {
                    return 'url(#lightstripe)';
                }
            });

        //console.log('contnties')
        //console.log(vis.counties);

        vis.counties
            .on('mousemove', (d, event) => {
                //console.log(d);
                //console.log(event);

                let valuedata = event.properties.value ? event.properties.value : "no data";
                let namedata = event.properties.county ? event.properties.county : "no data";
                let statedata = event.properties.state ? event.properties.state : "no data";

                d3.select(vis.tp)
                    .style('display', 'block')
                    .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')
                    .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                    .html(`
                        <div class="tooltip-title">${namedata}</div>
                        <div>${statedata}</div>
                        <div>${valuedata}</div>
                      `);
            })
            .on('mouseleave', () => {
                d3.select(vis.tp).style('display', 'none');
            });

        vis.g.append("path")
            .datum(topojson.mesh(vis.us, vis.us.objects.states, function (a, b) { return a !== b; }))
            .attr("id", "state-borders")
            .attr("d", vis.path);
    }
}
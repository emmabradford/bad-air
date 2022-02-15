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
        // this.config = _config;

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
            // .attr('class', 'center-container')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // vis.svg.append('rect')
        // //.attr('class', 'background center-container')
        // .attr('height', vis.config.containerWidth) //height + margin.top + margin.bottom)
        // .attr('width', vis.config.containerHeight) //width + margin.left + margin.right)
        // .on('click', vis.clicked);

        // vis.projection = d3.geoAlbersUsa()
        //     .translate([vis.width / 2, vis.height / 2])
        //     .scale(vis.width);

        // vis.colorScale = d3.scaleLinear()
        //     .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.value))
        //     .range(['#cfe2f2', '#0d306b'])
        //     .interpolate(d3.interpolateHcl);

        // vis.path = d3.geoPath()
        //     .projection(vis.projection);

        // vis.linearGradient = vis.svg.append('defs').append('linearGradient')
        //     .attr("id", "legend-gradient");

        // vis.legend = vis.chart.append('g')
        //     .attr('class', 'legend')
        //     .attr('transform', `translate(${vis.config.legendLeft},${vis.height - vis.config.legendBottom})`);

        // vis.legendRect = vis.legend.append('rect')
        //     .attr('width', vis.config.legendRectWidth)
        //     .attr('height', vis.config.legendRectHeight);
        vis.updateVis()
    }

    updateVis() {


        let vis = this;
      //  vis.g.selectAll("path") .remove(); 
        // vis.counties = vis.g.append("g")
        //         .attr("id", "counties")
        //         .selectAll("path")
        //         .data(topojson.feature(vis.us, vis.us.objects.counties).features)
        //         .enter().append("path")
        console.log(vis.data);
        // vis.chart.selectAll('path')
        //     .data([])
        //     .exit().remove();

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
            //.attr('class', 'center-container center-items us-state')
            .attr('transform', 'translate(' + vis.config.margin.left + ',' + vis.config.margin.top + ')')
            .attr('width', vis.width + vis.config.margin.left + vis.config.margin.right)
            .attr('height', vis.height + vis.config.margin.top + vis.config.margin.bottom)

        vis.counties = vis.g.append("g")
            // .attr("id", "counties")
            .selectAll("path")
            .data(topojson.feature(vis.us, vis.us.objects.counties).features)
            .enter().append("path")
            .attr("d", vis.path)
            // .attr("class", "county-boundary")
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
        // vis.countyPath = vis.chart.selectAll('.county')
        //     .data(countiess.features)
        //     .join('path')
        //     .attr("class", "country")
        //     .attr("d", vis.geoPath)
        //     .attr("fill", (d) => {
        //         if (d.properties.value) {
        //             return vis.colorScale(d.properties.value);
        //         } else {
        //             return "url(#lightstripe)";
        //         }
        //     });

        vis.counties
            //vis.countyPath
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
    updateColors(){

    }

    // deleteVis() {
    //     let vis = this;
    //     //svg.selectAll('*').remove();
    //     //vis.selectAll('*').remove();
    //     //d3.selectAll('#map').remove();
    //     vis.chart.selectAll('path')
    //         .data([])
    //         .exit().remove();
    //     // d3.select('.div')
    //     // .html(`
    //     // <div class="viz"></div>

    //     // <svg id = 'map' height="5" width="5" xmlns="http://www.w3.org/2000/svg" version="1.1"> <defs> <pattern id="lightstripe" patternUnits="userSpaceOnUse" width="5" height="5"> <image xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1JyBoZWlnaHQ9JzUnPgogIDxyZWN0IHdpZHRoPSc1JyBoZWlnaHQ9JzUnIGZpbGw9J3doaXRlJy8+CiAgPHBhdGggZD0nTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVonIHN0cm9rZT0nIzg4OCcgc3Ryb2tlLXdpZHRoPScxJy8+Cjwvc3ZnPg==" x="0" y="0" width="5" height="5"> </image> </pattern> </defs></svg>

    //     //               `);
    // }

    // updateVis() {
    //     vis.chart.selectAll('path')
    //         .data([])
    //         .exit().remove();

    //     vis.counties = vis.g.append("g")
    //         .attr("id", "counties")
    //         .selectAll("path")
    //         .data(topojson.feature(vis.us, vis.us.objects.counties).features)
    //         .enter().append("path")
    //         .attr("d", vis.path)
    //         // .attr("class", "county-boundary")
    //         .attr('fill', d => {
    //             if (d.properties.value) {
    //                 return vis.colorScale(d.properties.value);
    //             } else {
    //                 return 'url(#lightstripe)';
    //             }
    //         });
    // }
}
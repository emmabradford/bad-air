class StackChart {
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
        vis.tb;
        vis.width =
            vis.config.containerWidth -
            vis.config.margin.left -
            vis.config.margin.right;
        vis.height =
            vis.config.containerHeight -
            vis.config.margin.top -
            vis.config.margin.bottom;

        vis.colorPalette = d3.scaleOrdinal(d3.schemeTableau10);
        vis.colorPalette.domain("co", "no2", "ozone", "pm2", "pm10", "so2");

        vis.xScale = d3
            .scaleBand()
            .range([0, vis.width])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        //vis.yScale = d3.scaleLinear().range([vis.height, 0]).nice();
        vis.yScale = d3.scaleLinear().range([vis.height, 0]).nice();


        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale).ticks(10);

        vis.svg = d3
            .select(vis.config.parentElement)
            .attr("width", vis.config.containerWidth)
            .attr("height", vis.config.containerHeight);

        vis.chart = vis.svg
            .append("g")
            .attr(
                "transform",
                `translate(${vis.config.margin.left},${vis.config.margin.top})`
            );

        vis.xAxisG = vis.chart
            .append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0,${vis.height})`);

        vis.yAxisG = vis.chart.append("g").attr("class", "axis y-axis");

        vis.stack = d3.stack().keys(["co", "no2", "ozone", "pm2", "pm10", "so2"]);

        vis.xlabel = 'AQI';
        vis.ylabel = 'years';

        // vis.svg.append("text")
        //     .attr("class", "x label")
        //     .attr("x", -(vis.height / 2))
        //     .attr("y", 15)
        //     .style("text-anchor", "middle")
        //     .text("Population");

        // vis.svg.append("text")
        //     .attr("class", "y label")
        //     .attr("text-anchor", "end")
        //     .attr("x", vis.width)
        //     .attr("y", vis.height - 6)
        //     .text(vis.ylabel);

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // vis.svg.append("text")
        // //.attr("transform", "translate(" + (vis.width/2) + " ," + (vis.height-10) + ")")
        // .style("text-anchor", "end")
        // .attr("x", (vis.width))
        // .attr("y", vis.height-6)
        // .text("Year");

        vis.keys = ["co", "no2", "ozone", "pm2", "pm10", "so2"];
        // console.log(vis.keysAll);
        // console.log(vis.keys);

        vis.svg.selectAll("mydots")
            .data(vis.keys)
            .enter()
            .append("circle")
            .attr("cx", 500)
            .attr("cy", function (d, i) { return 15 + i * 10 }) 
            .attr("r", 4)
            .style("fill", function (d) { return vis.colorPalette(d) })

        // Add one dot in the legend for each name.
        vis.svg.selectAll("mylabels")
            .data(vis.keys)
            .enter()
            .append("text")
            .attr("x", 520)
            .attr("y", function (d, i) { return 15 + i * 10 }) 
            .style("fill", function (d) { return vis.colorPalette(d) })
            .text(function (d) { return d })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        vis.svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", vis.width)
            .attr("y", vis.height - 6)
            .text(vis.ylabel);

        vis.svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(vis.height/2))
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("AQI");

        vis.title = ''
        vis.svg.append("text")
            .attr("x", vis.width / 2)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(vis.title);


        vis.chart.selectAll('rect')
            .data([])
            .exit().remove();

        let years = []
        vis.data.forEach(d => years.push(d.year));
        vis.xScale.domain(years);

        let values = []
        vis.data.forEach(d => {
            values.push(d.co + d.no2 + d.ozone + d.pm2 + d.pm10 + d.so2);

        })

        vis.yScale.domain([0, d3.max(values)+100])
        //console.log('made scales');

        vis.stackedData = vis.stack(vis.data);
        //console.log(vis.stackedData)

        vis.renderVis();
    }

    renderVis() {
        let vis = this;
        let color = '';

        vis.chart
            .selectAll("category")
            .data(vis.stackedData)
            .join("g")
            .style("fill", d => vis.colorPalette(d.key))
            .attr("class", function (d) {
                color = d.key;
                //console.log(d.key);
                `category cat-${d.key}`;
            })
            .selectAll("rect")
            .data((d) => d)
            .join("rect")

            .attr("x", (d) =>
                vis.xScale(d.data.year))

            .attr("y", (d) =>
                //console.log(d)
                vis.yScale(d[1]))
            .attr("height", (d) =>
                // console.log(vis.yScale(d[0]) - vis.yScale(d[1]));
                // console.log(vis.yScale(d[0]));
                vis.yScale(d[0]) - vis.yScale(d[1]))
            .attr("width", vis.xScale.bandwidth())
            .on('mouseover', (event, d) => {
                console.log("mouse over! ");
                console.log(event);
                console.log(d);

                d3.select(vis.tp)
                    .style('display', 'block')
                    .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')
                    .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                    .html(`
                  <div class="tooltip-title">${d.data.year}</div>
                  <ul>
                    <li> CO: ${d.data.co}</li>
                    <li> NO2: ${d.data.no2}</li>
                    <li> Ozone: ${d.data.ozone}</li>
                    <li> PM-2: ${d.data.pm2}</li>
                    <li> PM-10: ${d.data.pm10}</li>
                    <li> SO2: ${d.data.so2}</li>
                  </ul>
                `);
            })
            .on('mouseleave', () => {
                d3.select(vis.tp).style('display', 'none');
            });

        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }
}
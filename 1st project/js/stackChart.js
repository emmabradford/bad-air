class StackChart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 10, bottom: 30, right: 50, left: 50 }
        }

        this.data = _data;
        // this.data2= _data2
        console.log(this.data);
        //console.log(this.data2);
        // Call a class function
        this.initVis();
    }

    initVis() {
        let vis = this;

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

        vis.yScale = d3.scaleLinear().range([vis.height, 0]);

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

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // vis.xScale = d3.scaleLinear()
        //   .domain(d3.extent(vis.data, vis.xValue)) //d3.min(vis.data, d => d.year), d3.max(vis.data, d => d.year) );
        //.range([0, vis.width]);
        let years = []
        vis.data.forEach(d => years.push(d.year));
        vis.xScale.domain(years);

        let values = []
        vis.data.forEach(d => {
            values.push(d.co + d.no2 + d.ozone + d.pm2 + d.pm10 + d.so2 + 50);

        })

        // vis.yScale = d3.scaleLinear()
        //     //.domain([-10, d3.max(vis.data, d => d.value)])
        //     .domain(d3.extent(vis.data, vis.yValue))
        //     .range([vis.height, 0])
        //     .nice();
        vis.yScale.domain([0, d3.max(values)])
       // vis.yScale.domain([0, 600])

        console.log('made scales');

        vis.stackedData = vis.stack(vis.data);
        console.log(vis.stackedData)

        vis.renderVis();
    }

    renderVis() {
        let vis = this;

        let color = '';
        vis.chart
            .selectAll("category")
            .data(vis.stackedData)
            .join("g")
            .style("fill", d=>vis.colorPalette(d.key))
            .attr("class", function(d) {
                color = d.key;
                //console.log(d.key);
                `category cat-${d.key}`;})
            
            .selectAll("rect")
            .data((d) => d)
            .join("rect")
                // .attr('fill', function(d) {
                //     // let count = 1;
                //     // let up = 0
                //     // while(up<6){
                //     //     while(count%42!=0){
                //     //         count++
                //              console.log(vis.stackedData.keys);
                //             vis.colorPalette(vis.stackedData.keys[]);
                //     //     }
                //     //     up++;

                //     // }
                //     //console.log(color) 
                //     })
                .attr("x", (d) =>
                vis.xScale(d.data.year))

                .attr("y", (d) =>
                //console.log(d)
                    vis.yScale(d[1]))
                .attr("height", (d) =>
                // console.log(vis.yScale(d[0]) - vis.yScale(d[1]));
                // console.log(vis.yScale(d[0]));
                vis.yScale(d[0]) - vis.yScale(d[1]))
            .attr("width", vis.xScale.bandwidth());

        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
        // vis.xAxis = d3.axisBottom(vis.xScale);
        // vis.yAxis = d3.axisLeft(vis.yScale);

    }
}
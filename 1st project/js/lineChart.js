class LineChart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 200,
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
        // console.log("inside line");

        let vis = this;
        // console.log(vis.data);
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xValue = d => d.year;
        vis.yValue = d => d.value;
        vis.tp = '#tooltip';

        vis.colorPalette = d3.scaleOrdinal(d3.schemeTableau10);
        vis.colorPalette.domain("percent", "max", "median", "daysaqi");


        vis.xScale = d3.scaleLinear()
            .domain(d3.extent(vis.data, vis.xValue)) //d3.min(vis.data, d => d.year), d3.max(vis.data, d => d.year) );
            .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
            .domain([-10, d3.max(vis.data, d => d.value)])
            // .domain(d3.extent(vis.data, vis.yValue))
            .range([vis.height, 0])
            .nice();
        //console.log('made scales');

        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);

        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
            vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(vis.yAxis);

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)
            .call(vis.xAxis);
        // vis.trackingArea = vis.chart.append('rect')
        //     .attr('width', vis.width)
        //     .attr('height', vis.height)
        //     .attr('fill', 'none')
        //     .attr('pointer-events', 'all');
        // vis.tooltip = vis.chart.append('g')
        //     .attr('class', 'tooltip')
        //     .style('display', 'none');

        // vis.tooltip.append('circle')
        //     .attr('r', 4);

        // vis.tooltip.append('text');
        // vis.xAxis = d3.axisBottom(vis.xScale);
        // vis.yAxis = d3.axisLeft(vis.yScale);

        // console.log('made axis');
        // vis.xAxisG = vis.chart.append('g')
        //     .attr('class', 'axis x-axis')
        //     .attr('transform', `translate(0,${vis.height})`)
        //     .call(vis.xAxis);
        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        //might not need
        vis.chart.selectAll('path')
            .data([])
            .exit().remove();
        // console.log(vis.data);
        //console.log("inside line");

        //let vis = this;
        //console.log(vis.data);
        // vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        // vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // vis.xValue = d => d.year;
        // vis.yValue = d => d.value;

        // vis.colorPalette = d3.scaleOrdinal(d3.schemeTableau10);
        // vis.colorPalette.domain("percent", "max", "median", "daysaqi");


        vis.xScale = d3.scaleLinear()
            .domain(d3.extent(vis.data, vis.xValue)) //d3.min(vis.data, d => d.year), d3.max(vis.data, d => d.year) );
            .range([0, vis.width])
        // .nice();

        vis.yScale = d3.scaleLinear()
            .domain([-10, d3.max(vis.data, d => d.value)])
            // .domain(d3.extent(vis.data, vis.yValue))
            .range([vis.height, 0])
            .nice();

        // vis.xAxis = d3.axisBottom(vis.xScale);
        // vis.yAxis = d3.axisLeft(vis.yScale);
        console.log('made scales');

        // vis.svg = d3.select(vis.config.parentElement)
        //     .attr('width', vis.config.containerWidth)
        //     .attr('height', vis.config.containerHeight);

        // vis.chart = vis.svg.append('g')
        //     .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // vis.xAxis = d3.axisBottom(vis.xScale);
        // vis.yAxis = d3.axisLeft(vis.yScale);

        // console.log('made axis');
        // vis.xAxisG = vis.chart.append('g')
        //     .attr('class', 'axis x-axis')
        //     .attr('transform', `translate(0,${vis.height})`)
        //     .call(vis.xAxis);

        vis.groups = d3.group(vis.data, d => d.type)

        // vis.yAxisG = vis.chart.append('g')
        //     .attr('class', 'axis y-axis')
        //     .call(vis.yAxis);

        // vis.xAxisG = vis.chart.append('g')
        //     .attr('class', 'axis x-axis')
        //     .attr('transform', `translate(0,${vis.height})`)
        //     .call(vis.xAxis);
        // console.log('made axis group');
        vis.area = d3.area()
            .x(d => vis.xScale(vis.xValue(d)))
            .y1(d => vis.yScale(vis.yValue(d)))
            .y0(vis.height)

        vis.chart.append('path')
            .data([vis.data]);

        //console.log('made path');

        vis.yValueM = d => vis.data.filter(d => d.type == "median");

        vis.circles = vis.chart.selectAll('circle')
            .data(vis.data)
            //.enter()
            .join('circle') // join rerenders the data that is filered
            .attr('fill', (d) => vis.colorPalette(d.type))
            .attr('opacity', .8)
            .attr('stroke', (d) => vis.colorPalette(d.type))
            .attr('stroke-width', 2)
            .attr('r', 4)
            .attr('cy', (d) => vis.yScale(d.value))
            .attr('cx', (d) => vis.xScale(d.year));;

        // console.log("made circules");

        vis.chart.selectAll(".line")
            .data(vis.groups)
            .join("path")
            .attr('stroke', (d) => vis.colorPalette(d[0]))
            .attr('fill', "none")
            .attr('stroke-width', 2)
            .attr('d', function (d) {
                return d3.line()
                    .x(function (d) { return vis.xScale(d.year); })
                    .y(function (d) { return vis.yScale(d.value); })
                    (d[1])
            });

        vis.circles
            .on('mouseover', (event,d) => {
              console.log("mouse over! ");
              console.log(event);
              console.log(d);

            d3.select(vis.tp)
              .style('display', 'block')
              .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
              .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
              .html(`
                <div class="tooltip-title">${d.year}</div>
                <ul>
                  <li> y value: ${d.value}</li>
                  <li>days type of data: ${d.type}</li>
                </ul>
              `);
          })
          .on('mouseleave', () => {
            d3.select(vis.tp).style('display', 'none');
          });
          vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
        //console.log('made chart');
    }

}
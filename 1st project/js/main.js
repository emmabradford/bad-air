let c1 = 'Hamilton';
let c2 = 'Hamilton';
let s1 = 'Ohio';
let s2 = 'Ohio';
let y = 2021;
let cb = 'MaxAQI';
let data1;

d3.csv('data/HamiltonCountyData.csv')
  .then(data => {
    //console.log('Data loading complete. Work with dataset.');
    //console.log(data);
    data1 = data;
    data.forEach(d => {
      d.MedianAQI = +d.MedianAQI;
      d.DaysCO = +d.DaysCO;
      d.DaysNO2 = +d.DaysNO2;
      d.DaysOzone = +d.DaysOzone;
      d.DaysPM10 = +d.DaysPM10;
      d.DaysPM2 = +d.DaysPM2;
      d.DaysSO2 = +d.DaysSO2;
      d.DayswithAQI = +d.DayswithAQI;
      d.MaxAQI = +d.MaxAQI;
      d.Percentile90thAQI = +d.Percentile90thAQI;
      d.Year = +d.Year;
      d.GoodDays = +d.GoodDays;
      d.ModerateDays = +d.ModerateDays;
      d.UnhealthyforSensitiveGroupsDays = +d.UnhealthyforSensitiveGroupsDays;
      d.UnhealthyDays = +d.UnhealthyDays;
      d.VeryUnhealthyDays = +d.VeryUnhealthyDays;
      d.HazardousDays = +d.HazardousDays;
    })

    // let ids = [];
    // data.forEach(d=>ids.push(`<option value="${d.State},${d.County}">${d.State},${d.County}</option>`));
    // function onlyUnique(value, index, self) {
    //   return self.indexOf(value) === index;
    // }
    // let countyIDs = ids.filter(onlyUnique);
    // console.log(countyIDs + 'h');
    let minYear = d3.min(data, d => d.Year);
    let maxYear = d3.max(data, d => d.Year);
    // console.log(maxYear);

    let medianPerYear = []; //this will be our data for the line chart

    let choice = 'Hamilton';

    data.filter(d => d.State == s1).forEach(function (d) {
      if (d.County == choice) {
        medianPerYear.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
        medianPerYear.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
        medianPerYear.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
      }
    })
    //console.log('median year', medianPerYear);

    lines = new LineChart({
      'parentElement': '#lineChart',
      'containerHeight': 350,
      'containerWidth': 600
    }, medianPerYear);
    lines.tp = '#tooltip';
    lines.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(lines.height / 2))
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text('AQI');
    lines.svg.append("text")
    .attr("x", lines.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 1 AQI');

    let medianPerYear2 = [];
    data.filter(d => d.State == s2).forEach(function (d) {
      if (d.County == choice) {
        medianPerYear2.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
        medianPerYear2.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
        medianPerYear2.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
      }
    })

    //console.log('median year', medianPerYear);
    lines2 = new LineChart({
      'parentElement': '#lineChart2',
      'containerHeight': 350,
      'containerWidth': 600
    }, medianPerYear2);
    lines2.tp = '#tooltip1';
    lines2.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(lines2.height / 2))
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text('AQI');
    lines2.svg.append("text")
    .attr("x", lines2.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 2 AQI');

    let polutants = [];
    data.filter(d => d.State == s1).forEach(d => {
      if (d.County == choice) {
        polutants.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
      }
    })

    stacks = new StackChart({
      'parentElement': '#stackChart',
      'containerHeight': 350,
      'containerWidth': 600
    }, polutants);
    stacks.tp = '#tooltip2';
    stacks.svg.append("text")
    .attr("x", stacks.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 1 Polutants AQI');

    let polutants2 = [];
    data.filter(d => d.State == s2).forEach(d => {
      if (d.County == choice) {
        polutants2.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
      }
    })

    stacks2 = new StackChart({
      'parentElement': '#stackChart2',
      'containerHeight': 350,
      'containerWidth': 600
    }, polutants2);
    stacks2.tp = '#tooltip3';
    stacks2.svg.append("text")
    .attr("x", stacks2.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 2 Polutants AQI');

    //console.log('num days')
    let numdays = [];
    data.filter(d => d.State == s1).forEach(d => {
      if (d.County == choice) {
        if (d.Year % 4 == 0 || d.Year % 100 == 0) {
          numdays.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
        } else {
          numdays.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
        }
      }
    })

    days = new LineChart({
      'parentElement': '#lineChart1',
      'containerHeight': 350,
      'containerWidth': 600
    }, numdays);
    days.tp = '#tooltip4';
    days.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(days.height / 2))
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text('Number of Days');
      days.svg.append("text")
    .attr("x", days.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 1 Days with No Readings');

    let numdays2 = [];
    data.filter(d => d.State == s2).forEach(d => {
      if (d.County == choice) {
        if (d.Year % 4 == 0 || d.Year % 100 == 0) {
          numdays2.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
        } else {
          numdays2.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
        }
      }
    })

    days2 = new LineChart({
      'parentElement': '#lineChart12',
      'containerHeight': 350,
      'containerWidth': 600
    }, numdays2);
    days2.tp = '#tooltip5';
    days2.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(days2.height / 2))
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text('Number of Days');
      days2.svg.append("text")
    .attr("x", days2.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 2 Days with No Readings');

    let hazards = [];
    data.filter(d => d.State == s1).forEach(d => {
      if (d.County == choice) {
        if (d.Year == 2021) {
          hazards.push({ 'key': 'good', 'value': d.GoodDays })
          hazards.push({ 'key': 'hazard', 'value': d.HazardousDays })
          hazards.push({ 'key': 'unhealthy', 'value': d.UnhealthyDays })
          hazards.push({ 'key': 'moderete', 'value': d.ModerateDays })
          hazards.push({ 'key': 'unhealthyfor', 'value': d.UnhealthyforSensitiveGroupsDays })
          hazards.push({ 'key': 'very', 'value': d.VeryUnhealthyDays })
        }
      }
    })

    haz = new PieChart({
      'parentElement': '#pieChart',
      'containerHeight': 350,
      'containerWidth': 600
    }, hazards);
    haz.tp = '#tooltip6';
    haz.svg.append("text")
    .attr("x", haz.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 1 Hazardus Days Pie Chart');

    let hazards2 = [];
    data.filter(d => d.State == s2).forEach(d => {
      if (d.County == choice) {
        if (d.Year == 2021) {
          hazards2.push({ 'key': 'good', 'value': d.GoodDays })
          hazards2.push({ 'key': 'hazard', 'value': d.HazardousDays })
          hazards2.push({ 'key': 'unhealthy', 'value': d.UnhealthyDays })
          hazards2.push({ 'key': 'moderete', 'value': d.ModerateDays })
          hazards2.push({ 'key': 'unhealthyfor', 'value': d.UnhealthyforSensitiveGroupsDays })
          hazards2.push({ 'key': 'very', 'value': d.VeryUnhealthyDays })
        }
      }
    })

    haz2 = new PieChart({
      'parentElement': '#pieChart2',
      'containerHeight': 350,
      'containerWidth': 600
    }, hazards2);
    haz2.tp = '#tooltip7';
    haz2.svg.append("text")
    .attr("x", haz2.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 2 Hazardus Days Pie Chart');

    let pol = [];
    data.filter(d => d.State == s1).forEach(d => {
      if (d.County == choice) {
        if (d.Year == 2021) {
          pol.push({ 'key': 'co', 'value': d.DaysCO })
          pol.push({ 'key': 'no2', 'value': d.DaysNO2 })
          pol.push({ 'key': 'ozone', 'value': d.DaysOzone })
          pol.push({ 'key': 'so2', 'value': d.DaysSO2 })
          pol.push({ 'key': 'pm2', 'value': d.DaysPM2 })
          pol.push({ 'key': 'pm10', 'value': d.DaysPM10 })
        }
      }
    })

    pols = new PieChart({
      'parentElement': '#pieChart1',
      'containerHeight': 350,
      'containerWidth': 600
    }, pol);
    pols.tp = '#tooltip8';
    pols.svg.append("text")
    .attr("x", pols.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 1 Polutants AQI Pie Chart');

    let pol2 = [];
    data.filter(d => d.State == s2).forEach(d => {
      if (d.County == choice) {
        if (d.Year == 2021) {
          pol2.push({ 'key': 'co', 'value': d.DaysCO })
          pol2.push({ 'key': 'no2', 'value': d.DaysNO2 })
          pol2.push({ 'key': 'ozone', 'value': d.DaysOzone })
          pol2.push({ 'key': 'so2', 'value': d.DaysSO2 })
          pol2.push({ 'key': 'pm2', 'value': d.DaysPM2 })
          pol2.push({ 'key': 'pm10', 'value': d.DaysPM10 })
        }
      }
    })

    pols2 = new PieChart({
      'parentElement': '#pieChart12',
      'containerHeight': 350,
      'containerWidth': 600
    }, pol2);
    pols2.tp = '#tooltip9';
    pols2.svg.append("text")
    .attr("x", pols2.width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text('County 2 Polutants AQI Pie Chart');

    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            //console.log(countyFips[i]);
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            //  console.log(countyInfo);
            if (countyInfo.length != 0) {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': countyInfo[0].MaxAQI };
              d.properties.value = +d.properties.value;
            } else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            // console.log(d.properties);
          }
        }
      });

      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    })
      .catch(error => console.error(error));
  })

  .catch(error => {
    //console.log(error);
    console.error('Error loading the data');
  });

d3.select('#county1').on('change', function () {
  let choice1 = d3.select(this).property('value');
  let myArray = choice1.split(",");
  s1 = myArray[0];
  c1 = myArray[1];
  //console.log(choice1);
  //console.log(state);
  // console.log(c1);

  let medianPerYear1 = [];
  data1.filter(d => d.State == s1).filter(d => d.County == c1).forEach(function (d) {
    medianPerYear1.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
    medianPerYear1.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
    medianPerYear1.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
  })
  lines.data = medianPerYear1;//data1.filter(d=> d.County==county);
  lines.updateVis();

  let polutants1 = [];
  data1.filter(d => d.State == s1).filter(d => d.County == c1).forEach(function (d) {
    polutants1.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
  })

  stacks.data = polutants1;
  stacks.updateVis();

  let numdays1 = [];
  data1.filter(d => d.State == s1).filter(d => d.County == c1).forEach(function (d) {
    if (d.Year % 4 == 0 || d.Year % 100 == 0) {
      numdays1.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
    } else {
      numdays1.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
    }
  })

  days.data = numdays1;
  days.updateVis();

  let hazards1 = [];
  data1.filter(d => d.State == s1).filter(d => d.County == c1).forEach(function (d) {
    if (d.Year == y) {
      hazards1.push({ 'key': 'good', 'value': d.GoodDays })
      hazards1.push({ 'key': 'hazard', 'value': d.HazardousDays })
      hazards1.push({ 'key': 'unhealthy', 'value': d.UnhealthyDays })
      hazards1.push({ 'key': 'moderete', 'value': d.ModerateDays })
      hazards1.push({ 'key': 'unhealthyfor', 'value': d.UnhealthyforSensitiveGroupsDays })
      hazards1.push({ 'key': 'very', 'value': d.VeryUnhealthyDays })
    }
  })

  haz.data = hazards1;
  haz.updateVis();

  let pol1 = [];
  data1.filter(d => d.State == s1).filter(d => d.County == c1).forEach(function (d) {
    if (d.Year == y) {
      pol1.push({ 'key': 'co', 'value': d.DaysCO })
      pol1.push({ 'key': 'no2', 'value': d.DaysNO2 })
      pol1.push({ 'key': 'ozone', 'value': d.DaysOzone })
      pol1.push({ 'key': 'so2', 'value': d.DaysSO2 })
      pol1.push({ 'key': 'pm2', 'value': d.DaysPM2 })
      pol1.push({ 'key': 'pm10', 'value': d.DaysPM10 })
    }
  })

  pols.data = pol1;
  pols.updateVis();
});

d3.select('#county2').on('change', function () {
  let choice1 = d3.select(this).property('value');
  let myArray = choice1.split(",");
  s2 = myArray[0];
  c2 = myArray[1];
  //console.log(choice1);
  //console.log(state);
  //console.log(c2);

  let medianPerYear12 = [];
  data1.filter(d => d.State == s2).filter(d => d.County == c2).forEach(function (d) {
    medianPerYear12.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
    medianPerYear12.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
    medianPerYear12.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
  })
  lines2.data = medianPerYear12;//data1.filter(d=> d.County==county);
  lines2.updateVis();

  let polutants12 = [];
  data1.filter(d => d.State == s2).filter(d => d.County == c2).forEach(function (d) {
    polutants12.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
  })

  stacks2.data = polutants12;
  stacks2.updateVis();

  let numdays12 = [];
  data1.filter(d => d.State == s2).filter(d => d.County == c2).forEach(function (d) {
    if (d.Year % 4 == 0 || d.Year % 100 == 0) {
      numdays12.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
    } else {
      numdays12.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
    }
  })

  days2.data = numdays12;
  days2.updateVis();

  let hazards12 = [];
  data1.filter(d => d.State == s2).filter(d => d.County == c2).forEach(function (d) {
    if (d.Year == y) {
      hazards12.push({ 'key': 'good', 'value': d.GoodDays })
      hazards12.push({ 'key': 'hazard', 'value': d.HazardousDays })
      hazards12.push({ 'key': 'unhealthy', 'value': d.UnhealthyDays })
      hazards12.push({ 'key': 'moderete', 'value': d.ModerateDays })
      hazards12.push({ 'key': 'unhealthyfor', 'value': d.UnhealthyforSensitiveGroupsDays })
      hazards12.push({ 'key': 'very', 'value': d.VeryUnhealthyDays })
    }
  })

  haz2.data = hazards12;
  haz2.updateVis();

  let pol12 = [];
  data1.filter(d => d.State == s2).filter(d => d.County == c2).forEach(function (d) {
    if (d.Year == y) {
      pol12.push({ 'key': 'co', 'value': d.DaysCO })
      pol12.push({ 'key': 'no2', 'value': d.DaysNO2 })
      pol12.push({ 'key': 'ozone', 'value': d.DaysOzone })
      pol12.push({ 'key': 'so2', 'value': d.DaysSO2 })
      pol12.push({ 'key': 'pm2', 'value': d.DaysPM2 })
      pol12.push({ 'key': 'pm10', 'value': d.DaysPM10 })
    }
  })

  pols2.data = pol12;
  //console.log('checking');
  //console.log(pols2.data);
  pols2.updateVis();
});

d3.select('#year').on('change', function () {
  y = d3.select(this).property('value');
  //console.log(y);

  let hazards1 = [];
  data1.filter(d => d.State == s1).filter(d => d.County == c1).forEach(d => {
    if (d.Year == y) {
      //console.log(d);
      hazards1.push({ 'key': 'good', 'value': d.GoodDays })
      hazards1.push({ 'key': 'hazard', 'value': d.HazardousDays })
      hazards1.push({ 'key': 'unhealthy', 'value': d.UnhealthyDays })
      hazards1.push({ 'key': 'moderete', 'value': d.ModerateDays })
      hazards1.push({ 'key': 'unhealthyfor', 'value': d.UnhealthyforSensitiveGroupsDays })
      hazards1.push({ 'key': 'very', 'value': d.VeryUnhealthyDays })
    }
  })

  haz.data = hazards1;
  haz.updateVis();

  let pol1 = [];
  data1.filter(d => d.State == s1).filter(d => d.County == c1).forEach(d => {
    if (d.Year == y) {
      pol1.push({ 'key': 'co', 'value': d.DaysCO })
      pol1.push({ 'key': 'no2', 'value': d.DaysNO2 })
      pol1.push({ 'key': 'ozone', 'value': d.DaysOzone })
      pol1.push({ 'key': 'so2', 'value': d.DaysSO2 })
      pol1.push({ 'key': 'pm2', 'value': d.DaysPM2 })
      pol1.push({ 'key': 'pm10', 'value': d.DaysPM10 })
    }
  })

  pols.data = pol1;
  pols.updateVis();

  let hazards12 = [];
  data1.filter(d => d.State == s2).filter(d => d.County == c2).forEach(function (d) {
    if (d.Year == y) {
      hazards12.push({ 'key': 'good', 'value': d.GoodDays })
      hazards12.push({ 'key': 'hazard', 'value': d.HazardousDays })
      hazards12.push({ 'key': 'unhealthy', 'value': d.UnhealthyDays })
      hazards12.push({ 'key': 'moderete', 'value': d.ModerateDays })
      hazards12.push({ 'key': 'unhealthyfor', 'value': d.UnhealthyforSensitiveGroupsDays })
      hazards12.push({ 'key': 'very', 'value': d.VeryUnhealthyDays })
    }
  })

  haz2.data = hazards12;
  haz2.updateVis();

  let pol12 = [];
  data1.filter(d => d.State == s2).filter(d => d.County == c2).forEach(function (d) {
    if (d.Year == y) {
      pol12.push({ 'key': 'co', 'value': d.DaysCO })
      pol12.push({ 'key': 'no2', 'value': d.DaysNO2 })
      pol12.push({ 'key': 'ozone', 'value': d.DaysOzone })
      pol12.push({ 'key': 'so2', 'value': d.DaysSO2 })
      pol12.push({ 'key': 'pm2', 'value': d.DaysPM2 })
      pol12.push({ 'key': 'pm10', 'value': d.DaysPM10 })
    }
  })

  pols2.data = pol12;
  pols2.updateVis();

  if (cb == 'DominatPolutant') {
    choroplethMap.g.selectAll("path").remove();
    choroplethMap.g.select('svg').remove();

    choroplethMap.svg
      .attr("width", 0)
      .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            console.log(countyFips[i]);
            //console.log(y)
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            //console.log(countyInfo[0]);
            if (countyInfo.length != 0) {
              let polutantInfo = [countyInfo[0].DaysCO, countyInfo[0].DaysNO2, countyInfo[0].DaysOzone, countyInfo[0].DaysPM2, countyInfo[0].DaysPM10, countyInfo[0].DaysSO2];
              //console.log(polutantInfo);
              let maxpolval = polutantInfo.reduce(function (p, v) {
                return (p > v ? p : v);
              })
              //console.log(maxpolval);
              //console.log(Object.keys(polutantInfo).reduce(function(a, b){ return polutantInfo[a] > polutantInfo[b] ? a : b }));
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': maxpolval };
              d.properties.value = +d.properties.value;
            } else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            //console.log(d.properties);
          }
        }
      });
      console.log('new');

      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    }).catch(error => console.error(error));
  }
  else if (cb == 'MedianAQI') {
    choroplethMap.g.selectAll("path").remove();
    choroplethMap.g.select('svg').remove();

    choroplethMap.svg
      .attr("width", 0)
      .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            //console.log(countyFips[i]);
            //console.log(y)
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            // console.log(countyInfo[0]);
            if (countyInfo.length != 0) {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': countyInfo[0].MedianAQI };
              d.properties.value = +d.properties.value;
            }
            else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            //console.log(d.properties);
          }
        }
      });
      console.log('new');

      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    }).catch(error => console.error(error));
  }
  else if (cb == 'Percentile90thAQI') {
    choroplethMap.g.selectAll("path").remove();
    choroplethMap.g.select('svg').remove();

    choroplethMap.svg
      .attr("width", 0)
      .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            //console.log(countyFips[i]);
            //console.log(y)
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            // console.log(countyInfo[0]);
            if (countyInfo.length != 0) {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': countyInfo[0].Percentile90thAQI };
              d.properties.value = +d.properties.value;
            }
            else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            //console.log(d.properties);
          }
        }
      });
      console.log('new');

      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    }).catch(error => console.error(error));
  }
  else if (cb == 'MaxAQI') {
    choroplethMap.g.selectAll("path").remove();
    choroplethMap.g.select('svg').remove();

    choroplethMap.svg
      .attr("width", 0)
      .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {        
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            //console.log(countyFips[i]);
            //console.log(y)
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            // console.log(countyInfo[0]);
            if (countyInfo.length != 0) {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': countyInfo[0].MaxAQI };
              d.properties.value = +d.properties.value;
            }
            else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            //console.log(d.properties);
          }
        }
      });
      console.log('new');
  
      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    }).catch(error => console.error(error));
  }
});

d3.select('#ColorBy').on('change', function () {
  cb = d3.select(this).property('value');
  if (cb == 'DominatPolutant') {
    choroplethMap.g.selectAll("path").remove();
    choroplethMap.g.select('svg').remove();

    choroplethMap.svg
      .attr("width", 0)
      .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {  
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            //console.log(countyFips[i]);
            //console.log(y)
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            console.log(countyInfo[0]);
            //console.log(Object.keys(countyInfo).reduce(function(a, b){ return obj[a] > obj[b] ? a : b }));
            if (countyInfo.length != 0) {
              let polutantInfo = [countyInfo[0].DaysCO, countyInfo[0].DaysNO2, countyInfo[0].DaysOzone, countyInfo[0].DaysPM2, countyInfo[0].DaysPM10, countyInfo[0].DaysSO2];
              //console.log(polutantInfo);
              let maxpolval = polutantInfo.reduce(function (p, v) {
                return (p > v ? p : v);
              })
              //console.log(maxpolval);
              //console.log(Object.keys(polutantInfo).reduce(function(a, b){ return polutantInfo[a] > polutantInfo[b] ? a : b }));
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': maxpolval };
              d.properties.value = +d.properties.value;
            }
            else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            //console.log(d.properties);
          }
        }
      });
      console.log('new');

      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    }).catch(error => console.error(error));
  }
  else if (cb == 'MedianAQI') {
    choroplethMap.g.selectAll("path").remove();
    choroplethMap.g.select('svg').remove();

    choroplethMap.svg
      .attr("width", 0)
      .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            //console.log(countyFips[i]);
            //console.log(y)
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            // console.log(countyInfo[0]);
            if (countyInfo.length != 0) {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': countyInfo[0].MedianAQI };
              d.properties.value = +d.properties.value;
            }
            else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            //console.log(d.properties);
          }
        }
      });
      console.log('new');

      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    }).catch(error => console.error(error));
  }
  else if (cb == 'Percentile90thAQI') {
    choroplethMap.g.selectAll("path").remove();
    choroplethMap.g.select('svg').remove();

    choroplethMap.svg
      .attr("width", 0)
      .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");
    
    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            //console.log(countyFips[i]);
            //console.log(y)
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            // console.log(countyInfo[0]);
            if (countyInfo.length != 0) {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': countyInfo[0].Percentile90thAQI };
              d.properties.value = +d.properties.value;
            }
            else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            //console.log(d.properties);
          }
        }
      });
      console.log('new');
      
      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    }).catch(error => console.error(error));
  }
  else if (cb == 'MaxAQI') {
    choroplethMap.g.selectAll("path").remove();
    choroplethMap.g.select('svg').remove();

    choroplethMap.svg
      .attr("width", 0)
      .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");
    
    Promise.all([
      d3.json('data/counties-10m.json'),
      d3.csv('data/fips.csv')
    ]).then(dataMap => {
      geoData = dataMap[0];
      countyFips = dataMap[1];
      //console.log(geoData);

      geoData.objects.counties.geometries.forEach(d => {
        for (let i = 0; i < countyFips.length; i++) {
          if (d.id == countyFips[i].cnty_fips) {
            // console.log(d);
            //console.log(countyFips[i]);
            //console.log(y)
            let countyInfo = data1.filter(d => d.Year == y).filter(d => d.State == countyFips[i].state).filter(d => d.County == countyFips[i].county)
            // console.log(countyInfo[0]);
            if (countyInfo.length != 0) {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': countyInfo[0].MaxAQI };
              d.properties.value = +d.properties.value;
            }
            else {
              d.properties = { 'county': countyFips[i].county, 'state': countyFips[i].state, 'value': 0 };
              d.properties.value = +d.properties.value;
            }
            //console.log(d.properties);
          }
        }
      });
      //console.log('new');

      choroplethMap = new ChoroplethMap({
        parentElement: '.viz'
      }, dataMap[0]);
      choroplethMap.tp = '#tooltip10';
    }).catch(error => console.error(error));
  }

});
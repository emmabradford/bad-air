console.log("Hello world");
let c1 = 'Hamilton';
let c2 = 'Hamilton';
let y = 2021;
d3.csv('data/HamiltonCountyData.csv')
  .then(data => {
    //console.log('Data loading complete. Work with dataset.');
    console.log(data);
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

    }

    )
    let minYear = d3.min(data, d => d.Year);
    let maxYear = d3.max(data, d => d.Year);
   // console.log(maxYear);

    let medianPerYear = []; //this will be our data for the line chart

    let choice = 'Hamilton';

    data.forEach(function (d) {
      if (d.County == choice) {
        medianPerYear.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
        medianPerYear.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
        medianPerYear.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
      }
    })
    //console.log('median year', medianPerYear);
    //}
    lines = new LineChart({

      'parentElement': '#lineChart',

      'containerHeight': 400,
      'containerWidth': 650
    }, medianPerYear);

    let medianPerYear2 = [];
    data.forEach(function (d) {
      if (d.County == choice) {
        medianPerYear2.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
        medianPerYear2.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
        medianPerYear2.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
      }
    })
    //console.log('median year', medianPerYear);
    lines2 = new LineChart({

      'parentElement': '#lineChart2',

      'containerHeight': 400,
      'containerWidth': 650
    }, medianPerYear2);

    let polutants = [];
    data.forEach(d => {
      if (d.County == choice) {
        polutants.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
      }
    }
    )

    stacks = new StackChart({

      'parentElement': '#stackChart',

      'containerHeight': 400,
      'containerWidth': 650
    }, polutants);

    let polutants2 = [];
    data.forEach(d => {
      if (d.County == choice) {
        polutants2.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
      }
    }
    )

    stacks2 = new StackChart({

      'parentElement': '#stackChart2',

      'containerHeight': 400,
      'containerWidth': 650
    }, polutants2);


    //console.log('num days')
    let numdays = [];
    data.forEach(d => {
      if (d.County == choice) {
        if (d.Year % 4 == 0 || d.Year % 100 == 0) {
          numdays.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
        }
        else {
          numdays.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
        }
      }
    }
    )

    days = new LineChart({

      'parentElement': '#lineChart1',
      'containerHeight': 400,
      'containerWidth': 650
    }, numdays);

    let numdays2 = [];
    data.forEach(d => {
      if (d.County == choice) {
        if (d.Year % 4 == 0 || d.Year % 100 == 0) {
          numdays2.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
        }
        else {
          numdays2.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
        }
      }
    }
    )

    days2 = new LineChart({

      'parentElement': '#lineChart12',
      'containerHeight': 400,
      'containerWidth': 650
    }, numdays2);

    let hazards = [];
    data.forEach(d => {
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
      'containerHeight': 400,
      'containerWidth': 650
    }, hazards);

    let hazards2 = [];
    data.forEach(d => {
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
      'containerHeight': 400,
      'containerWidth': 650
    }, hazards2);

    let pol = [];
    data.forEach(d => {
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
      'containerHeight': 400,
      'containerWidth': 650
    }, pol);

    let pol2 = [];
    data.forEach(d => {
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
      'containerHeight': 400,
      'containerWidth': 650
    }, pol2);
  })

  .catch(error => {
    //console.log(error);
    console.error('Error loading the data');
  });

d3.select('#county1').on('change', function () {
  let choice1 = d3.select(this).property('value');
  let myArray = choice1.split(",");
  let state = myArray[0];
  c1 = myArray[1];
  //console.log(choice1);
  //console.log(state);
  console.log(c1);

  let medianPerYear1 = [];
  data1.filter(d => d.County == c1).forEach(function (d) {
    medianPerYear1.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
    medianPerYear1.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
    medianPerYear1.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
  })
  lines.data = medianPerYear1;//data1.filter(d=> d.County==county);
  lines.updateVis();

  let polutants1 = [];
  data1.filter(d => d.County == c1).forEach(d => {
    //if (d.County == choice){
    polutants1.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
  }
  )
  stacks.data = polutants1;
  stacks.updateVis();

  let numdays1 = [];
  data1.filter(d => d.County == c1).forEach(d => {
    // if (d.County == choice){
    if (d.Year % 4 == 0 || d.Year % 100 == 0) {
      numdays1.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
    }
    else {
      numdays1.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
    }
  }
  )
  days.data = numdays1;
  days.updateVis();

  let hazards1 = [];
  data1.filter(d => d.County == c1).forEach(d => {
    // if (d.County == choice){
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
  data1.filter(d => d.County == c1).forEach(d => {
    // if (d.County == choice){
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
  let state = myArray[0];
  c2 = myArray[1];
  //console.log(choice1);
  //console.log(state);
  console.log(c2);

  let medianPerYear12 = [];
  data1.filter(d => d.County == c2).forEach(function (d) {
    medianPerYear12.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
    medianPerYear12.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
    medianPerYear12.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
  })
  lines2.data = medianPerYear12;//data1.filter(d=> d.County==county);
  lines2.updateVis();

  let polutants12 = [];
  data1.filter(d => d.County == c2).forEach(d => {
    //if (d.County == choice){
    polutants12.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
  }
  )
  stacks2.data = polutants12;
  stacks2.updateVis();

  let numdays12 = [];
  data1.filter(d => d.County == c2).forEach(d => {
    // if (d.County == choice){
    if (d.Year % 4 == 0 || d.Year % 100 == 0) {
      numdays12.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
    }
    else {
      numdays12.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
    }
  }
  )
  days2.data = numdays12;
  days2.updateVis();

  let hazards12 = [];
  data1.filter(d => d.County == c2).forEach(d => {
    // if (d.County == choice){
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
  data1.filter(d => d.County == c2).forEach(d => {
    // if (d.County == choice){
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

});

d3.select('#year').on('change', function () {

  y = d3.select(this).property('value');
  console.log(y);

  let hazards1 = [];
  data1.filter(d => d.County == c1).forEach(d => {
  //  data1.forEach(d => {
    // if (d.County == choice){
    if (d.Year == y) {
      console.log(d);
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
  data1.filter(d => d.County == c1).forEach(d => {
    // if (d.County == choice){
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
  data1.filter(d => d.County == c2).forEach(d => {
    // if (d.County == choice){
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
  data1.filter(d => d.County == c2).forEach(d => {
    // if (d.County == choice){
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


});
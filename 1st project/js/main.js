console.log("Hello world");
d3.csv('data/HamiltonCountyData.csv')
  .then(data => {
    console.log('Data loading complete. Work with dataset.');
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
    console.log(maxYear);

    let medianPerYear = []; //this will be our data for the line chart
    let medianPerYear2 = [];

    let choice = 'Hamilton';
    data.forEach(function (d) {
      //medianPerYear2.push( {"year": d.Year, "medianAQI":d.MedianAQI, "percentile90th": d.Percentile90thAQI, "maxAQI": d.MaxAQI});
      // medianPerYear2.push( {"year": d.Year, values: {

      //       max: d.MaxAQI,
      //       median: d.MedianAQI,
      //       percent: d.Percentile90thAQI
      // }});
      if (d.County == choice){
      medianPerYear.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
      medianPerYear.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
      medianPerYear.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
    }
    })
    console.log('median year', medianPerYear);
    //}
    lines = new LineChart({

      'parentElement': '#lineChart',

      'containerHeight': 500,
      'containerWidth': 1000
    }, medianPerYear);

    let polutants = [];

    data.forEach(d => {
      if (d.County == choice){
      polutants.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
    }}
    )

     stacks = new StackChart({

      'parentElement': '#stackChart',

      'containerHeight': 500,
      'containerWidth': 1000
    }, polutants);


    console.log('num days')
    let numdays = [];
    data.forEach(d => {
      if (d.County == choice){
      if (d.Year % 4 == 0 || d.Year % 100 == 0) {
        numdays.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
      }
      else {
        numdays.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
      }
      }}
    )

     days = new LineChart({

      'parentElement': '#lineChart1',
      'containerHeight': 500,
      'containerWidth': 1000
    }, numdays);

    let hazards = [];
    data.forEach(d => {
      if (d.County == choice){
      if (d.Year == 2021) {
      hazards.push({'key': 'good', 'value':d.GoodDays})
      hazards.push({'key': 'hazard', 'value':d.HazardousDays})
      hazards.push({'key': 'unhealthy', 'value':d.UnhealthyDays})
      hazards.push({'key': 'moderete', 'value':d.ModerateDays})
      hazards.push({'key': 'unhealthyfor', 'value':d.UnhealthyforSensitiveGroupsDays})
      hazards.push({'key': 'very', 'value':d.VeryUnhealthyDays})
    }}})
    // data.forEach(d => {
    //   if (d.Year == 2021) {
    //     let sum = d.GoodDays + d.HazardousDays + d.VeryUnhealthyDays + d.UnhealthyforSensitiveGroupsDays + d.UnhealthyDays + d.ModerateDays;
    //     hazards.push({  'good': d.GoodDays / sum, 'hazard': d.HazardousDays / sum, 'unhealthy': d.UnhealthyDays / sum, 'moderete': d.ModerateDays / sum, 'unhealthyfor': d.UnhealthyforSensitiveGroupsDays / sum, 'very': d.VeryUnhealthyDays / sum })
    //   }
    // })

    haz = new PieChart({

      'parentElement': '#pieChart',
      'containerHeight': 500,
      'containerWidth': 00
    }, hazards);

    let pol = [];
    data.forEach(d => {
      if (d.County == choice){
      if (d.Year == 2021) {

        pol.push({'key': 'co', 'value':d.DaysCO})
        pol.push({'key': 'no2', 'value':d.DaysNO2})
        pol.push({'key': 'ozone', 'value':d.DaysOzone})
        pol.push({'key': 'so2', 'value':d.DaysSO2})
        pol.push({'key': 'pm2', 'value':d.DaysPM2})
        pol.push({'key': 'pm10', 'value':d.DaysPM10})
    }}
  })

    pols = new PieChart({

      'parentElement': '#pieChart1',
      'containerHeight': 500,
      'containerWidth': 00
    }, pol);
  })

  .catch(error => {
    console.log(error);
    console.error('Error loading the data');
  });

  d3.select('#county1').on('change', function(){
    let choice1 = d3.select(this).property('value');
    let myArray = choice1.split(",");
    let state = myArray[0];
    let county = myArray[1];
    console.log(choice1);
    console.log(state);
    console.log(county);

    let medianPerYear1=[];
    data1.filter(d=> d.County==county).forEach(function (d) {
      //medianPerYear2.push( {"year": d.Year, "medianAQI":d.MedianAQI, "percentile90th": d.Percentile90thAQI, "maxAQI": d.MaxAQI});
      // medianPerYear2.push( {"year": d.Year, values: {

      //       max: d.MaxAQI,
      //       median: d.MedianAQI,
      //       percent: d.Percentile90thAQI
      // }});
      medianPerYear1.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
      medianPerYear1.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
      medianPerYear1.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });
    })
    lines.data = medianPerYear1;//data1.filter(d=> d.County==county);
    lines.updateVis();

    let polutants1 = [];
    data1.filter(d=> d.County==county).forEach(d => {
      //if (d.County == choice){
      polutants1.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })
    }
    )
    stacks.data = polutants1;
    stacks.updateVis();

    let numdays1 = [];
    data1.filter(d=> d.County==county).forEach(d => {
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
    data1.filter(d=> d.County==county).forEach(d => {
     // if (d.County == choice){
      if (d.Year == 2021) {
      hazards1.push({'key': 'good', 'value':d.GoodDays})
      hazards1.push({'key': 'hazard', 'value':d.HazardousDays})
      hazards1.push({'key': 'unhealthy', 'value':d.UnhealthyDays})
      hazards1.push({'key': 'moderete', 'value':d.ModerateDays})
      hazards1.push({'key': 'unhealthyfor', 'value':d.UnhealthyforSensitiveGroupsDays})
      hazards1.push({'key': 'very', 'value':d.VeryUnhealthyDays})
    }})

    haz.data = hazards1;
    haz.updateVis();
    
    let pol1 = [];
    data1.filter(d=> d.County==county).forEach(d => {
     // if (d.County == choice){
      if (d.Year == 2021) {

        pol1.push({'key': 'co', 'value':d.DaysCO})
        pol1.push({'key': 'no2', 'value':d.DaysNO2})
        pol1.push({'key': 'ozone', 'value':d.DaysOzone})
        pol1.push({'key': 'so2', 'value':d.DaysSO2})
        pol1.push({'key': 'pm2', 'value':d.DaysPM2})
        pol1.push({'key': 'pm10', 'value':d.DaysPM10})
    }
  })
  pols.data = pol1;
    pols.updateVis();

  });
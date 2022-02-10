console.log("Hello world");
d3.csv('data/HamiltonCountyData.csv')
  .then(data => {
    console.log('Data loading complete. Work with dataset.');
    console.log(data);
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

    data.forEach(function (d) {
      //medianPerYear2.push( {"year": d.Year, "medianAQI":d.MedianAQI, "percentile90th": d.Percentile90thAQI, "maxAQI": d.MaxAQI});
      // medianPerYear2.push( {"year": d.Year, values: {

      //       max: d.MaxAQI,
      //       median: d.MedianAQI,
      //       percent: d.Percentile90thAQI
      // }});

      medianPerYear.push({ "year": d.Year, "value": d.MedianAQI, "type": "median" });
      medianPerYear.push({ "year": d.Year, "value": d.MaxAQI, "type": "max" });
      medianPerYear.push({ "year": d.Year, "value": d.Percentile90thAQI, "type": "percent" });

    })
    console.log('median year', medianPerYear);
    //}
    let lines = new LineChart({

      'parentElement': '#lineChart',

      'containerHeight': 500,
      'containerWidth': 1000
    }, medianPerYear);

    let polutants = [];

    data.forEach(d =>
      polutants.push({ "year": d.Year, "co": d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2, "pm2": d.DaysPM2, "pm10": d.DaysPM10 })

    )

    let stacks = new StackChart({

      'parentElement': '#stackChart',

      'containerHeight': 500,
      'containerWidth': 1000
    }, polutants);


    console.log('num days')
    let numdays = [];
    data.forEach(d => {
      if (d.Year % 4 == 0 || d.Year % 100 == 0) {
        numdays.push({ "year": d.Year, "value": 366 - d.DayswithAQI, "type": "daysaqi" })
      }
      else {
        numdays.push({ "year": d.Year, "value": 365 - d.DayswithAQI, "type": "daysaqi" })
      }
    }
    )

    let days = new LineChart({

      'parentElement': '#lineChart1',
      'containerHeight': 500,
      'containerWidth': 1000
    }, numdays);

    let hazards = [];
    data.forEach(d => {
      if (d.Year == 2021) {
      hazards.push({'key': 'good', 'value':d.GoodDays})
      hazards.push({'key': 'hazard', 'value':d.HazardousDays})
      hazards.push({'key': 'unhealthy', 'value':d.UnhealthyDays})
      hazards.push({'key': 'moderete', 'value':d.ModerateDays})
      hazards.push({'key': 'unhealthyfor', 'value':d.UnhealthyforSensitiveGroupsDays})
      hazards.push({'key': 'very', 'value':d.VeryUnhealthyDays})
    }})
    // data.forEach(d => {
    //   if (d.Year == 2021) {
    //     let sum = d.GoodDays + d.HazardousDays + d.VeryUnhealthyDays + d.UnhealthyforSensitiveGroupsDays + d.UnhealthyDays + d.ModerateDays;
    //     hazards.push({  'good': d.GoodDays / sum, 'hazard': d.HazardousDays / sum, 'unhealthy': d.UnhealthyDays / sum, 'moderete': d.ModerateDays / sum, 'unhealthyfor': d.UnhealthyforSensitiveGroupsDays / sum, 'very': d.VeryUnhealthyDays / sum })
    //   }
    // })

    let haz = new PieChart({

      'parentElement': '#pieChart',
      'containerHeight': 500,
      'containerWidth': 1000
    }, hazards);
  })




  .catch(error => {
    console.log(error);
    console.error('Error loading the data');
  });
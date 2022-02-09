console.log("Hello world");
d3.csv('data/HamiltonCountyData.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);
    data.forEach(d=>{
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
      
    }
      
      )
    let minYear = d3.min( data, d => d.Year);
  	let maxYear = d3.max( data, d=> d.Year );
    console.log(maxYear);

  	let medianPerYear = []; //this will be our data for the line chart
    let medianPerYear2 =[];

      data.forEach(function (d)
      {
  		  //medianPerYear2.push( {"year": d.Year, "medianAQI":d.MedianAQI, "percentile90th": d.Percentile90thAQI, "maxAQI": d.MaxAQI});
  		  // medianPerYear2.push( {"year": d.Year, values: {
        
        //       max: d.MaxAQI,
        //       median: d.MedianAQI,
        //       percent: d.Percentile90thAQI
        // }});
        
        medianPerYear.push({"year": d.Year, "value":d.MedianAQI, "type": "median"});
        medianPerYear.push({"year": d.Year, "value":d.MaxAQI, "type": "max"});
        medianPerYear.push({"year": d.Year, "value":d.Percentile90thAQI, "type": "percent"});

      })
      console.log('median year', medianPerYear);
  	//}
    let lines = new LineChart({
			
			'parentElement': '#lineChart',

			'containerHeight': 1100,
                        'containerWidth': 1000
		}, medianPerYear );

    let polutants =[];

    data.forEach(d=>
      polutants.push({"year": d.Year, "co":d.DaysCO, "no2": d.DaysNO2, "ozone": d.DaysOzone, "so2": d.DaysSO2,"pm2": d.DaysPM2, "pm10":d.DaysPM10})

    )

    // let stacks = new StackChart({
			
		// 	'parentElement': '#stackChart',

		// 	'containerHeight': 1100,
    //                     'containerWidth': 1000
		// }, polutants );


    console.log('num days')
    let numdays = [];
    data.forEach(d=>
      numdays.push({"year": d.Year, "value":365-d.DayswithAQI, "type":"daysaqi"})
    )

    let days = new LineChart({
			
			'parentElement': '#lineChart1',

			'containerHeight': 1100,
                        'containerWidth': 1000
		}, numdays );


})
.catch(error => {
	console.log(error);
    console.error('Error loading the data');
});
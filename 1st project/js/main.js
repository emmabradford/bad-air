console.log("Hello world");
d3.csv('data/HamiltonCountyData.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);
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


    console.log('num days')
    let numdays = [];
    data.forEach(d=>
      numdays.push({"year": d.Year, "value":365-d.DayswithAQI,type:"daysaqi"})
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
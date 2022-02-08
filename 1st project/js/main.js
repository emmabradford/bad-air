console.log("Hello world");
d3.csv('data/HamiltonCountyData.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);
    let minYear = d3.min( data, d => d.Year);
  	let maxYear = d3.max( data, d=> d.Year );
    console.log(maxYear);

  	let medianPerYear = []; //this will be our data for the line chart

      data.forEach(function (d)
      {
  		  //medianPerYear.push( {"year": d.Year, "medianAQI":d.MedianAQI, "percentile90th": d.Percentile90thAQI, "maxAQI": d.MaxAQI});
        medianPerYear.push({"year": d.Year, "value":d.MedianAQI, "type": "median"})
        medianPerYear.push({"year": d.Year, "value":d.MaxAQI, "type": "max"})
        medianPerYear.push({"year": d.Year, "value":d.Percentile90thAQI, "type": "percent"})

      })
      console.log('median year', medianPerYear);
  	//}
    let lines = new LineChart({
			
			'parentElement': '#lineChart',

			'containerHeight': 1100,
                        'containerWidth': 1000
		}, medianPerYear);

})
.catch(error => {
	console.log(error);
    console.error('Error loading the data');
});
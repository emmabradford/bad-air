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
  		  medianPerYear.push( {"year": d.Year, "medianAQI":d.MedianAQI});
        
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
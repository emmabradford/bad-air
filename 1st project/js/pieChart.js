class PieChart {
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
}
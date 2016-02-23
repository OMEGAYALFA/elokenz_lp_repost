$(function () {
    $('#container_social_conversion').highcharts({
        chart: {
            type: 'bar',
            backgroundColor:'rgba(255, 255, 255, 0.02)'
        },
        title: {
            text: null
        },
        xAxis: [{
            categories: ['Facebook', 'Twitter', 'Google+', 'Other', 'No Referrer'],
        }, {
            linkedTo: 0,
            categories: ['10%', '25%', '10%+', '23%', '20%'],
            opposite: true,
            lineWidth: 0,
           minorGridLineWidth: 0,
           lineColor: 'transparent',
           minorTickLength: 0,
           tickLength: 0
        }],
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            },
        },
        
        exporting: {
                enabled: false
            },
        credits: {
                enabled: false
            },
            
        series: [{
            name: 'Total visits',
            data: [5, 3, 4, 7, 2],
            color: '#726aba'
        }, {
            name: 'Conversions',
            data: [2, 2, 3, 2, 1],
            color: '#5544bb'
        }],        
        tooltip: {
            formatter: function() {
                var seriesName = this.series.name;
                if(seriesName === "Total visits"){
                  return '<strong>' + this.x+ '</strong><br />Total visits : ' + this.total + '<br /> Conversions : ' + (this.total-this.y) ;
                }
                if(seriesName ==="Conversions"){
                  return '<strong>' + this.x+ '</strong><br />Total visits : ' + this.total + '<br /> Conversions : ' + (this.y) ;
                }
                return this.x;
            }
        }
    });
});

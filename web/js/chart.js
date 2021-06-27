let chart1;
let chart2;
const MAXWIDTH = 10


let _data_obj1 = {}
let _data_obj2 = {}
let _users = []

// let datas = 
//   [{
//     name: 'Installation',
//     data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
// }, 


function initDatatoContainer1(data){
  _data_obj1 = data;
  console.log(_data_obj1)
  initContainer1();
}

function addSeriestoContainer1(objData){
  chart1.addSeries(objData);
}

//objData = [{name : "test" / data : [123]}]
function addArrDatatoSeries(objData){
  //addArrDatatoSeries()
  _data_obj1 = objData

  for(let i in _data_obj1){
    if(_data_obj1[i].data.length > MAXWIDTH){
      _data_obj1[i].data.shift();
    }
  }

  chart1.update({
    series:_data_obj1});
}

function initDatatoContainer2(data){
  _data_obj1 = data;
}

function initContainer1(){

  chart1 = Highcharts.chart('container1', {

    title: {
        text: "유저별 총 잔고"
    },
  
    subtitle: {
        text: 'Source: '+window.location.hostname
    },
  
    yAxis: {
        title: {
            text: 'Balance'
        }
    },
  
    xAxis: {
        accessibility: {
            rangeDescription: 'Range'
        }
    },
  
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
  
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 1
        }
    },
  
    series: _data_obj1,
  
    responsive: {
        rules: [{
            condition: {
                maxWidth: 10
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
  
  });
  
}

function initContainer2(){
  chart2 = Highcharts.chart('container2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '유저별 투자 내역'
    },
    subtitle: {
        text: 'Source: '+window.location.hostname
    },
    xAxis: {
        categories: _users,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '투자금',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' 원'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
    }, {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 727, 31]
    }, {
        name: 'Year 2016',
        data: [1216, 1001, 4436, 738, 40]
    }]
  });
}

//initDatatoContainer1(datas)
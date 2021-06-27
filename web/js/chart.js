let chart1;
let chart2;
const MAXWIDTH = 30


let _data_obj1 = {}
let _data_obj2 = {}
let _users = []
let _market_arr = []
// let datas = 
//   [{
//     name: 'Installation',
//     data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
// }, 


function initDatatoContainer1(data){
  //데이터를 넣고 그래프 이닛
  _data_obj1 = data;
  console.log(_data_obj1)
  initContainer1();
}

function initDatatoContainer2(data){
    //데이터를 넣고 그래프 이닛
    _data_obj2 = data;
    console.log(_data_obj2)
    initContainer2();
  }

function addSeriestoContainer1(objData){
    chart1.addSeries(objData);
}

function addSeriestoContainer2(objData){
    chart2.addSeries(objData);
}

//objData = [{name : "test" / data : [123]}]
function addArrDatatoSeries1(objData){
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

function addArrDatatoSeries2(objData){
    //addArrDatatoSeries()
    _data_obj2 = objData
  
    for(let i in _data_obj2){
      if(_data_obj2[i].data.length > MAXWIDTH){
        _data_obj2[i].data.shift();
      }
    }
    chart2.update({
      series:_data_obj2});
  }

function initDatatoContainer2(data){
  _data_obj2 = data;
  initContainer2();
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

        title: {
            text: "TOP 5 유저 총 잔고"
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
      
        series: _data_obj2,
      
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

//_data_obj2 = [{name:"accessKey", data:[마켓순서대로 밸런스. 없으면 0]},]

//initDatatoContainer1(datas)


////////////////////


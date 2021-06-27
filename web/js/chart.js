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

arr = []
for(var i=0; i<103; i++){
  arr.push(i);
}

function initContainer2(){
  
  for(var i in _markets){
    _market_arr.push(_markets[i].split("-")[1])
  }
  _market_arr.push("KRW")

  chart2 = Highcharts.chart('container2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '코인별 투자 현황'
    },
    xAxis: {
        categories: _market_arr
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total coin consumption'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'John',
        data: arr
    }, {
        name: 'Jane',
        data: arr
    }, {
        name: 'Joe',
        data: arr
    }]
});
}

//_data_obj2 = [{name:"accessKey", data:[마켓순서대로 밸런스. 없으면 0]},]

//initDatatoContainer1(datas)
let socket = io.connect(window.location.hostname);

let markets = [
"KRW-BTC"
,"KRW-ETH"
,"KRW-NEO"
,"KRW-MTL"
,"KRW-LTC"
,"KRW-XRP"
,"KRW-ETC"
,"KRW-OMG"
,"KRW-SNT"
,"KRW-WAVES"
,"KRW-XEM"
,"KRW-QTUM"
,"KRW-LSK"
,"KRW-STEEM"
,"KRW-XLM"
,"KRW-ARDR"
,"KRW-ARK"
,"KRW-STORJ"
,"KRW-GRS"
,"KRW-REP"
,"KRW-ADA"
,"KRW-SBD"
,"KRW-POWR"
,"KRW-BTG"
,"KRW-ICX"
,"KRW-EOS"
,"KRW-TRX"
,"KRW-SC"
,"KRW-ONT"
,"KRW-ZIL"
,"KRW-POLY"
,"KRW-ZRX"
,"KRW-LOOM"
,"KRW-BCH"
,"KRW-BAT"
,"KRW-IOST"
,"KRW-RFR"
,"KRW-CVC"
,"KRW-IQ"
,"KRW-IOTA"
,"KRW-MFT"
,"KRW-ONG"
,"KRW-GAS"
,"KRW-UPP"
,"KRW-ELF"
,"KRW-KNC"
,"KRW-BSV"
,"KRW-THETA"
,"KRW-QKC"
,"KRW-BTT"
,"KRW-MOC"
,"KRW-ENJ"
,"KRW-TFUEL"
,"KRW-MANA"
,"KRW-ANKR"
,"KRW-AERGO"
,"KRW-ATOM"
,"KRW-TT"
,"KRW-CRE"
,"KRW-MBL"
,"KRW-WAXP"
,"KRW-HBAR"
,"KRW-MED"
,"KRW-MLK"
,"KRW-STPT"
,"KRW-ORBS"
,"KRW-VET"
,"KRW-CHZ"
,"KRW-STMX"
,"KRW-DKA"
,"KRW-HIVE"
,"KRW-KAVA"
,"KRW-AHT"
,"KRW-LINK"
,"KRW-XTZ"
,"KRW-BORA"
,"KRW-JST"
,"KRW-CRO"
,"KRW-TON"
,"KRW-SXP"
,"KRW-HUNT"
,"KRW-PLA"
,"KRW-DOT"
,"KRW-SRM"
,"KRW-MVL"
,"KRW-STRAX"
,"KRW-AQT"
,"KRW-BCHA"
,"KRW-GLM"
,"KRW-SSX"
,"KRW-META"
,"KRW-FCT2"
,"KRW-CBK"
,"KRW-SAND"
,"KRW-HUM"
,"KRW-DOGE"
,"KRW-STRK"
,"KRW-PUNDIX"
,"KRW-FLOW"
,"KRW-DAWN"
,"KRW-AXS"
,"KRW-STX"
]
var wsUri = "wss://api.upbit.com/websocket/v1";
var output;
function uuidv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}
let ticket = uuidv4()
let _MARKETS_STATUS = {}
let _LOCAL_ALL_ACCOUNTS = {}
let _MARKETS_INVEST = {}
let _RANKERS = {}
let _CHART_ALL_BALANCE = [] 
/*
[{
    name: 'Installation',
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
},
*/

function init()
{
    for(var i in markets){
        _MARKETS_STATUS[markets[i]] = {
        "ask_price" : ""
        ,"ask_volume": ""
        ,"bid_price": ""
        ,"bid_volume": ""
        ,"realTimeStamp": ""
        ,"bid_power": ""
        ,"ask_power": ""
        }
        _MARKETS_INVEST[markets[i]] = {
            "balance" : 0
        }
    }
    output = document.getElementById("output");
    testWebSocket();
    //socket.emit("INIT_LOCAL_ALL_ACCOUNTS", {});
    setTimeout(()=>{
        socket.emit("INIT_LOCAL_ALL_ACCOUNTS", {});
    },2000)
    setInterval(()=>{
        updateChart()
    },5000) 
}
function testWebSocket()
{
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) ;};
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
}
function onOpen(evt)
{
    writeToScreen("연결완료");
    doSend('[{"ticket":"'+ticket+'"},{"type":"orderbook","codes":["'+markets.join('","')+'"]},{"format":"SIMPLE"}]');
}
function onClose(evt)
{ 
    console.log("CLOSECLOSECLOSECLOSE")
    setTimeout(function() {
        testWebSocket(markets);
    }, 3000);
    writeToScreen("연결해제"); 
}

function onMessage(evt)
{
    //writeToScreen('<span style="color: blue;">수신: ' + evt.data+'</span>');
    //console.log(evt.data)

    if (evt.data instanceof Blob) {
    reader = new FileReader();

    reader.onload = () => {
        try{
        json = JSON.parse(reader.result);
        //console.log("onload Result: " + json.cd);
        market = json.cd;
        _MARKETS_STATUS[market].ask_price = json.obu[0].ap; 
        _MARKETS_STATUS[market].ask_volume = json.obu[0].as;
        _MARKETS_STATUS[market].bid_price = json.obu[0].bp;
        _MARKETS_STATUS[market].bid_volume = json.obu[0].bs;
        timeStamp = new Date(json.tms).toLocaleString();
        _MARKETS_STATUS[market].realTimeStamp = timeStamp
        updateUserValue()
        }catch(E){
            //console.log(E)
            //console.log(reader.result)
        }
        //console.log("["+market+"] bidPrice : " + _MARKETS_STATUS[market].bid_price);
    };

    reader.readAsText(evt.data);
    } else {
        console.log("readAsText Result: " + evt.data);
    }

    //websocket.close();
}
function onError(evt)
{ writeToScreen('<span style="color: red;">에러: ' + evt.data+'</span>');}
function doSend(message)
{
    writeToScreen("발신: " + message);
    websocket.send(message);
}

function writeToScreen(message)
{
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    output.innerHTML = message;
    //output.appendChild(pre);
}

socket.on('UPDATE_LOCAL_ALL_ACCOUNTS', function (data) {
        console.log(data)
        _LOCAL_ALL_ACCOUNTS = data;
        updateUserValue()
        //objData = [{name : "test" / data : [123]}]
        //function addArrDatatoSeries(objData){
        updateChart()
    });

socket.on('INIT_LOCAL_ALL_ACCOUNTS', function (data) {
    console.log(data)
    _LOCAL_ALL_ACCOUNTS = data;
    updateUserValue()
    for(var i in _LOCAL_ALL_ACCOUNTS){
        console.log(_LOCAL_ALL_ACCOUNTS[i])
        _CHART_ALL_BALANCE.push({name:_LOCAL_ALL_ACCOUNTS[i]._id, data:[_LOCAL_ALL_ACCOUNTS[i].ALL_BALANCE]})
    }
    initDatatoContainer1(_CHART_ALL_BALANCE)
});

function updateChart(){
    for(var i in _CHART_ALL_BALANCE){
        accessKey = _CHART_ALL_BALANCE[i].name;
        _CHART_ALL_BALANCE[i].data.push(_LOCAL_ALL_ACCOUNTS[accessKey].ALL_BALANCE)
    }
    addArrDatatoSeries(_CHART_ALL_BALANCE)
}

function updateUserValue(){
    for(let i in _LOCAL_ALL_ACCOUNTS){
        _ACCOUNT = _LOCAL_ALL_ACCOUNTS[i]
        _ALL_BALANCE = parseFloat(_ACCOUNT.accounts[0].balance);
        for(let j in _ACCOUNT.accounts){
            account = _ACCOUNT.accounts[j]
            if(account.currency != "KRW"){
                market = "KRW-"+account.currency;
                _ALL_BALANCE += account.balance * _MARKETS_STATUS[market].bid_price
            }
        }
        _ACCOUNT.timeStamp = new Date().toLocaleString('en', {timeZone: "Asia/Seoul"})
        _ACCOUNT["ALL_BALANCE"] = _ALL_BALANCE;
        writeToScreen(JSON.stringify(_LOCAL_ALL_ACCOUNTS))
    }
}
window.addEventListener("load", init, false);
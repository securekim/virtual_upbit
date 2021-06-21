
var express     = require('express'),
http        = require('http');
app         = express();
bodyParser  = require ("body-parser")
const jwt = require('jsonwebtoken')

let KEYS = {
  "MYACCESS_KEY_TMP" : "MYSECRET_KEY_TMP"
  ,"MYACCESS_KEY" : "MYSECRET_KEY"
}

let clientBalance = 
  [
    {"currency":"KRW","balance":"15232854.60024727","locked":"11005499.93629343","avg_buy_price":"0","avg_buy_price_modified":true,"unit_currency":"KRW"},
    {"currency":"BTC","balance":"0.10344202","locked":"0.0","avg_buy_price":"48336245.83","avg_buy_price_modified":false,"unit_currency":"KRW"},
    {"currency":"SNT","balance":"0.0","locked":"8227.02651414","avg_buy_price":"121.55","avg_buy_price_modified":false,"unit_currency":"KRW"},
    {"currency":"ETH","balance":"1.3548063","locked":"0.0","avg_buy_price":"2952451.56","avg_buy_price_modified":false,"unit_currency":"KRW"},
    {"currency":"ATOM","balance":"178.10340886","locked":"0.0","avg_buy_price":"16844.15","avg_buy_price_modified":false,"unit_currency":"KRW"},
    {"currency":"BTT","balance":"0.0","locked":"914999.36839014","avg_buy_price":"5.56","avg_buy_price_modified":false,"unit_currency":"KRW"},
    {"currency":"GAS","balance":"0.07329744","locked":"0.0","avg_buy_price":"14408.68","avg_buy_price_modified":false,"unit_currency":"KRW"},
    {"currency":"WIN","balance":"730.56498603","locked":"0.0","avg_buy_price":"0","avg_buy_price_modified":false,"unit_currency":"KRW"},
    {"currency":"META","balance":"0.0","locked":"25021.75517441","avg_buy_price":"116.29","avg_buy_price_modified":false,"unit_currency":"KRW"}
]
let sampleAccounts = [
  {
    "currency":"KRW",
    "balance":"1000000.0",
    "locked":"0.0",
    "avg_buy_price":"0",
    "avg_buy_price_modified":false,
    "unit_currency": "KRW",
  },
  {
    "currency":"BTC",
    "balance":"2.0",
    "locked":"0.0",
    "avg_buy_price":"101000",
    "avg_buy_price_modified":false,
    "unit_currency": "KRW",
  }
]

let accounts = {"MYACCESS_KEY":sampleAccounts}

var server = http.createServer(app);
server.listen(80); //1024 이하의 포트는 특정 cap 권한이 필요합니다.

//web 폴더 밑에 있는 파일들을 요청이 있을때 접근 가능하도록 합니다.
app.use(express.static(__dirname + '/web')); 
app.use(bodyParser.json());


// 유저가 root 를 요청 했을 때, index.html 파일을 전송합니다.
app.get('/', function(req, res) {
console.log("[Server] GET : /")
res.send('Hi, Client, I am a server');
});

// 유저가 /post 로 body 에 value 를 담아 요청 했을 때, value 를 전송합니다.
app.post('/',(req,res)=>{
console.log("[Server] POST : "+JSON.stringify(req.body))
res.send(`post value is : `+req.body.Client+``)
})

//////////////////////////////////// UPBIT API ////////////////

//{"access_key":"MYACCESS_KEY","nonce":"6d90e663-6efb-4123-bcb2-436e386ff66e","iat":1623767
//잘못된 경우 : 401 Unauthorized
////"{\"error\":{\"message\":\"잘못된 엑세스 키입니다.\",\"name\":\"invalid_access_key\"}}"
app.get('/v1/accounts',(req,res)=>{
    let retJSON = verifyJWT(req)
    console.log("[Server] /v1/accounts : "+retJSON.accessKey)
    if(retJSON.result){
       res.send(accounts[retJSON.accessKey])
    } else {
      res.send("Token Verify Failed.")
    }
})

//return : {result : true/false, accessKey}
function verifyJWT(req){
  let accessKey = "";
  let retJSON = {result:true, accessKey:accessKey};
  try{
    token = req.headers.authorization.split(" ")[1]
    info = token.split(".")[1]
    body = Buffer.from(info, "base64").toString('utf8')
    jsonBody = JSON.parse(body)
    secretKey = KEYS[jsonBody.access_key]
    jwt.verify(token, secretKey, (err, verifiedJwt) => {
        if(err){
          retJSON.result = false;
        }else{
          accessKey = verifiedJwt.access_key;
          retJSON.result = true;
          retJSON.accessKey = accessKey
        }
    })
  }catch(E){
    retJSON.result = false;
    console.log(E)
  }
  return retJSON;
}
    
var io = require('socket.io')(server);
var roomName;

io.on('connection', function (socket) {
console.log('connect');
var instanceId = socket.id;

socket.on('joinRoom',function (data) {
    console.log(data);
    socket.join(data.roomName);
    roomName = data.roomName;
});

socket.on('reqMsg', function (data) {
    console.log(data);
    io.sockets.in(roomName).emit('recMsg', {comment: instanceId + " : " + data.comment+'\n'});
})
});

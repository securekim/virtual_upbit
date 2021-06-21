const request = require('request')
const { v4: uuidv4 } = require('uuid'); //npm install uuidv4 --save
const sign = require('jsonwebtoken').sign

async function getBalance(access_key, secret_key, server_url){
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "GET",
        url: server_url + "/v1/accounts",
        headers: {Authorization: `Bearer ${token}`},
    }
    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
            if (error) reject();
            console.log(response.statusCode) 
            resolve(body)
        })
    });
}

async function API_sellImmediate(market, volume){
    const body = {
        market: market,
        side: 'ask',
        volume: volume.toString(),
        price: null,
        ord_type: 'market',
    }
    const query = queryEncode(body)
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "POST",
        url: server_url + "/v1/orders",
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
    return await req(options,"order");
}

async function API_buyImmediate(market, price){
    const body = {
        market: market,
        side: 'bid',
        volume: null,
        price: price.toString(),
        ord_type: 'price',
    }
    const query = queryEncode(body)
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "POST",
        url: server_url + "/v1/orders",
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
    return await req(options,"order");
}

async function main(){

    // var access_key = "QNNtkaroxY3ASQrhxXXaAxuqJxFYtko61Y1xBPlW"
    // var secret_key = "NW7dHskx9JQsHx4dOQM7i2RGuhG3qdmWBPkLnpxY"
    // var server_url = "https://api.upbit.com"
    // body = await getBalance(access_key, secret_key, server_url)
    // console.log(body)
    /*
    [
        {"currency":"KRW","balance":"몇개","locked":"11005499.93629343","avg_buy_price":"0","avg_buy_price_modified":true,"unit_currency":"KRW"},
    ]
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
    */
   
    var access_key = "MYACCESS_KEY"
    var secret_key = "MYSECRET_KEY"
    var server_url = "http://127.0.0.1"
    body = await getBalance(access_key, secret_key, server_url)
    console.log(body)
}


main()
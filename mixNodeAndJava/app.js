const http = require('express');
const myclass = require('./runMyClass')
var app = http();
//const data = myclass.getInfoArrSync();
console.log(myclass);
app.all('', function (req, res, next) {
    console.log("all 请求----------");
   // res.writeHead({'Access-Control-Allow-Origin': 'http://127.0.0.1:3010'}),
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
});
app.get('/', function (req, res) {
    //res.send(JSON.stringify(res));
    myclass.startCapSync();
    res.send('suceesssssssss');
})
app.get('/stop', function (req, res) {
    console.log("request" + req);
    //res.send(JSON.stringify(res));
    //myclass.startSync();
    const data = myclass.getInfoArrSync();
    res.send(data);
})
var server = app.listen(3999, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
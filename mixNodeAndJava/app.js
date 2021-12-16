const http = require('express');
var app = http();


const myclass = require('./runMyClass')
console.log(myclass);
const main = require("./main/index");
const setHeader = require("./main/config/setHeader")

setHeader(app);
/**
 * 入口函数
 */
main(app);


var server = app.listen(3999, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
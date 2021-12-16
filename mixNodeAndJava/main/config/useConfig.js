const bodyParser = require('body-parser')
module.exports = (app) => {
    // 解析 application/json
    app.use(bodyParser.json());
    // 解析 application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded());
}
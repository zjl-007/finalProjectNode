const connection = require('../main/db/mysqlConn');
const Jwt = require("../main/config/token")
module.exports = (app) => {
    app.post('/home', (req, res) => {
        res.send('homeData');
    })
}